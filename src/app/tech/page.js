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
                <h3 className="tech-engine-name">Unity</h3>
                <div className="tech-engine-level">3년차 · 실무 사용 중</div>
                <p className="tech-engine-desc">
                  HITGAME에서 매일 사용하는 엔진입니다. C# 기반 모바일 출시 워크플로우, 라이브 운영,
                  광고 / IAP 통합을 실무에서 다룹니다. 직접 만든 에디터 도구도 운영 중입니다.
                </p>
                <div className="tech-engine-list">
                  <span>C#</span>
                  <span>URP</span>
                  <span>Addressables</span>
                  <span>UI Toolkit</span>
                  <span>AdMob</span>
                  <span>Firebase</span>
                </div>
              </div>
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">Unreal Engine 5</h3>
                <div className="tech-engine-level">학습 중 · 개인 프로젝트</div>
                <p className="tech-engine-desc">
                  ProjectArc를 통해 본격적으로 익히고 있는 엔진입니다. Blueprint는 프로토타입과 콘텐츠
                  구성에만 쓰고, 핵심 로직은 C++로 작성하는 방식을 따르고 있습니다.
                </p>
                <div className="tech-engine-list">
                  <span>C++</span>
                  <span>PaperZD</span>
                  <span>StateTree</span>
                  <span>Niagara</span>
                  <span>Enhanced Input</span>
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
                  <li>C# (5+ yrs)</li>
                  <li>C++ (학습 중)</li>
                  <li>Python (스크립트)</li>
                  <li>HLSL (기초)</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— ide &amp; vcs</h4>
                <ul>
                  <li>JetBrains Rider</li>
                  <li>Visual Studio</li>
                  <li>Git / GitHub</li>
                  <li>Perforce (실무)</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— content</h4>
                <ul>
                  <li>Aseprite (픽셀 아트)</li>
                  <li>Photoshop</li>
                  <li>Figma</li>
                  <li>OBS Studio</li>
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
                <h3 className="interest-title">게임플레이 프로그래밍</h3>
                <p className="interest-desc">
                  입력 응답성, 카메라 워크, 캐릭터 컨트롤러, 무기 메카닉. 플레이어가 직접 만지는 부분을
                  깎는 것이 가장 즐겁습니다. 최근에는 ProjectArc에서 커스텀 캐릭터 무브먼트 컴포넌트를
                  작업하고 있습니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="interest-card" style={{ background: 'var(--bg-base)' }}>
                <div className="interest-num">02</div>
                <h3 className="interest-title">게임 시스템 디자인</h3>
                <p className="interest-desc">
                  RimWorld의 AI 디렉터, Dyson Sphere의 물류, 몬스터 헌터의 진행 루프 — 게임을 떠받치는
                  구조에 매력을 느낍니다. 시스템 사이의 피드백 루프를 설계하는 작업을 자주 합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="interest-card" style={{ background: 'var(--bg-base)' }}>
                <div className="interest-num">03</div>
                <h3 className="interest-title">멀티플레이 시스템</h3>
                <p className="interest-desc">
                  Replication, RPC, Client Prediction. Unreal의 네트워킹 모델을 본격적으로 익히고
                  있고, 협동 보스 헌팅을 멀티플레이로 직접 구현해보는 게 다음 목표입니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
