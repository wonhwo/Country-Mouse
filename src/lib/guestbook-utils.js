export function formatGuestbookDate(value) {
  if (!value) return '';

  const date =
    typeof value?.toDate === 'function'
      ? value.toDate()
      : value instanceof Date
        ? value
        : new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export function toPublicGuestbookEntry(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    uid: data.uid || '',
    githubLogin: data.githubLogin || '',
    name: data.name || data.githubLogin || '',
    message: data.message || '',
    approved: Boolean(data.approved),
    date: formatGuestbookDate(data.createdAt),
    createdAt: data.createdAt ?? null,
  };
}
