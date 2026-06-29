import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  where,
  query,
} from 'firebase/firestore';
import { GAMES } from '@/data/games';
import { withTimeout } from '@/lib/async-utils';
import {
  parseLines,
  parseLinks,
  parseParagraphs,
  serializeGameForFirestore,
  toPublicGame,
} from '@/lib/game-utils';
import { getFirebaseAuth, getFirebaseDb } from '@/lib/firebase';

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

export async function fetchPublishedGames() {
  const db = getFirebaseDb();
  if (!db) return [];

  try {
    const q = query(collection(db, 'games'), where('published', '==', true));
    const snap = await withTimeout(getDocs(q), FIRESTORE_TIMEOUT_MS, '게임 목록');
    return snap.docs.map(toPublicGame).sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
  }
}

export async function fetchAllGamesAdmin() {
  const db = getFirebaseDb();
  if (!db) return [];

  const snap = await withTimeout(getDocs(collection(db, 'games')), FIRESTORE_TIMEOUT_MS, '게임 목록');
  return snap.docs.map(toPublicGame).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function fetchGameById(id) {
  const db = getFirebaseDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, 'games', id));
  if (!snap.exists()) return null;
  return toPublicGame(snap);
}

export async function saveGame(input) {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  const id = input.id.trim();
  if (!id) throw new Error('slug(id)가 필요합니다.');

  const ref = doc(db, 'games', id);
  const payload = serializeGameForFirestore({
    title: input.title.trim(),
    engine: input.engine.trim(),
    engineKey: input.engineKey,
    status: input.status,
    statusLabel: input.statusLabel.trim(),
    award: input.award.trim(),
    tagline: input.tagline.trim(),
    stack: parseLines(input.stackText),
    longDesc: parseParagraphs(input.longDescText),
    highlights: parseLines(input.highlightsText),
    started: input.started.trim(),
    role: input.role.trim(),
    links: parseLinks(input.linksText),
    videoUrl: input.videoUrl.trim() || null,
    thumbnail: input.thumbnail.trim() || null,
    screenshots: parseLines(input.screenshotsText),
    published: Boolean(input.published),
    sortOrder: Number(input.sortOrder) || 0,
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

export async function importLegacyGames() {
  const db = getFirebaseDb();
  if (!db) throw new Error('Firestore가 설정되지 않았습니다.');

  await ensureAuthSession();

  for (let i = 0; i < GAMES.length; i++) {
    const game = GAMES[i];
    const ref = doc(db, 'games', game.id);

    await setDoc(ref, {
      ...serializeGameForFirestore({ ...game, published: true, sortOrder: i }),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return GAMES.length;
}
