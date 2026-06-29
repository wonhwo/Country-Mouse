'use client';

import { useEffect, useState } from 'react';
import { GAMES } from '@/data/games';
import { fetchPublishedGames } from '@/lib/games-store';

export function useGames() {
  const [games, setGames] = useState(GAMES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    fetchPublishedGames()
      .then((remote) => {
        if (!active) return;
        if (remote.length > 0) setGames(remote);
      })
      .catch(() => {
        /* Firestore 미설정 시 games.js 유지 */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { games, loading };
}
