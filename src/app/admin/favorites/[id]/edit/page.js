import Link from 'next/link';
import Reveal from '@/components/Reveal';
import PlaylogEditor from '@/components/admin/PlaylogEditor';

export const metadata = {
  title: '플레이 로그 수정',
  robots: { index: false, follow: false },
};

export default async function AdminEditPlaylogPage({ params }) {
  const { id } = await params;

  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <Link className="btn-back" href="/admin/favorites">
              ← 플레이 로그 목록
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="page-title account-page-title">항목 수정</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow account-stack">
          <PlaylogEditor entryId={id} />
        </div>
      </section>
    </>
  );
}
