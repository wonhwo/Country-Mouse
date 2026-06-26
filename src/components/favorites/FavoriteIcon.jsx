import Image from 'next/image';

export default function FavoriteIcon({ title, src }) {
  if (!src) {
    return (
      <div className="favorite-icon ph" role="img" aria-label={`${title} 아이콘 자리`}>
        <span className="ph-label">아이콘</span>
      </div>
    );
  }

  return (
    <div className="favorite-icon favorite-icon-img">
      <Image
        src={src}
        alt={`${title} 아이콘`}
        fill
        className="favorite-icon-cover"
        sizes="96px"
      />
    </div>
  );
}
