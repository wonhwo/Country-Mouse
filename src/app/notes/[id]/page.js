import NoteArticle from '@/components/notes/NoteArticle';
import { getNote } from '@/data/notes';
import { resolveNote } from '@/lib/note-utils';
import { fetchNoteBySlug } from '@/lib/notes-store';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const remote = await fetchNoteBySlug(id);
  const note = resolveNote(remote, id, getNote);
  if (!note) return { title: id };
  return {
    title: note.title,
    description: note.excerpt || undefined,
  };
}

export default async function NoteArticlePage({ params }) {
  const { id } = await params;
  return <NoteArticle slug={id} />;
}
