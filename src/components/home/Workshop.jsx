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
              한 사람이 운영하는 작은 작업실입니다. HITGAME에서 Unity로 일하며, 현재 Unreal Engine을
              본격적으로 익히고 있습니다. <em>표면 아래의 시스템</em> — 이동, 전투, 멀티플레이의 조용한
              논리 — 에 가장 큰 관심이 있습니다.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="now-card">
              <div className="now-card-label">— now</div>
              <div className="now-row">
                <span className="now-row-key">작업 중</span>
                <span className="now-row-val">ProjectArc</span>
              </div>
              <div className="now-row">
                <span className="now-row-key">학습 중</span>
                <span className="now-row-val">Unreal Engine 5 네트워킹</span>
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
