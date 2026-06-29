import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { FAVORITES } from '@/data/favorites';
import { withTimeout } from '@/lib/async-utils';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase';
import { parseLines, serializePlaylogForFirestore, toPublicPlaylog } from '@/lib/playlog-utils';

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

export async function fetchPublishedPlaylogs() {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const q = query(collection(db, 'playlogs'), where('published', '==', true));
    const snap = await withTimeout(getDocs(q), FIRESTORE_TIMEOUT_MS, '플레이 로그 목록');
    return snap.docs.map(toPublicPlaylog).sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
  }
}

export async function fetchAllPlaylogsAdmin() {
  const db = getFirebaseDb();
  if (!db) return [];

  const snap = await withTimeout(getDocs(collection(db, 'playlogs')), FIRESTORE_TIMEOUT_MS, '플레이 로그 목록');
  return snap.docs.map(toPublicPlaylog).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function fetchPlaylogById(id) {
  const db = getFirebaseDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, 'playlogs', id));
  if (!snap.exists()) return null;
  return toPublicPlaylog(snap);
}

export async function savePlaylog(input) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  const id = input.id.trim();
  if (!id) throw new Error('번호(id)가 필요합니다.');

  const ref = doc(db, 'playlogs', id);
  const payload = serializePlaylogForFirestore({
    num: input.num,
    title: input.title.trim(),
    dev: input.dev.trim(),
    playtime: input.playtime.trim(),
    icon: input.icon.trim(),
    quote: input.quote.trim(),
    tags: parseLines(input.tagsText),
    published: Boolean(input.published),
    sortOrder: Number(input.sortOrder) || Number(input.num) || 0,
  });

  const docPayload = {
    ...payload,
    updatedAt: serverTimestamp(),
  };

  if (!input.isEdit) {
    docPayload.createdAt = serverTimestamp();
  }

  await setDoc(ref, docPayload, { merge: true });
  return id;
}

export async function importLegacyPlaylogs() {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  for (let i = 0; i < FAVORITES.length; i++) {
    const entry = FAVORITES[i];
    const ref = doc(db, 'playlogs', entry.num);

    await setDoc(ref, {
      ...serializePlaylogForFirestore({ ...entry, published: true, sortOrder: i + 1 }),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return FAVORITES.length;
}
