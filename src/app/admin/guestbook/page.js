import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminGuestbookClient from '@/components/admin/AdminGuestbookClient';

export const metadata = {
  title: '방명록 관리',
  robots: { index: false, follow: false },
};

export default function AdminGuestbookPage() {
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
            <div className="eyebrow">~/admin/guestbook</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-title account-page-title">방명록</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="page-desc">승인 대기 항목을 공개하거나 삭제합니다.</p>
          </Reveal>
        </div>
      </header>

      <section className="account-section">
        <div className="container-narrow account-stack">
          <AdminGuestbookClient />
        </div>
      </section>
    </>
  );
}
