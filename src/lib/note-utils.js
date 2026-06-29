const SLUG_RE = /[^a-z0-9가-힣]+/g;

export function slugify(input) {
  return input
    .trim()
    .toLowerCase()
    .replace(SLUG_RE, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

export function formatNoteDate(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function estimateReadMinutes(text) {
  const chars = text.replace(/\s/g, '').length;
  return `${Math.max(1, Math.round(chars / 500))}분`;
}

/** 본문 텍스트 → 블록 배열 (첫 단락 lead, ## h2, > 인용) */
export function parseBodyText(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];

  return trimmed.split(/\n\n+/).map((part, index) => {
    const block = part.trim();
    if (block.startsWith('## ')) return { type: 'h2', text: block.slice(3).trim() };
    if (block.startsWith('> ')) return { type: 'quote', text: block.slice(2).trim() };
    return { type: index === 0 ? 'lead' : 'p', text: block };
  });
}

export function blocksToText(body = []) {
  return body
    .map((block) => {
      if (block.type === 'h2') return `## ${block.text}`;
      if (block.type === 'quote') return `> ${block.text}`;
      return block.text;
    })
    .join('\n\n');
}

export function serializeBodyForFirestore(body = []) {
  return body.map((block) => ({
    type: block.type || 'p',
    text: String(block.text ?? ''),
  }));
}

export function resolveNote(remote, slug, getLegacy = () => null) {
  const legacy = getLegacy(slug);
  if (!remote) return legacy ?? null;
  if (!remote.published && !legacy) return null;

  const body =
    remote.body?.length > 0 ? remote.body : legacy?.body?.length > 0 ? legacy.body : [];

  const note = { ...remote, body };
  if (remote.published) return note;
  return legacy ?? note;
}

export function normalizeBody(body) {
  if (!body) return [];
  const list = Array.isArray(body) ? body : typeof body === 'object' ? Object.values(body) : [];
  return list
    .filter((block) => block && (block.text || block.type))
    .map((block) => ({
      type: block.type || 'p',
      text: String(block.text ?? ''),
    }))
    .filter((block) => block.text.length > 0);
}

export function toPublicNote(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    slug: doc.id,
    tag: data.tag || '노트',
    title: data.title || '',
    date: data.date || formatNoteDate(),
    read: data.read || '5분',
    excerpt: data.excerpt || '',
    body: normalizeBody(data.body),
    published: Boolean(data.published),
  };
}
