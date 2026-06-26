import Reveal from '@/components/Reveal';

export const metadata = {
  title: '기술',
  description: '실제로 작업에 사용하는 엔진, 언어, 도구, 그리고 가장 깊이 파고들고 있는 영역을 정리합니다.',
};

const SYSTEMS = [
  {
    title: 'StateTree · 보스 AI',
    desc: '거리·방향·페이즈에 따라 행동이 달라지는 보스 의사결정. Operation DDT, ProjectArc에서 사용.',
    tags: ['StateTree', 'Gameplay Tags', '페이즈'],
  },
  {
    title: 'Behavior Tree · NPC',
    desc: 'Blackboard와 Task Node로 손님 AI 흐름을 구성. SususuSuper-nova 상점 시뮬레이션.',
    tags: ['Behavior Tree', 'Blackboard', 'Data Table'],
  },
  {
    title: '전투 · 타격 판정',
    desc: 'Bézier 궤적 Line Trace, 패링·저스트 회피, Motion Warping. Project Aurora 중심.',
    tags: ['Montage', 'AnimNotify', 'Motion Warping'],
  },
  {
    title: '이동 · 애니메이션',
    desc: 'Motion Matching 기반 이동, Enhanced Input, 카메라 기준 조작. Aurora·테토루와 아이루.',
    tags: ['Motion Matching', 'Enhanced Input', 'C++'],
  },
  {
    title: '멀티플레이',
    desc: 'Steam Online Subsystem, RPC·Replication으로 4인 협동 동기화. 테토루와 아이루.',
    tags: ['Replication', 'Steam', 'RPC'],
  },
  {
    title: 'UI · UMG',
    desc: 'Intro·로딩·대화·HUD 흐름, 스킬바·보스 HP 등 인게임 UI. 여러 UE 프로젝트.',
    tags: ['UMG', 'Widget Animation', 'HUD'],
  },
  {
    title: '에디터 · 데이터',
    desc: 'HTTP API 연동 에디터 플러그인, 런타임 Gameplay Tag·스탯 동기화. Operation DDT.',
    tags: ['Editor Plugin', 'Data Table', 'API'],
  },
  {
    title: '2D · 프로시저럴',
    desc: 'BSP 던전 생성, 탑다운 전투·스킬 레벨업. SoulTown 1인 개발.',
    tags: ['Unity', 'Tilemap', 'C#'],
  },
];

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
              포트폴리오 프로젝트에서 실제로 다룬 엔진, 시스템, 언어를 정리했습니다. 엔진 두
              개만 쓰는 게 아니라, 전투·AI·네트워킹·UI까지 프로젝트마다 다른 조합으로
              작업해 왔습니다.
            </p>
          </Reveal>
        </div>
      </header>

      <section style={{ paddingTop: 40 }}>
        <div className="container">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">01</span>
              <span>엔진 &amp; 스택</span>
            </div>
          </Reveal>
          <Reveal>
            <div className="tech-engines">
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">Unreal Engine 5</h3>
                <div className="tech-engine-level">개인 작업 · 포트폴리오 주력</div>
                <p className="tech-engine-desc">
                  C++ 중심으로 전투·AI·네트워킹을 구현합니다. Aurora, DDT, 테토루와 아이루 등
                  대부분의 UE 프로젝트가 여기 있습니다. Blueprint는 SeArk처럼 UI·프로토타입에
                  씁니다.
                </p>
                <div className="tech-engine-list">
                  <span>C++</span>
                  <span>Blueprint</span>
                  <span>StateTree</span>
                  <span>UMG</span>
                  <span>Niagara</span>
                  <span>Replication</span>
                </div>
              </div>
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">Unity</h3>
                <div className="tech-engine-level">회사 실무 · 2D 1인 개발</div>
                <p className="tech-engine-desc">
                  현재 게임 회사에서 매일 쓰는 클라이언트 엔진입니다. SoulTown은 Unity 2D로
                  처음부터 끝까지 1인 개발했습니다.
                </p>
                <div className="tech-engine-list">
                  <span>C#</span>
                  <span>UGUI</span>
                  <span>2D Tilemap</span>
                  <span>Animator</span>
                  <span>Addressables</span>
                </div>
              </div>
              <div className="tech-engine-card">
                <h3 className="tech-engine-name">React · 웹</h3>
                <div className="tech-engine-level">풀스택 커뮤니티 프로젝트</div>
                <p className="tech-engine-desc">
                  Geek LoL에서 프론트엔드를 맡았습니다. 컴포넌트 단위 구조, JWT·OAuth 인증,
                  Spring 백엔드와 REST API 연동.
                </p>
                <div className="tech-engine-list">
                  <span>React</span>
                  <span>SCSS</span>
                  <span>Spring</span>
                  <span>JWT</span>
                  <span>REST API</span>
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
              <span>프로젝트에서 다룬 시스템</span>
            </div>
          </Reveal>
          <div className="tech-system-grid">
            {SYSTEMS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 60}>
                <div className="tech-system-card">
                  <h3 className="tech-system-title">{s.title}</h3>
                  <p className="tech-system-desc">{s.desc}</p>
                  <div className="tech-system-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="stack-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <div className="section-label">
              <span className="section-label-num">03</span>
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
                  <li>C</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— backend &amp; db</h4>
                <ul>
                  <li>MySQL</li>
                  <li>Spring</li>
                  <li>REST API</li>
                  <li>JWT / OAuth</li>
                  <li>AWS</li>
                  <li>Linux</li>
                </ul>
              </div>
              <div className="tech-list-block">
                <h4>— tools</h4>
                <ul>
                  <li>Git / GitHub</li>
                  <li>Visual Studio</li>
                  <li>HTML / CSS / SCSS</li>
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
              <span className="section-label-num">04</span>
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
                  취향보다 기획 의도를 우선해, 맡은 기능을 마감 안에서 완성도까지 책임지고
                  구현합니다. 일정과 품질의 균형을 중요하게 생각합니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
