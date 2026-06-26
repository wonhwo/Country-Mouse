import Reveal from '@/components/Reveal';
import GamesExplorer from '@/components/games/GamesExplorer';

export const metadata = {
  title: '게임',
  description: '개인 작업물을 작업한 순서대로 모아두었습니다. 출시작과 개발 중인 작업을 함께 소개합니다.',
};

export default function GamesPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/games</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">게임</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              팀 프로젝트와 개인 작업을 우선순위 순으로 모아두었습니다. 완료된 작업과 현재 개발
              중인 ProjectArc를 함께 소개합니다.
            </p>
          </Reveal>
        </div>
      </header>
      <GamesExplorer />
    </>
  );
}
