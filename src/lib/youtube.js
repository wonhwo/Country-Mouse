/** @param {string | null | undefined} url */
export function getYoutubeVideoId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([^?&/]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&/]+)/,
    /youtube\.com\/shorts\/([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/** @param {string | null | undefined} url */
export function getYoutubeEmbedUrl(url) {
  const id = getYoutubeVideoId(url);
  if (!id) return null;
  return `https://www.youtube-nocookie.com/embed/${id}`;
}
