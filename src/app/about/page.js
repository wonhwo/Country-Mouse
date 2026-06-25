import Reveal from '@/components/Reveal';
import PortraitPlaceholder from '@/components/placeholders/PortraitPlaceholder';

export const metadata = {
  title: '소개',
  description: '서울에서 게임을 만드는 1인 게임 개발자. 경력, 관심 영역, 연락처를 소개합니다.',
};

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <div>
          <Reveal>
            <div className="eyebrow">~/about</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="about-intro">
              안녕하세요. Unreal과 C++로 게임을 만드는 개발자
              <br />
              <em>이효원 (reppy)</em>입니다.
            </h1>
          </Reveal>
        </div>
        <Reveal delay={140}>
          <PortraitPlaceholder />
        </Reveal>
      </div>

      <section className="about-section workshop-bg">
        <div className="container-narrow">
          <Reveal>
            <div className="about-body">
              <p>
                전투가 손에 붙는 순간을 좋아합니다. 기존 게임의 구조를 뜯어보고, 그 안의 설계 의도를
                읽어 제 방식으로 다시 만들어보는 일에 가장 많은 시간을 씁니다.
              </p>
              <p>
                낮에는 게임 회사에서 클라이언트 개발자로 일하고, 남는 시간에는 작은 작업실에서
                Unreal과 C++로 제 게임을 만듭니다.
              </p>
              <p>
                언젠가 <strong>몬스터 헌터 같은 콘솔 액션 게임</strong>을 직접 만드는 것 — 그게 지금
                천천히 걸어가고 있는 방향입니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <Reveal>
            <h2 className="about-section-title">지나온 길</h2>
          </Reveal>
          <div className="career-list">
            <Reveal>
              <div className="career-row">
                <div className="career-period">2026 — 현재</div>
                <div>
                  <h3 className="career-role">게임 클라이언트 개발자</h3>
                  <p className="career-company">게임 회사</p>
                  <p className="career-desc">Unity로 게임 클라이언트를 개발하고 있습니다.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="career-row">
                <div className="career-period">이전</div>
                <div>
                  <h3 className="career-role">언리얼 게임 개발 과정</h3>
                  <p className="career-company">청년취업사관학교</p>
                  <p className="career-desc">
                    Unreal과 C++로 게임 개발을 집중적으로 익히고, 팀 프로젝트를 진행했습니다.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="career-row">
                <div className="career-period">학력</div>
                <div>
                  <h3 className="career-role">충남도립대학교</h3>
                  <p className="career-company">2023 졸업</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section workshop-bg">
        <div className="container">
          <Reveal>
            <h2 className="about-section-title">관심 영역</h2>
          </Reveal>
          <div className="interests-grid">
            <Reveal>
              <div className="interest-card">
                <div className="interest-num">01</div>
                <h3 className="interest-title">전투와 조작감</h3>
                <p className="interest-desc">
                  패링, 카운터, 입력에 대한 반응 — 플레이어 손에 직접 닿는 감각을 다듬는 일을 가장
                  좋아합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="interest-card">
                <div className="interest-num">02</div>
                <h3 className="interest-title">게임 구조 읽기</h3>
                <p className="interest-desc">
                  잘 만든 게임을 뜯어보고 설계 의도를 읽어, 제 프로젝트에 맞게 다시 짜봅니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="interest-card">
                <div className="interest-num">03</div>
                <h3 className="interest-title">끝까지 만들기</h3>
                <p className="interest-desc">
                  취향보다 기획 의도를 우선해, 맡은 기능을 마감 안에서 완성도까지 책임지고 구현합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <Reveal>
            <h2 className="about-section-title">연락 / 자료</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="contact-block">
              <div>
                <div className="contact-col-label">— reach</div>
                <div className="contact-line">
                  <strong>이메일</strong>
                  <a href="mailto:reppy0813@gmail.com">reppy0813@gmail.com</a>
                </div>
                <div className="contact-line">
                  <strong>GitHub</strong>
                  <a href="https://github.com/wonhwo" target="_blank" rel="noreferrer">
                    github.com/wonhwo
                  </a>
                </div>
                <div className="contact-line">
                  <strong>위치</strong>
                  <span style={{ color: 'var(--text-primary)' }}>서울, 대한민국</span>
                </div>
              </div>
              <div>
                <div className="contact-col-label">— say hi</div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    margin: '0 0 20px',
                    lineHeight: 1.7,
                  }}
                >
                  게임이나 개발 이야기는 언제든 환영합니다. 가벼운 대화는 이메일로, 이력서가
                  필요하시면 아래에서 받으실 수 있어요.
                </p>
                <a className="btn-primary" href="#" style={{ marginTop: 0 }}>
                  이력서 (PDF) 받기
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1v9M3 7l4 4 4-4M1 13h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
