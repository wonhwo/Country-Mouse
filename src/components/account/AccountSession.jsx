'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AccountSession() {
  const { configured, user, githubLogin, loading, error, isAdmin, loginWithGithub, logout } =
    useAuth();

  if (loading) {
    return <p className="account-card-desc">세션 확인 중…</p>;
  }

  if (!configured) {
    return (
      <>
        <p className="account-card-desc">
          Firebase 환경변수가 없습니다. 프로젝트 루트에 <code>.env.local</code> 파일을 만들고{' '}
          <code>firebase.env.example</code> 를 참고해 값을 채워 주세요.
        </p>
        <button type="button" className="btn-primary account-card-action" disabled>
          GitHub로 로그인 (설정 필요)
        </button>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <p className="account-card-desc">GitHub 계정으로만 로그인합니다.</p>
        {error && <p className="account-card-error">{error}</p>}
        <button type="button" className="btn-primary account-card-action" onClick={loginWithGithub}>
          GitHub로 로그인
        </button>
      </>
    );
  }

  return (
    <>
      <p className="account-card-desc">
        <strong>{githubLogin ?? user.displayName ?? 'GitHub'}</strong> 으로 로그인되어 있습니다.
        {isAdmin ? ' 관리 권한이 있습니다.' : ' 관리 권한은 없습니다.'}
      </p>
      {error && <p className="account-card-error">{error}</p>}
      <div className="account-card-actions">
        {isAdmin && (
          <Link className="btn-outline account-card-action" href="/admin">
            관리 페이지로
          </Link>
        )}
        <button type="button" className="btn-ghost account-card-action" onClick={logout}>
          로그아웃
        </button>
      </div>
    </>
  );
}
