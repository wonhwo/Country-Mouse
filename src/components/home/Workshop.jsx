import Reveal from '@/components/Reveal';

export default function Workshop() {
  return (
    <section className="workshop-bg">
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="section-label-num">02</span>
            <span>작업실</span>
          </div>
        </Reveal>
        <div className="workshop">
          <Reveal>
            <p className="workshop-text">
              한 사람이 운영하는 작은 작업실입니다. 낮에는 게임 회사에서 Unity로 클라이언트를
              개발하고, 작업실에서는 Unreal과 C++로 액션 게임을 만듭니다. <em>표면 아래의 시스템</em>{' '}
              — 이동, 전투, 타격감의 조용한 논리 — 에 가장 큰 관심이 있습니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="now-card">
              <div className="now-card-label">— now</div>
              <div className="now-row">
                <span className="now-row-key">작업 중</span>
                <span className="now-row-val">개인 액션 프로젝트</span>
              </div>
              <div className="now-row">
                <span className="now-row-key">학습 중</span>
                <span className="now-row-val">Unreal · C++ 전투 시스템</span>
              </div>
              <div className="now-row">
                <span className="now-row-key">읽는 중</span>
                <span className="now-row-val">게임 프로그래밍 패턴</span>
              </div>
              <div className="now-row">
                <span className="now-row-key">플레이 중</span>
                <span className="now-row-val">몬스터 헌터 와일즈</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
