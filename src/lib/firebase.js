import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firestoreDb = null;

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId,
  );
}

export function getFirebaseConfigSummary() {
  const projectId = firebaseConfig.projectId?.trim() || '';
  const authDomain = firebaseConfig.authDomain?.trim() || '';
  const expectedAuthDomain = projectId ? `${projectId}.firebaseapp.com` : '';

  return {
    projectId,
    authDomain,
    expectedAuthDomain,
    envComplete: isFirebaseConfigured(),
    authDomainMatchesProject: !projectId || authDomain === expectedAuthDomain,
  };
}

export function getFirebaseApp() {
  if (!isFirebaseConfigured()) return null;
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  return app ? getAuth(app) : null;
}

export function getFirebaseDb() {
  const app = getFirebaseApp();
  if (!app) return null;

  if (!firestoreDb) {
    try {
      firestoreDb = initializeFirestore(app, {
        experimentalForceLongPolling: true,
        experimentalLongPollingOptions: { timeoutSeconds: 30 },
      });
    } catch {
      firestoreDb = getFirestore(app);
    }
  }

  return firestoreDb;
}

export function getGithubProvider() {
  const provider = new GithubAuthProvider();
  provider.addScope('read:user');
  return provider;
}

export function getFirebaseProjectId() {
  return process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim() || '';
}

export function getAdminGithubLogin() {
  return process.env.NEXT_PUBLIC_ADMIN_GITHUB_LOGIN?.trim().toLowerCase() || '';
}
