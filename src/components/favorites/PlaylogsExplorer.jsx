'use client';

import Reveal from '@/components/Reveal';
import FavoriteIcon from '@/components/favorites/FavoriteIcon';
import { usePlaylogs } from '@/hooks/usePlaylogs';

export default function PlaylogsExplorer() {
  const { playlogs } = usePlaylogs();

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="favorites-list">
          {playlogs.map((f, i) => (
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
  );
}
