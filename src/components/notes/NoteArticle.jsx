'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Reveal from '@/components/Reveal';
import { getNote } from '@/data/notes';
import { fetchNoteBySlug } from '@/lib/notes-store';
import { resolveNote } from '@/lib/note-utils';

function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="lead">{block.text}</p>;
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'quote':
      return <blockquote>{block.text}</blockquote>;
    case 'p':
    default:
      return <p>{block.text}</p>;
  }
}

export default function NoteArticle({ slug }) {
  const [note, setNote] = useState(() => getNote(slug) ?? null);
  const [loading, setLoading] = useState(() => !getNote(slug));

  useEffect(() => {
    const legacy = getNote(slug);
    if (legacy) {
      setNote(legacy);
      setLoading(false);
      return;
    }

    let active = true;
    setNote(null);
    setLoading(true);

    fetchNoteBySlug(slug)
      .then((remote) => {
        if (!active) return;
        setNote(resolveNote(remote, slug, getNote));
      })
      .catch(() => {
        if (active) setNote(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="container-narrow" style={{ padding: '180px 40px' }}>
        <p className="page-desc">불러오는 중…</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container-narrow" style={{ padding: '180px 40px' }}>
        <p className="page-desc">노트를 찾을 수 없습니다.</p>
        <Link className="btn-ghost" href="/notes">
          목록으로
        </Link>
      </div>
    );
  }

  return (
    <article className="article">
      <div className="container-narrow">
        <Link className="btn-back" href="/notes">
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M11 5H1M5 1L1 5l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          모든 작업 노트로
        </Link>

        <header className="article-head">
          <Reveal>
            <span className="article-tag">{note.tag}</span>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="article-title">{note.title}</h1>
          </Reveal>
          <Reveal delay={120}>
            <div className="article-meta">
              <span>{note.date}</span>
              <span className="article-meta-dot" />
              <span>{note.read} 분량</span>
              <span className="article-meta-dot" />
              <span>작성: 1인 작업실</span>
            </div>
          </Reveal>
        </header>

        <div className="article-body">
          {note.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <div className="article-end">
          <Link className="btn-ghost" href="/notes">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M13 5H1M5 1L1 5l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            다른 작업 노트 보기
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-tertiary)' }}>
            {note.date}
          </span>
        </div>
      </div>
    </article>
  );
}
