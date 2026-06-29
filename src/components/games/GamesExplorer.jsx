'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GameCapsule from '@/components/games/GameCapsule';
import { useGames } from '@/hooks/useGames';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'unreal', label: 'Unreal' },
  { id: 'unity', label: 'Unity' },
  { id: 'web', label: 'Web' },
];

export default function GamesExplorer() {
  const { games } = useGames();
  const [filter, setFilter] = useState('all');
  const filtered = games.filter((g) => (filter === 'all' ? true : g.engineKey === filter));

  const counts = {
    all: games.length,
    unreal: games.filter((g) => g.engineKey === 'unreal').length,
    unity: games.filter((g) => g.engineKey === 'unity').length,
    web: games.filter((g) => g.engineKey === 'web').length,
  };

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="filter-strip">
            {FILTERS.map((f, i) => (
              <Fragment key={f.id}>
                <button
                  className={`filter-chip ${filter === f.id ? 'active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span className="count">({counts[f.id]})</span>
                </button>
                {i < FILTERS.length - 1 && <div className="filter-divider" />}
              </Fragment>
            ))}
          </div>
        </Reveal>
        <div className="games-grid">
          {filtered.map((g, i) => (
            <Reveal key={g.id} delay={(i % 2) * 80}>
              <Link className="game-card" href={`/games/${g.id}`}>
                <GameCapsule title={g.title} engine={g.engine} src={g.thumbnail} />
                <div className="game-meta">
                  <div className="game-row">
                    <h3 className="game-title">{g.title}</h3>
                  </div>
                  <div className="game-row">
                    <span className={`status-pill ${g.status}`}>● {g.statusLabel}</span>
                    {getYoutubeEmbedUrl(g.videoUrl) && (
                      <span className="game-video-pill">▶ 시연 영상</span>
                    )}
                  </div>
                  {g.award && (
                    <p className="game-award">{g.award}</p>
                  )}
                  <p className="game-tagline">{g.tagline}</p>
                  <div className="game-stack">
                    {g.stack.map((s) => (
                      <span key={s} className="stack-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
