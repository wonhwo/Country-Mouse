import { slugify } from '@/lib/note-utils';

export { slugify };

export function parseLines(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseParagraphs(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
}

export function parseLinks(text) {
  return parseLines(text)
    .map((line) => {
      const [label, url] = line.split('|').map((part) => part.trim());
      return label && url ? { label, url } : null;
    })
    .filter(Boolean);
}

export function linksToText(links = []) {
  return links.map((link) => `${link.label}|${link.url}`).join('\n');
}

function normalizeStringArray(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : typeof value === 'object' ? Object.values(value) : [];
  return list.map((item) => String(item ?? '').trim()).filter(Boolean);
}

function normalizeLinks(value) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((link) => link && link.label && link.url)
    .map((link) => ({ label: String(link.label), url: String(link.url) }));
}

export function toPublicGame(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    title: data.title || '',
    engine: data.engine || '',
    engineKey: data.engineKey || 'unreal',
    status: data.status || 'released',
    statusLabel: data.statusLabel || '',
    award: data.award || '',
    tagline: data.tagline || '',
    stack: normalizeStringArray(data.stack),
    longDesc: normalizeStringArray(data.longDesc),
    highlights: normalizeStringArray(data.highlights),
    started: data.started || '',
    role: data.role || '',
    links: normalizeLinks(data.links),
    videoUrl: data.videoUrl || null,
    thumbnail: data.thumbnail || null,
    screenshots: normalizeStringArray(data.screenshots),
    published: Boolean(data.published),
    sortOrder: Number(data.sortOrder) || 0,
  };
}

export function resolveGame(remote, id, getLegacy = () => null) {
  const legacy = getLegacy(id);
  if (!remote) return legacy ?? null;
  if (!remote.published && !legacy) return null;
  if (remote.published) return remote;
  return legacy ?? remote;
}

export function serializeGameForFirestore(game) {
  return {
    title: game.title,
    engine: game.engine,
    engineKey: game.engineKey,
    status: game.status,
    statusLabel: game.statusLabel,
    award: game.award || '',
    tagline: game.tagline,
    stack: normalizeStringArray(game.stack),
    longDesc: normalizeStringArray(game.longDesc),
    highlights: normalizeStringArray(game.highlights),
    started: game.started,
    role: game.role,
    links: normalizeLinks(game.links),
    videoUrl: game.videoUrl || null,
    thumbnail: game.thumbnail || null,
    screenshots: normalizeStringArray(game.screenshots),
    published: Boolean(game.published),
    sortOrder: Number(game.sortOrder) || 0,
  };
}
