import NoteArticle from '@/components/notes/NoteArticle';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return { title: id };
}

export default async function NoteArticlePage({ params }) {
  const { id } = await params;
  return <NoteArticle slug={id} />;
}
