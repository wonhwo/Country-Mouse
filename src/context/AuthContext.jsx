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

const ADMIN_UID_KEY = 'cms_admin_uid';

const AuthContext = createContext(null);

function readStoredAdminUid() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ADMIN_UID_KEY);
}

function writeStoredAdminUid(uid) {
  if (typeof window === 'undefined') return;
  if (uid) window.localStorage.setItem(ADMIN_UID_KEY, uid);
  else window.localStorage.removeItem(ADMIN_UID_KEY);
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

    const unsub = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setGithubLogin(null);
        writeStoredAdminUid(null);
        setLoading(false);
        return;
      }

      const storedUid = readStoredAdminUid();
      if (storedUid === nextUser.uid) {
        setGithubLogin(adminGithubLogin || null);
      } else {
        setGithubLogin(null);
        writeStoredAdminUid(null);
      }
      setLoading(false);
    });

    return unsub;
  }, [adminGithubLogin]);

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
      const login = profile?.login?.toLowerCase();

      if (!adminGithubLogin) {
        setError('NEXT_PUBLIC_ADMIN_GITHUB_LOGIN 이 설정되지 않았습니다.');
        await signOut(auth);
        return;
      }

      if (login !== adminGithubLogin) {
        setError(`허용되지 않은 GitHub 계정입니다. (${profile?.login ?? 'unknown'})`);
        await signOut(auth);
        return;
      }

      writeStoredAdminUid(result.user.uid);
      setGithubLogin(login);
    } catch (err) {
      setError(err?.message || 'GitHub 로그인에 실패했습니다.');
    }
  }, [adminGithubLogin]);

  const logout = useCallback(async () => {
    setError(null);
    const auth = getFirebaseAuth();
    if (!auth) return;
    await signOut(auth);
    writeStoredAdminUid(null);
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
