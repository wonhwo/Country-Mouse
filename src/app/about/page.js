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
              안녕하세요. 서울에서 게임을 만드는
              <br />
              <em>1인 게임 개발자</em>입니다.
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
                처음에는 마인크래프트 모드를 만들면서 게임 개발을 시작했습니다. 학부에서는
                컴퓨터공학을 전공했고, 지금은 <strong>HITGAME에서 Unity 개발자로 일하며</strong>{' '}
                모바일 게임을 만들고 있습니다.
              </p>
              <p>
                퇴근 후엔 Unreal Engine 5로 ProjectArc라는 1인 프로젝트를 진행하고 있습니다. 게임이
                어떻게 만들어지는지, 그 안에서 어떤 시스템이 돌아가는지가 늘 궁금합니다. 코드를 차분히
                다듬는 시간을 좋아합니다.
              </p>
              <p>
                최근에는 게임 시스템 디자인과 멀티플레이 네트워킹을 깊이 익히고 있고, 새로운 팀에서
                게임플레이 프로그래밍을 함께할 자리를 찾고 있습니다.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <Reveal>
            <h2 className="about-section-title">경력</h2>
          </Reveal>
          <div className="career-list">
            <Reveal>
              <div className="career-row">
                <div className="career-period">2023. 03 — 현재</div>
                <div>
                  <h3 className="career-role">Unity Developer</h3>
                  <p className="career-company">HITGAME · 서울</p>
                  <p className="career-desc">
                    모바일 게임 신작 개발과 라이브 운영에 참여하고 있습니다. 베트남·동남아 시장을
                    대상으로 한 캐주얼 타이틀의 핵심 시스템과 인앱 구조를 다뤘습니다.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="career-row">
                <div className="career-period">2022 — 2023</div>
                <div>
                  <h3 className="career-role">게임 개발 인턴</h3>
                  <p className="career-company">이전 직장 · 서울</p>
                  <p className="career-desc">
                    학부 시절 게임 스타트업에서 인턴으로 일하며 Unity 워크플로우와 모바일 출시
                    프로세스를 처음 익혔습니다.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="career-row">
                <div className="career-period">2018 — 2022</div>
                <div>
                  <h3 className="career-role">컴퓨터공학 학사</h3>
                  <p className="career-company">학교명 · 서울</p>
                  <p className="career-desc">
                    컴퓨터공학 전공. 학부 졸업 작품으로 멀티플레이어 액션 게임을 제작했습니다.
                  </p>
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
                <h3 className="interest-title">게임플레이 프로그래밍</h3>
                <p className="interest-desc">
                  손에 잡히는 느낌을 만드는 게 좋습니다. 입력에 대한 반응, 프레임 단위의 타이밍,
                  카메라가 따라가는 방식 — 플레이어가 직접 느끼는 모든 결을 다듬는 작업을 가장
                  즐깁니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="interest-card">
                <div className="interest-num">02</div>
                <h3 className="interest-title">게임 시스템 디자인</h3>
                <p className="interest-desc">
                  표면 아래에서 게임을 굴러가게 만드는 구조를 좋아합니다. 경제, 진행, AI 디렉터, 상태
                  머신 — 플레이어가 직접 보지 않지만 모든 경험을 떠받치는 시스템들에 관심이 많습니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="interest-card">
                <div className="interest-num">03</div>
                <h3 className="interest-title">멀티플레이 시스템</h3>
                <p className="interest-desc">
                  동기화와 예측, 지연 처리의 우아한 해결을 동경합니다. Unreal Replication을 본격적으로
                  익히는 중이며, 향후 협동 보스 헌팅 멀티플레이를 직접 만들어보는 게 목표입니다.
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
                  <a href="mailto:hello@countrymouse.studio">hello@countrymouse.studio</a>
                </div>
                <div className="contact-line">
                  <strong>GitHub</strong>
                  <a href="#" target="_blank" rel="noreferrer">
                    github.com/countrymouse
                  </a>
                </div>
                <div className="contact-line">
                  <strong>LinkedIn</strong>
                  <a href="#" target="_blank" rel="noreferrer">
                    linkedin.com/in/countrymouse
                  </a>
                </div>
                <div className="contact-line">
                  <strong>위치</strong>
                  <span style={{ color: 'var(--text-primary)' }}>서울, 대한민국</span>
                </div>
              </div>
              <div>
                <div className="contact-col-label">— hiring</div>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--text-secondary)',
                    margin: '0 0 20px',
                    lineHeight: 1.7,
                  }}
                >
                  현재 게임플레이 프로그래밍 포지션 / 시스템 프로그래밍 포지션에 관심이 있습니다.
                  이력서가 필요하시다면 아래에서 받으실 수 있고, 가벼운 대화는 이메일로 환영합니다.
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
