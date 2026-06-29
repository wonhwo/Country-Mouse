import Link from 'next/link';
import SiteMascot from '@/components/layout/SiteMascot';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-mascot">
            <SiteMascot size="sm" />
          </div>
          <p className="footer-tag">
            서울의 작은 작업실에서, 천천히 게임을 만들어가는 1인 스튜디오입니다.
          </p>
        </div>
        <div>
          <div className="footer-col-label">— studio</div>
          <Link className="footer-link" href="/">
            홈
          </Link>
          <Link className="footer-link" href="/games">
            게임
          </Link>
          <Link className="footer-link" href="/favorites">
            플레이 로그
          </Link>
          <Link className="footer-link" href="/about">
            소개
          </Link>
        </div>
        <div>
          <div className="footer-col-label">— notes</div>
          <Link className="footer-link" href="/notes">
            노트
          </Link>
          <Link className="footer-link" href="/guestbook">
            방명록
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
          <a className="footer-link" href="mailto:reppy0813@gmail.com">
            reppy0813@gmail.com
          </a>
          <a
            className="footer-link"
            href="https://github.com/wonhwo"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
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
        <div>© 2026 Country Mouse Studio · 천천히 만듭니다</div>
      </div>
    </footer>
  );
}
