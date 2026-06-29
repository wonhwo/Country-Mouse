import { GAMES } from '@/data/games';

export function useGames() {
  return { games: GAMES, loading: false };
}
