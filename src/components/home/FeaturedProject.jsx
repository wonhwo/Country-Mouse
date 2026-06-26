import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CapsulePlaceholder from '@/components/placeholders/CapsulePlaceholder';

export default function FeaturedProject() {
  return (
    <section>
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="section-label-num">01</span>
            <span>현재 작업</span>
          </div>
        </Reveal>
        <div className="featured">
          <Reveal>
            <Link href="/games/projectarc" style={{ display: 'block' }}>
              <CapsulePlaceholder title="ProjectArc" engine="UE5" />
            </Link>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h2 className="featured-title">ProjectArc</h2>
              <p className="featured-desc">
                손에 붙는 전투와 패링이 핵심인 개인 UE5 액션 프로젝트입니다. C++ 중심으로 입력
                응답성과 전투 타이밍을 다듬고 있습니다.
              </p>
              <div>
                <span className="status-pill dev">● 개발 중</span>
              </div>
              <Link className="btn-primary" href="/games/projectarc">
                프로젝트 페이지로
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path
                    d="M1 5h12M9 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
