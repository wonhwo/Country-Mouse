import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminNotesClient from '@/components/admin/AdminNotesClient';

export const metadata = {
  title: '노트 관리',
  robots: { index: false, follow: false },
};

export default function AdminNotesPage() {
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
            <div className="eyebrow">~/admin/notes</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-title account-page-title">노트</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow account-stack">
          <AdminNotesClient />
        </div>
      </section>
    </>
  );
}
