import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminGamesClient from '@/components/admin/AdminGamesClient';

export const metadata = {
  title: '게임 관리',
  robots: { index: false, follow: false },
};

export default function AdminGamesPage() {
  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <Link className="btn-back" href="/admin">
              ← 관리
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <div className="eyebrow">~/admin/games</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-title account-page-title">게임</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow account-stack">
          <AdminGamesClient />
        </div>
      </section>
    </>
  );
}
