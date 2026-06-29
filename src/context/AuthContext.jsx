'use client';

import {
  getAdditionalUserInfo,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getAdminGithubLogin,
  getFirebaseAuth,
  getGithubProvider,
  isFirebaseConfigured,
} from '@/lib/firebase';

const SESSION_KEY = 'cms_github_session';

const AuthContext = createContext(null);

function readSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSession(session) {
  if (typeof window === 'undefined') return;
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
}

function githubLoginFromUser(user) {
  const provider = user.providerData.find((entry) => entry.providerId === 'github.com');
  return provider?.displayName?.trim().toLowerCase() || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [githubLogin, setGithubLogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const configured = isFirebaseConfigured();
  const adminGithubLogin = getAdminGithubLogin();

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return undefined;
    }

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      setLoading(false);
    };

    const timeoutId = setTimeout(finish, 8000);

    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setGithubLogin(null);
        writeSession(null);
        finish();
        return;
      }

      const session = readSession();
      const login =
        session?.uid === nextUser.uid
          ? session.login
          : githubLoginFromUser(nextUser) || session?.login || null;

      setGithubLogin(login);
      if (login) writeSession({ uid: nextUser.uid, login });
      finish();
    });

    return () => {
      clearTimeout(timeoutId);
      unsub();
    };
  }, []);

  const isAdmin = Boolean(
    user && adminGithubLogin && githubLogin?.toLowerCase() === adminGithubLogin,
  );

  const loginWithGithub = useCallback(async () => {
    setError(null);
    const auth = getFirebaseAuth();
    if (!auth) {
      setError('Firebase 설정이 없습니다. .env.local 을 확인하세요.');
      return;
    }

    try {
      const result = await signInWithPopup(auth, getGithubProvider());
      const profile = getAdditionalUserInfo(result)?.profile;
      const login = profile?.login?.toLowerCase() || githubLoginFromUser(result.user);

      if (!login) {
        setError('GitHub 프로필을 가져오지 못했습니다.');
        await signOut(auth);
        return;
      }

      writeSession({ uid: result.user.uid, login });
      setGithubLogin(login);
    } catch (err) {
      setError(err?.message || 'GitHub 로그인에 실패했습니다.');
    }
  }, []);

  const logout = useCallback(async () => {
    setError(null);
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
    writeSession(null);
    setGithubLogin(null);
  }, []);

  const value = useMemo(
    () => ({
      configured,
      user,
      githubLogin,
      loading,
      error,
      isAdmin,
      loginWithGithub,
      logout,
    }),
    [configured, user, githubLogin, loading, error, isAdmin, loginWithGithub, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
