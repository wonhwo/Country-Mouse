'use client';

import { useEffect, useState } from 'react';
import { NOTES } from '@/data/notes';
import { fetchPublishedNotes } from '@/lib/notes-store';

export function useNotes() {
  const [notes, setNotes] = useState(NOTES);
  const [loading, setLoading] = useState(false);
  const [fromFirestore, setFromFirestore] = useState(false);

  useEffect(() => {
    let active = true;

    fetchPublishedNotes()
      .then((remote) => {
        if (!active) return;
        if (remote.length > 0) {
          setNotes(remote);
          setFromFirestore(true);
        }
      })
      .catch(() => {
        /* Firestore 미설정·인덱스 미생성 시 기존 notes.js 유지 */
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { notes, loading, fromFirestore };
}
