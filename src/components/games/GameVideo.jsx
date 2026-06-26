import { getYoutubeEmbedUrl } from '@/lib/youtube';

export default function GameVideo({ url, title }) {
  const embed = getYoutubeEmbedUrl(url);
  if (!embed) return null;

  return (
    <div className="gd-video">
      <iframe
        src={embed}
        title={`${title} 시연 영상`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
