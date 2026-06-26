import Reveal from '@/components/Reveal';
import FavoriteIcon from '@/components/favorites/FavoriteIcon';
import { FAVORITES } from '@/data/favorites';

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
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="favorites-list">
            {FAVORITES.map((f, i) => (
              <Reveal key={f.num} delay={i * 60}>
                <article className="favorite-card">
                  <div className="favorite-top">
                    <FavoriteIcon title={f.title} src={f.icon} />
                    <div className="favorite-top-text">
                      <div className="favorite-head">
                        <span className="favorite-num">{f.num}</span>
                        <span className="favorite-head-rule" />
                        <span>{f.dev}</span>
                      </div>
                      <h2 className="favorite-title">{f.title}</h2>
                      <span className="favorite-playtime">플레이 {f.playtime}</span>
                    </div>
                  </div>
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
