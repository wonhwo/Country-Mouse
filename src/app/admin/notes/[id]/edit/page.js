import Link from 'next/link';
import Reveal from '@/components/Reveal';
import AdminGate from '@/components/admin/AdminGate';
import NoteEditor from '@/components/admin/NoteEditor';

export const metadata = {
  title: '노트 수정',
  robots: { index: false, follow: false },
};

export default async function AdminNoteEditPage({ params }) {
  const { id } = await params;

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
            <h1 className="page-title account-page-title">노트 수정</h1>
          </Reveal>
        </div>
      </header>
      <section className="account-section">
        <div className="container-narrow">
          <AdminGate>
            <NoteEditor slug={id} />
          </AdminGate>
        </div>
      </section>
    </>
  );
}
