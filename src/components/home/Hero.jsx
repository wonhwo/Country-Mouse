import Link from 'next/link';
import SiteMascot from '@/components/layout/SiteMascot';

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <div className="hero-eyebrow eyebrow">est. 2026 — seoul</div>
        <div className="hero-mascot-wrap">
          <SiteMascot size="hero" priority />
        </div>
        <h1 className="hero-intro">
          1인 게임 개발 스튜디오.
          <br />
          <em>손에 붙는 액션 게임을 만듭니다.</em>
        </h1>
        <p className="hero-desc">
          Unreal과 C++로 전투를 만들고, 잘 만든 게임의 구조를 뜯어봅니다. 작은 작업실 안에서,
          천천히, 정성껏.
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
