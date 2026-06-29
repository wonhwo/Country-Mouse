import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GameEditor from '@/components/admin/GameEditor';

export const metadata = {
  title: '게임 수정',
  robots: { index: false, follow: false },
};

export default async function AdminEditGamePage({ params }) {
  const { id } = await params;

  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <Link className="btn-back" href="/admin/games">
              ← 게임 목록
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="page-title account-page-title">게임 수정</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow account-stack">
          <GameEditor gameId={id} />
        </div>
      </section>
    </>
  );
}
