import Reveal from '@/components/Reveal';

export const metadata = {
  title: '기술',
  description: '실제로 작업에 사용하는 엔진, 언어, 도구, 그리고 가장 깊이 파고들고 있는 영역을 정리합니다.',
};

export default function TechPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/tech</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">기술</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              실제로 작업에 사용하는 엔진, 언어, 도구, 그리고 가장 깊이 파고들고 있는 영역을
              정리해두었습니다.
            </p>
          </Reveal>
        </div>
      </header>

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">01</span>
              <span>엔진</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="tech-engines">
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">Unreal Engine 5</h3>
                <div className="tech-engine-level">개인 작업 주력</div>
                <p className="tech-engine-desc">
                  C++ 중심으로 전투와 게임플레이를 만드는 주력 엔진입니다. Blueprint는 콘텐츠 구성과
                  프로토타이핑에 쓰고, 핵심 로직은 C++로 작성하는 방식을 따릅니다.
                </p>
                <div className="tech-engine-list">
                  <span>C++</span>
                  <span>Blueprint</span>
                  <span>Gameplay</span>
                  <span>Animation</span>
                  <span>Enhanced Input</span>
                </div>
              </div>
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">Unity</h3>
                <div className="tech-engine-level">회사에서 실무 사용</div>
                <p className="tech-engine-desc">
                  현재 게임 회사에서 매일 사용하는 엔진입니다. C# 기반으로 게임 클라이언트를
                  개발하고 있습니다.
                </p>
                <div className="tech-engine-list">
                  <span>C#</span>
                  <span>UGUI</span>
                  <span>Addressables</span>
                  <span>Client</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">02</span>
              <span>언어와 도구</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="tech-list-grid">
              <div className="tech-list-block">
                <h4>— languages</h4>
                <ul>
                  <li>C++</li>
                  <li>C#</li>
                  <li>JavaScript</li>
                  <li>Python</li>
                  <li>Java</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— backend &amp; db</h4>
                <ul>
                  <li>MySQL</li>
                  <li>Spring</li>
                  <li>AWS</li>
                  <li>Linux</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— web &amp; tools</h4>
                <ul>
                  <li>React</li>
                  <li>HTML / CSS</li>
                  <li>Git / GitHub</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="workshop-bg">
        <div className="container">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">03</span>
              <span>깊이 파는 영역</span>
            </div>
          </Reveal>
          <div className="interests-grid">
            <Reveal>
              <div className="interest-card" style={{ background: 'var(--bg-base)' }}>
                <div className="interest-num">01</div>
                <h3 className="interest-title">전투 프로그래밍</h3>
                <p className="interest-desc">
                  패링, 카운터, 타격감, 입력 응답성. 플레이어가 직접 만지는 부분을 깎는 것이 가장
                  즐겁습니다. C++로 전투 시스템을 직접 구현하며 손맛을 다듬습니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="interest-card" style={{ background: 'var(--bg-base)' }}>
                <div className="interest-num">02</div>
                <h3 className="interest-title">게임 구조 분석</h3>
                <p className="interest-desc">
                  잘 만든 게임의 전투 구조와 시스템 흐름을 뜯어보고 설계 의도를 읽습니다. 분석한
                  내용을 제 프로젝트에 맞게 다시 짜보는 작업을 자주 합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="interest-card" style={{ background: 'var(--bg-base)' }}>
                <div className="interest-num">03</div>
                <h3 className="interest-title">완성도와 책임</h3>
                <p className="interest-desc">
                  취향보다 기획 의도를 우선해, 맡은 기능을 마감 안에서 완성도까지 책임지고 구현합니다.
                  일정과 품질의 균형을 중요하게 생각합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
