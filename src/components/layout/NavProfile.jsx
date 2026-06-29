'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MASCOT } from '@/lib/brand';

export default function NavProfile() {
  const pathname = usePathname();
  const { user, githubLogin, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const isAccount = pathname.startsWith('/account');
  const isAdmin = pathname.startsWith('/admin');
  const active = isAccount || isAdmin;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const label = loading ? '…' : user ? (githubLogin ?? '계정') : '로그인';
  const avatarSrc = user?.photoURL || MASCOT.src;

  const onTriggerClick = () => {
    if (!user) return;
    setOpen((v) => !v);
  };

  const triggerInner = (
    <>
      <span className="nav-profile-avatar">
        <Image
          src={avatarSrc}
          alt=""
          width={MASCOT.width}
          height={MASCOT.height}
          className="nav-profile-avatar-img"
          aria-hidden
        />
      </span>
      <span className="nav-profile-name">{label}</span>
      {user && (
        <svg className="nav-profile-chevron" width="10" height="6" viewBox="0 0 10 6" aria-hidden>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      )}
    </>
  );

  return (
    <div className={`nav-profile ${active ? 'active' : ''}`} ref={rootRef}>
      {!user ? (
        <Link
          href="/account"
          className="nav-profile-trigger"
          aria-label="GitHub 로그인"
        >
          {triggerInner}
        </Link>
      ) : (
        <button
          type="button"
          className="nav-profile-trigger"
          onClick={onTriggerClick}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-label={`${label} 계정 메뉴`}
        >
          {triggerInner}
        </button>
      )}

      {user && open && (
        <div className="nav-profile-menu" role="menu">
          <Link className="nav-profile-menu-item" href="/account" role="menuitem">
            내 계정
          </Link>
          <Link className="nav-profile-menu-item" href="/admin" role="menuitem">
            관리
          </Link>
        </div>
      )}
    </div>
  );
}
