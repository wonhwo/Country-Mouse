'use client';

import { useEffect, useState } from 'react';
import { fetchPublishedGuestbook } from '@/lib/guestbook-store';

export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = () => {
    setLoading(true);
    return fetchPublishedGuestbook()
      .then(setEntries)
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let active = true;

    fetchPublishedGuestbook()
      .then((remote) => {
        if (active) setEntries(remote);
      })
      .catch(() => {
        if (active) setEntries([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { entries, loading, reload };
}
