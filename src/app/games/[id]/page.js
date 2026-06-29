import GameDetail from '@/components/games/GameDetail';
import { GAMES, getGame } from '@/data/games';
import { resolveGame } from '@/lib/game-utils';
import { fetchGameById } from '@/lib/games-store';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return GAMES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const remote = await fetchGameById(id);
  const game = resolveGame(remote, id, getGame);
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
