import Reveal from '@/components/Reveal';
import PlaylogsExplorer from '@/components/favorites/PlaylogsExplorer';

export const metadata = {
  title: '플레이 로그',
  description: '분석한다기보다, 그냥 오래 붙잡고 진심으로 즐긴 게임들. 왜 좋았는지 솔직하게 적어둡니다.',
};

export default function FavoritesPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/played</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">플레이 로그</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              개발자로서 분석한다기보다, 그냥 오래 붙잡고 진심으로 즐긴 게임들입니다. 왜 좋았는지,
              가끔은 왜 피곤했는지 솔직하게 적어둡니다.
            </p>
          </Reveal>
        </div>
      </header>
      <PlaylogsExplorer />
    </>
  );
}
