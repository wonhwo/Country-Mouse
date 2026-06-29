'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminGate({ children }) {
  const { configured, user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!configured) return;
    if (!user || !isAdmin) router.replace('/account');
  }, [configured, user, loading, isAdmin, router]);

  if (loading) {
    return <p className="account-card-desc">권한 확인 중…</p>;
  }

  if (!configured) {
    return (
      <div className="admin-notice">
        Firebase 설정 후 GitHub 로그인을 연결하세요. <code>firebase.env.example</code> 참고.
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="account-card">
        <p className="account-card-desc">관리 페이지는 허용된 GitHub 계정으로 로그인해야 합니다.</p>
        <Link className="btn-primary account-card-action" href="/account">
          내 계정으로 이동
        </Link>
      </div>
    );
  }

  return children;
}
