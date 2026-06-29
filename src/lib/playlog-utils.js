import { parseLines } from '@/lib/game-utils';

function normalizeStringArray(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : typeof value === 'object' ? Object.values(value) : [];
  return list.map((item) => String(item ?? '').trim()).filter(Boolean);
}

export function toPublicPlaylog(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    num: data.num || doc.id,
    title: data.title || '',
    dev: data.dev || '',
    playtime: data.playtime || '',
    icon: data.icon || '',
    quote: data.quote || '',
    tags: normalizeStringArray(data.tags),
    published: Boolean(data.published),
    sortOrder: Number(data.sortOrder) || 0,
  };
}

export function resolvePlaylog(remote, id, getLegacy = () => null) {
  const legacy = getLegacy(id);
  if (!remote) return legacy ?? null;
  if (!remote.published && !legacy) return null;
  if (remote.published) return remote;
  return legacy ?? remote;
}

export function serializePlaylogForFirestore(entry) {
  return {
    num: entry.num,
    title: entry.title,
    dev: entry.dev,
    playtime: entry.playtime,
    icon: entry.icon || '',
    quote: entry.quote,
    tags: normalizeStringArray(entry.tags),
    published: Boolean(entry.published),
    sortOrder: Number(entry.sortOrder) || Number(entry.num) || 0,
  };
}

export function formatPlaylogNum(value, fallback = 1) {
  const n = parseInt(String(value).replace(/\D/g, ''), 10) || fallback;
  return String(n).padStart(2, '0');
}

export { parseLines };
