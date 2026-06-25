import Reveal from '@/components/Reveal';
import GamesExplorer from '@/components/games/GamesExplorer';

export const metadata = {
  title: '직접 만든 게임',
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
            <h1 className="page-title">직접 만든 게임</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              개인 작업물을 작업한 순서대로 모아두었습니다. 이미 출시한 것도 있고, 아직 만들고 있는
              것도 있습니다.
            </p>
          </Reveal>
        </div>
      </header>
      <GamesExplorer />
    </>
  );
}
