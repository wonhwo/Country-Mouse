'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SiteLogo from '@/components/layout/SiteLogo';
import NavProfile from '@/components/layout/NavProfile';

const ITEMS = [
  { href: '/', label: '홈', match: '/' },
  { href: '/games', label: '게임', match: '/games' },
  { href: '/favorites', label: '플레이 로그', match: '/favorites' },
  { href: '/tech', label: '기술', match: '/tech' },
  { href: '/notes', label: '노트', match: '/notes' },
  { href: '/guestbook', label: '방명록', match: '/guestbook' },
  { href: '/about', label: '소개', match: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 모바일 메뉴 열렸을 때 배경 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (match) => {
    if (match === '/') return pathname === '/';
    return pathname === match || pathname.startsWith(`${match}/`);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link href="/" aria-label="Country Mouse Studio 홈">
          <SiteLogo />
        </Link>
        <div className="nav-end">
          <div className="nav-links">
            {ITEMS.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={`nav-link ${isActive(it.match) ? 'active' : ''}`}
              >
                {it.label}
              </Link>
            ))}
          </div>
          <NavProfile />
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
              <line x1="0" y1="2" x2="22" y2="2" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <button
          className="mobile-nav-close"
          onClick={() => setMobileOpen(false)}
          aria-label="메뉴 닫기"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
            <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {ITEMS.map((it) => (
          <Link key={it.href} href={it.href} className="mobile-nav-link">
            {it.label}
          </Link>
        ))}
        <Link href="/account" className="mobile-nav-link mobile-nav-account">
          내 계정
        </Link>
        <Link href="/admin" className="mobile-nav-link mobile-nav-account">
          관리
        </Link>
      </div>
    </>
  );
}
