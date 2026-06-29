import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AccountProfile from '@/components/account/AccountProfile';
import AccountSession from '@/components/account/AccountSession';

export const metadata = {
  title: '내 계정',
  description: 'Country Mouse Studio 계정 및 프로필 설정',
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <div className="eyebrow">~/account</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title account-page-title">내 계정</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              GitHub로 로그인해 프로필과 관리 권한을 확인합니다.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="account-section">
        <div className="container-narrow account-stack">
          <Reveal>
            <article className="account-card">
              <div className="account-card-label">session</div>
              <h2 className="account-card-title">로그인</h2>
              <AccountSession />
            </article>
          </Reveal>

          <Reveal delay={80}>
            <article className="account-card account-card-muted">
              <div className="account-card-label">profile</div>
              <h2 className="account-card-title">프로필</h2>
              <p className="account-card-desc">
                GitHub 계정 정보가 표시됩니다.
              </p>
              <AccountProfile />
            </article>
          </Reveal>

          <Reveal delay={140}>
            <article className="account-card">
              <div className="account-card-label">studio</div>
              <h2 className="account-card-title">운영</h2>
              <p className="account-card-desc">
                노트 작성·편집 등 사이트 콘텐츠 관리는 관리 페이지에서 합니다.
              </p>
              <Link className="btn-outline account-card-action" href="/admin">
                관리 페이지로
              </Link>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
