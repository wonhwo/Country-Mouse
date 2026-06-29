import { FAVORITES } from '@/data/favorites';

export function usePlaylogs() {
  return { playlogs: FAVORITES, loading: false };
}
