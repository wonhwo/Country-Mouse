import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import { NOTES, getNote } from '@/data/notes';

export function generateStaticParams() {
  return NOTES.map((n) => ({ id: n.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const note = getNote(id);
  if (!note) return {};
  return {
    title: note.title,
    description: note.excerpt,
  };
}

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

export default async function NoteArticlePage({ params }) {
  const { id } = await params;
  const note = getNote(id);
  if (!note) notFound();

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

        <Reveal delay={180}>
          <div className="article-body">
            {note.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </Reveal>

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
