import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { NOTES } from '@/data/notes';

export default function FieldNotesHome() {
  const preview = NOTES.slice(0, 3);
  return (
    <section>
      <div className="container">
        <Reveal>
          <div className="section-label">
            <span className="section-label-num">03</span>
            <span>작업 노트</span>
          </div>
        </Reveal>
        <div className="notes-grid">
          {preview.map((n, i) => (
            <Reveal key={n.id} delay={i * 80}>
              <Link className="note-card" href={`/notes/${n.id}`}>
                <div className="note-card-tag">{n.tag}</div>
                <h3 className="note-card-title">{n.title}</h3>
                <div className="note-card-meta">
                  <span>{n.date}</span>
                  <span>{n.read}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <Reveal>
            <Link className="btn-ghost" href="/notes">
              모든 작업 노트 보기
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path
                  d="M1 5h12M9 1l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
