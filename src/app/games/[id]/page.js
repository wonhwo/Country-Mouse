import GameDetail from '@/components/games/GameDetail';
import { GAMES, getGame } from '@/data/games';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return GAMES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const game = getGame(id);
  if (!game) return {};
  return {
    title: game.title,
    description: game.tagline,
  };
}

export default async function GameDetailPage({ params }) {
  const { id } = await params;
  return <GameDetail id={id} />;
}
