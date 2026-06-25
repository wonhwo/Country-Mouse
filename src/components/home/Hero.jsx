import Link from 'next/link';
import MascotPlaceholder from '@/components/placeholders/MascotPlaceholder';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow eyebrow">est. 2026 — seoul</div>
        <div className="hero-mascot-wrap">
          <MascotPlaceholder size="hero" label="마스코트 일러스트" dims="1 : 1 · 약 420px" />
        </div>
        <h1 className="hero-intro">
          1인 게임 개발 스튜디오.
          <br />
          <em>시스템을 설계하고 게임을 만듭니다.</em>
        </h1>
        <p className="hero-desc">
          Unity와 Unreal Engine으로 작업하며, 게임 시스템과 멀티플레이를 깊이 파고듭니다. 작은
          작업실 안에서, 천천히, 정성껏.
        </p>
        <Link className="hero-status" href="/games/projectarc">
          <span className="hero-status-dot" />
          <span>현재 개발 중</span>
          <span style={{ color: 'var(--accent-blue-deep)', fontWeight: 500 }}>ProjectArc</span>
        </Link>
      </div>
      <div className="hero-scroll">
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </header>
  );
}
