'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import GameCapsule from '@/components/games/GameCapsule';
import { GAMES } from '@/data/games';

const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'unreal', label: 'Unreal' },
  { id: 'unity', label: 'Unity' },
  { id: 'web', label: 'Web' },
];

export default function GamesExplorer() {
  const [filter, setFilter] = useState('all');
  const filtered = GAMES.filter((g) => (filter === 'all' ? true : g.engineKey === filter));

  const counts = {
    all: GAMES.length,
    unreal: GAMES.filter((g) => g.engineKey === 'unreal').length,
    unity: GAMES.filter((g) => g.engineKey === 'unity').length,
    web: GAMES.filter((g) => g.engineKey === 'web').length,
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
