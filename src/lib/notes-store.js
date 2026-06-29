import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { NOTES } from '@/data/notes';
import { withTimeout } from '@/lib/async-utils';
import { getFirebaseAuth, getFirebaseConfigSummary, getFirebaseDb, getFirebaseProjectId } from '@/lib/firebase';
import {
  estimateReadMinutes,
  formatNoteDate,
  normalizeBody,
  parseBodyText,
  serializeBodyForFirestore,
  toPublicNote,
} from '@/lib/note-utils';

// Firestore는 __...__ 형태 문서 ID를 금지함 (invalid-argument)
const PROBE_READ_SLUG = 'cms-probe-read-missing';
const PROBE_WRITE_SLUG = 'cms-probe-write-test';

const FIRESTORE_TIMEOUT_MS = 25000;

async function ensureAuthSession() {
  const auth = getFirebaseAuth();
  if (!auth?.currentUser) {
    throw Object.assign(new Error('Firebase 로그인 세션이 없습니다. 로그아웃 후 다시 로그인하세요.'), {
      code: 'auth/missing',
    });
  }
  await withTimeout(auth.currentUser.getIdToken(), FIRESTORE_TIMEOUT_MS, '인증 토큰');
  return auth.currentUser;
}

export async function diagnoseFirestoreAccess(uid) {
  const db = getFirebaseDb();
  const auth = getFirebaseAuth();
  const steps = [];

  const add = (name, ok, detail) => steps.push({ name, ok, detail });

  add('프로젝트 ID', Boolean(getFirebaseProjectId()), getFirebaseProjectId() || '없음');

  const config = getFirebaseConfigSummary();
  add(
    'authDomain 일치',
    config.authDomainMatchesProject,
    config.authDomainMatchesProject
      ? config.authDomain
      : `${config.authDomain || '없음'} (기대: ${config.expectedAuthDomain})`,
  );

  const authUid = auth?.currentUser?.uid ?? null;
  add('Firebase 로그인', Boolean(authUid), authUid || '세션 없음');

  if (uid && authUid) {
    add('UID 일치', uid === authUid, uid === authUid ? '일치' : `화면 ${uid} ≠ 세션 ${authUid}`);
  }

  if (!db || !authUid) {
    return { steps, ready: false };
  }

  try {
    await withTimeout(auth.currentUser.getIdToken(), FIRESTORE_TIMEOUT_MS, '인증 토큰');
    add('인증 토큰', true, '발급됨');
  } catch (err) {
    add('인증 토큰', false, err.message || '실패');
    return { steps, ready: false };
  }

  try {
    const adminSnap = await withTimeout(
      getDoc(doc(db, 'admins', authUid)),
      FIRESTORE_TIMEOUT_MS,
      'admins 조회',
    );
    add(
      'admins 문서',
      adminSnap.exists(),
      adminSnap.exists() ? `admins/${authUid}` : `admins/${authUid} 없음`,
    );
  } catch (err) {
    add('admins 문서', false, err.code || err.message);
  }

  try {
    await withTimeout(
      getDoc(doc(db, 'notes', PROBE_READ_SLUG)),
      FIRESTORE_TIMEOUT_MS,
      'notes 읽기',
    );
    add('notes 읽기 테스트', true, '통과 (없는 문서)');
  } catch (err) {
    add('notes 읽기 테스트', false, err.code || err.message);
  }

  const probeRef = doc(db, 'notes', PROBE_WRITE_SLUG);
  try {
    await withTimeout(
      setDoc(probeRef, {
        title: 'probe',
        tag: '노트',
        excerpt: 'test',
        read: '1분',
        body: [{ type: 'p', text: 'test' }],
        published: false,
        date: '2026.01.01',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }),
      FIRESTORE_TIMEOUT_MS,
      'notes 쓰기',
    );
    add('notes 쓰기 테스트', true, '통과');
    try {
      await withTimeout(deleteDoc(probeRef), FIRESTORE_TIMEOUT_MS, 'probe 삭제');
    } catch {
      /* probe 문서 남아도 admin만 읽을 수 있음 */
    }
  } catch (err) {
    add('notes 쓰기 테스트', false, err.code || err.message);
  }

  return { steps, ready: steps.every((step) => step.ok) };
}

export async function checkFirestoreAdminAccess(uid) {
  const db = getFirebaseDb();
  if (!db) return { registered: false, reason: 'Firestore 미설정' };
  if (!uid) return { registered: false, reason: '로그인 필요' };

  try {
    const snap = await getDoc(doc(db, 'admins', uid));
    return {
      registered: snap.exists(),
      reason: snap.exists() ? null : 'admins 문서 없음',
    };
  } catch (err) {
    return {
      registered: false,
      reason: err?.code === 'permission-denied' ? '규칙 미게시 또는 프로젝트 불일치' : err?.message,
    };
  }
}

export async function fetchPublishedNotes() {
  const db = getFirebaseDb();
  if (!db) return [];

  const q = query(
    collection(db, 'notes'),
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map(toPublicNote);
}

export async function fetchAllNotesAdmin() {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const q = query(collection(db, 'notes'), orderBy('createdAt', 'desc'));
    const snap = await withTimeout(getDocs(q), FIRESTORE_TIMEOUT_MS, '노트 목록');
    return snap.docs.map(toPublicNote);
  } catch {
    return [];
  }
}

export async function fetchNoteBySlug(slug) {
  const db = getFirebaseDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, 'notes', slug));
  if (!snap.exists()) return null;
  return toPublicNote(snap);
}

export async function saveNote(input) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  const slug = input.slug.trim();
  if (!slug) throw new Error('slug가 필요합니다.');

  const body = serializeBodyForFirestore(parseBodyText(input.bodyText));
  const read = input.read?.trim() || estimateReadMinutes(input.bodyText);
  const ref = doc(db, 'notes', slug);

  const payload = {
    title: input.title.trim(),
    tag: input.tag.trim() || '노트',
    excerpt: input.excerpt.trim(),
    read,
    body,
    published: Boolean(input.published),
    date: input.date?.trim() || formatNoteDate(),
    updatedAt: serverTimestamp(),
  };

  if (!input.isEdit) {
    payload.createdAt = serverTimestamp();
  }

  await setDoc(ref, payload, { merge: true });

  return slug;
}

export async function importLegacyNotes() {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  const failed = [];

  for (const note of NOTES) {
    const ref = doc(db, 'notes', note.id);
    const body = serializeBodyForFirestore(note.body);

    await setDoc(ref, {
      title: note.title,
      tag: note.tag,
      excerpt: note.excerpt,
      read: note.read,
      body,
      published: true,
      date: note.date,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const saved = await getDoc(ref);
    const savedBlocks = normalizeBody(saved.data()?.body).length;
    if (savedBlocks === 0) failed.push(note.id);
  }

  if (failed.length > 0) {
    throw new Error(`본문이 Firestore에 저장되지 않았습니다: ${failed.join(', ')}`);
  }

  return NOTES.length;
}
