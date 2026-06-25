import Reveal from '@/components/Reveal';
import { FAVORITES } from '@/data/favorites';

export const metadata = {
  title: '분석한 게임',
  description: '플레이어가 아니라 개발자로서 자주 되돌아보는 게임들. 각 게임이 제 작업에 주는 영향을 정리합니다.',
};

export default function FavoritesPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/notes/games</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">분석한 게임</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              플레이어로서가 아니라 개발자로서 자주 되돌아보는 네 편의 게임입니다. 각각의 게임이 제
              작업에 여전히 영향을 주고 있습니다.
            </p>
          </Reveal>
        </div>
      </header>
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="favorites-list">
            {FAVORITES.map((f, i) => (
              <Reveal key={f.num} delay={i * 60}>
                <article className="favorite-card">
                  <div className="favorite-head">
                    <span className="favorite-num">{f.num}</span>
                    <span className="favorite-head-rule" />
                    <span>{f.studio}</span>
                  </div>
                  <h2 className="favorite-title">{f.title}</h2>
                  <p className="favorite-quote">&ldquo;{f.quote}&rdquo;</p>
                  <div className="favorite-tags">
                    {f.tags.map((t) => (
                      <span key={t} className="favorite-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
