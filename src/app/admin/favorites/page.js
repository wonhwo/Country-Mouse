import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminPlaylogsClient from '@/components/admin/AdminPlaylogsClient';

export const metadata = {
  title: '플레이 로그 관리',
  robots: { index: false, follow: false },
};

export default function AdminPlaylogsPage() {
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
            <div className="eyebrow">~/admin/favorites</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-title account-page-title">플레이 로그</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow account-stack">
          <AdminPlaylogsClient />
        </div>
      </section>
    </>
  );
}
