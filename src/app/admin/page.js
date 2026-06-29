import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminGate from '@/components/admin/AdminGate';

export const metadata = {
  title: '관리',
  description: 'Country Mouse Studio 콘텐츠 관리',
  robots: { index: false, follow: false },
};

const PANELS = [
  {
    id: 'notes',
    label: 'notes',
    title: '작업 노트',
    desc: '작업 노트 작성·수정·발행.',
    href: '/admin/notes',
  },
  {
    id: 'guestbook',
    label: 'guestbook',
    title: '방명록',
    desc: '방명록 승인·삭제.',
    href: '/admin/guestbook',
  },
];

export default function AdminPage() {
  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <Link className="btn-back" href="/account">
              ← 내 계정
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <div className="eyebrow">~/admin</div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="page-title account-page-title">관리</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="page-desc">
              작업 노트와 방명록을 관리합니다. 허용된 GitHub 계정으로 로그인해야 합니다.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="account-section">
        <div className="container-narrow account-stack">
          <AdminGate>
            <Reveal>
              <div className="admin-notice">
                <span className="admin-notice-dot" />
                로그인 완료. 게임·플레이 로그는 코드에서 관리하고, 노트·방명록만 Firestore를 사용합니다.
              </div>
            </Reveal>

            {PANELS.map((panel, i) => (
              <Reveal key={panel.id} delay={80 + i * 60}>
                <article className="account-card">
                  <div className="account-card-label">{panel.label}</div>
                  <h2 className="account-card-title">{panel.title}</h2>
                  <p className="account-card-desc">{panel.desc}</p>
                  <Link className="btn-primary account-card-action" href={panel.href}>
                    열기
                  </Link>
                </article>
              </Reveal>
            ))}
          </AdminGate>
        </div>
      </section>
    </>
  );
}
