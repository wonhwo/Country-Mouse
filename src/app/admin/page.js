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
    title: '노트',
    desc: '작업 노트 작성·수정·발행.',
    href: '/admin/notes',
    ready: true,
  },
  {
    id: 'games',
    label: 'games',
    title: '게임',
    desc: '제작 게임 목록·상세 정보 편집.',
    href: '/admin/games',
    ready: false,
  },
  {
    id: 'favorites',
    label: 'playlog',
    title: '플레이 로그',
    desc: '플레이 로그 항목 추가·수정.',
    href: '/admin/favorites',
    ready: false,
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
              사이트 콘텐츠를 편집합니다. 허용된 GitHub 계정으로 로그인해야 합니다.
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
                로그인 완료. Firestore에서 노트를 관리할 수 있습니다.
              </div>
            </Reveal>

            {PANELS.map((panel, i) => (
              <Reveal key={panel.id} delay={80 + i * 60}>
                <article className="account-card">
                  <div className="account-card-label">{panel.label}</div>
                  <h2 className="account-card-title">{panel.title}</h2>
                  <p className="account-card-desc">{panel.desc}</p>
                  {panel.ready ? (
                    <Link className="btn-primary account-card-action" href={panel.href}>
                      열기
                    </Link>
                  ) : (
                    <span className="admin-soon">준비 중</span>
                  )}
                </article>
              </Reveal>
            ))}
          </AdminGate>
        </div>
      </section>
    </>
  );
}
