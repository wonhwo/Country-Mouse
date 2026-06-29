import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { withTimeout } from '@/lib/async-utils';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase';
import { toPublicGuestbookEntry } from '@/lib/guestbook-utils';

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

function sortByCreatedAt(entries) {
  return [...entries].sort((a, b) => {
    const aTime = a.createdAt?.toMillis?.() ?? 0;
    const bTime = b.createdAt?.toMillis?.() ?? 0;
    return bTime - aTime;
  });
}

export async function fetchPublishedGuestbook() {
  const db = getFirebaseDb();
  if (!db) return [];

  const q = query(collection(db, 'guestbook'), where('approved', '==', true));
  const snap = await withTimeout(getDocs(q), FIRESTORE_TIMEOUT_MS, '방명록 목록');
  return sortByCreatedAt(snap.docs.map(toPublicGuestbookEntry));
}

export async function fetchAllGuestbookAdmin() {
  const db = getFirebaseDb();
  if (!db) return [];

  const snap = await withTimeout(getDocs(collection(db, 'guestbook')), FIRESTORE_TIMEOUT_MS, '방명록 목록');
  return sortByCreatedAt(snap.docs.map(toPublicGuestbookEntry));
}

export async function submitGuestbookEntry({ message, githubLogin }) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  const user = await ensureAuthSession();
  const trimmedLogin = githubLogin?.trim();
  const trimmedMessage = message.trim();

  if (!trimmedLogin) throw new Error('GitHub 로그인 정보가 없습니다.');
  if (!trimmedMessage) throw new Error('메시지를 입력하세요.');
  if (trimmedMessage.length > 500) throw new Error('메시지는 500자 이하로 입력하세요.');

  await addDoc(collection(db, 'guestbook'), {
    uid: user.uid,
    githubLogin: trimmedLogin,
    name: trimmedLogin,
    message: trimmedMessage,
    approved: false,
    createdAt: serverTimestamp(),
  });
}

export async function setGuestbookApproved(id, approved) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();
  await updateDoc(doc(db, 'guestbook', id), { approved: Boolean(approved) });
}

export async function deleteGuestbookEntry(id) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();
  await deleteDoc(doc(db, 'guestbook', id));
}
