'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import GameCapsule from '@/components/games/GameCapsule';
import GameScreenshot from '@/components/games/GameScreenshot';
import GameVideo from '@/components/games/GameVideo';
import { getGame } from '@/data/games';
import { resolveGame } from '@/lib/game-utils';
import { fetchGameById } from '@/lib/games-store';
import { getYoutubeEmbedUrl } from '@/lib/youtube';

export default function GameDetail({ id }) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchGameById(id)
      .then((remote) => {
        if (!active) return;
        setGame(resolveGame(remote, id, getGame));
      })
      .catch(() => {
        if (active) setGame(getGame(id) ?? null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '180px 40px' }}>
        <p className="page-desc">불러오는 중…</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container" style={{ padding: '180px 40px' }}>
        <p className="page-desc">게임을 찾을 수 없습니다.</p>
        <Link className="btn-ghost" href="/games">
          목록으로
        </Link>
      </div>
    );
  }

  const hasVideo = Boolean(getYoutubeEmbedUrl(game.videoUrl));

  return (
    <>
      <header className="gd-head">
        <div className="container">
          <Link className="btn-back" href="/games">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path
                d="M11 5H1M5 1L1 5l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            게임으로
          </Link>
        </div>
        <div className="gd-capsule-wrap">
          <Reveal>
            <GameCapsule
              title={game.title}
              engine={game.engine}
              src={game.thumbnail}
              large
              priority
            />
          </Reveal>
        </div>
      </header>

      <section style={{ padding: 0 }}>
        <div className="gd-body">
          <Reveal>
            <div>
              <h1 className="gd-title">{game.title}</h1>
              <p className="gd-tagline">{game.tagline}</p>
              <div className="gd-desc">
                {game.longDesc.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {game.highlights?.length > 0 && (
                <ul className="gd-highlights">
                  {game.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {(game.links.length > 0 || hasVideo) && (
                <div className="gd-links">
                  {hasVideo && (
                    <a
                      href={game.videoUrl}
                      className="btn-outline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      시연 영상 (YouTube) ↗
                    </a>
                  )}
                  {game.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.url}
                      className="btn-outline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <aside className="gd-info-card">
              <div className="gd-info-row">
                <div className="gd-info-key">상태</div>
                <div className="gd-info-val">
                  <span className={`status-pill ${game.status} status-pill-inline`}>
                    ● {game.statusLabel}
                  </span>
                </div>
              </div>
              {game.award && (
                <div className="gd-info-row">
                  <div className="gd-info-key">수상 · 성과</div>
                  <div className="gd-info-val">{game.award}</div>
                </div>
              )}
              <div className="gd-info-row">
                <div className="gd-info-key">엔진</div>
                <div className="gd-info-val">{game.engine}</div>
              </div>
              <div className="gd-info-row">
                <div className="gd-info-key">시작</div>
                <div className="gd-info-val">{game.started}</div>
              </div>
              <div className="gd-info-row">
                <div className="gd-info-key">역할</div>
                <div className="gd-info-val">{game.role}</div>
              </div>
              <div className="gd-info-row">
                <div className="gd-info-key">스택</div>
                <div className="gd-info-val gd-info-stack">
                  {game.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {hasVideo && (
        <section className="gd-video-section">
          <Reveal>
            <div className="section-label" style={{ maxWidth: 1240, margin: '0 auto 32px' }}>
              <span className="section-label-num">—</span>
              <span>시연 영상</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <GameVideo url={game.videoUrl} title={game.title} />
          </Reveal>
        </section>
      )}

      <section className="gd-screens">
        <Reveal>
          <div className="section-label" style={{ maxWidth: 1240, margin: '0 auto 32px' }}>
            <span className="section-label-num">—</span>
            <span>스크린샷</span>
          </div>
        </Reveal>
        <div className="gd-screens-grid">
          {game.screenshots?.length
            ? game.screenshots.map((src, i) => (
                <Reveal key={src} delay={i * 60}>
                  <GameScreenshot src={src} title={game.title} index={i + 1} />
                </Reveal>
              ))
            : [1, 2, 3, 4].map((i) => (
                <Reveal key={i} delay={i * 60}>
                  <GameScreenshot src={null} title={game.title} index={i} />
                </Reveal>
              ))}
        </div>
      </section>
    </>
  );
}
