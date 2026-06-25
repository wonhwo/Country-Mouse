import Link from 'next/link';
import MascotPlaceholder from '@/components/placeholders/MascotPlaceholder';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-mascot">
            <MascotPlaceholder size="sm" label="마스코트" dims="작게" />
          </div>
          <p className="footer-tag">
            서울의 작은 작업실에서, 천천히 게임을 만들어가는 1인 스튜디오입니다.
          </p>
        </div>
        <div>
          <div className="footer-col-label">— studio</div>
          <Link className="footer-link" href="/">
            Home
          </Link>
          <Link className="footer-link" href="/games">
            직접 만든 게임
          </Link>
          <Link className="footer-link" href="/favorites">
            분석한 게임
          </Link>
          <Link className="footer-link" href="/about">
            소개
          </Link>
        </div>
        <div>
          <div className="footer-col-label">— notes</div>
          <Link className="footer-link" href="/notes">
            작업 노트
          </Link>
          <Link className="footer-link" href="/tech">
            기술
          </Link>
          <a className="footer-link" href="#">
            RSS
          </a>
        </div>
        <div>
          <div className="footer-col-label">— reach</div>
          <a className="footer-link" href="mailto:hello@countrymouse.studio">
            hello@countrymouse.studio
          </a>
          <a className="footer-link" href="#" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="footer-link" href="#" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="footer-link" href="#">
            이력서 다운로드
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="now-playing">
          <span className="now-playing-dot" />
          <span>현재 플레이 — 몬스터 헌터 와일즈</span>
        </div>
        <div>© 2025 Country Mouse Studio · 천천히 만듭니다</div>
      </div>
    </footer>
  );
}
