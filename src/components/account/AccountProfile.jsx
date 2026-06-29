'use client';

import { useAuth } from '@/context/AuthContext';

export default function AccountProfile() {
  const { user, githubLogin, loading } = useAuth();

  if (loading) {
    return (
      <dl className="account-dl">
        <div>
          <dt>닉네임</dt>
          <dd>…</dd>
        </div>
      </dl>
    );
  }

  return (
    <dl className="account-dl">
      <div>
        <dt>닉네임</dt>
        <dd>{githubLogin ?? user?.displayName ?? '—'}</dd>
      </div>
      <div>
        <dt>연동</dt>
        <dd>GitHub</dd>
      </div>
    </dl>
  );
}
