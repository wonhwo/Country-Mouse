'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { useNotes } from '@/hooks/useNotes';

export default function NotesExplorer() {
  const { notes, loading } = useNotes();
  const [filter, setFilter] = useState('all');
  const tags = ['all', ...Array.from(new Set(notes.map((n) => n.tag)))];
  const filtered = notes.filter((n) => (filter === 'all' ? true : n.tag === filter));

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal>
          <div className="filter-strip">
            {tags.map((t, i) => (
              <Fragment key={t}>
                <button
                  className={`filter-chip ${filter === t ? 'active' : ''}`}
                  onClick={() => setFilter(t)}
                >
                  {t === 'all' ? '전체' : t}
                  {t === 'all' && <span className="count">({notes.length})</span>}
                </button>
                {i < tags.length - 1 && <div className="filter-divider" />}
              </Fragment>
            ))}
          </div>
        </Reveal>

        {loading && notes.length === 0 && <p className="page-desc">불러오는 중…</p>}

        <div className="notes-list">
          {filtered.map((n, i) => (
            <Reveal key={n.id} delay={i * 40}>
              <Link className="note-row" href={`/notes/${n.id}`}>
                <div className="note-row-main">
                  <div className="note-row-tag">{n.tag}</div>
                  <h3 className="note-row-title">{n.title}</h3>
                  <p className="note-row-excerpt">{n.excerpt}</p>
                </div>
                <div className="note-row-meta">
                  {n.date} · {n.read}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
