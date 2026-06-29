'use client';

import { useEffect, useState } from 'react';
import { FAVORITES } from '@/data/favorites';
import { fetchPublishedPlaylogs } from '@/lib/playlogs-store';

export function usePlaylogs() {
  const [playlogs, setPlaylogs] = useState(FAVORITES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    fetchPublishedPlaylogs()
      .then((remote) => {
        if (!active) return;
        if (remote.length > 0) setPlaylogs(remote);
      })
      .catch(() => {
        /* Firestore 미설정 시 favorites.js 유지 */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { playlogs, loading };
}
