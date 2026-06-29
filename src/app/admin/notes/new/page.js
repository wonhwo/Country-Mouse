import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminGate from '@/components/admin/AdminGate';
import NoteEditor from '@/components/admin/NoteEditor';

export const metadata = {
  title: '새 노트',
  robots: { index: false, follow: false },
};

export default function AdminNoteNewPage() {
  return (
    <>
      <header className="page-head">
        <div className="container-narrow">
          <Reveal>
            <Link className="btn-back" href="/admin/notes">
              ← 노트 목록
            </Link>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="page-title account-page-title">새 노트</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow">
          <AdminGate>
            <NoteEditor />
          </AdminGate>
        </div>
      </section>
    </>
  );
}
