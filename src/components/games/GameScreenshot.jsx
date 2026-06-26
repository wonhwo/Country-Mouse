import Image from 'next/image';
import ScreenshotPlaceholder from '@/components/placeholders/ScreenshotPlaceholder';

export default function GameScreenshot({ src, title, index }) {
  if (!src) {
    return <ScreenshotPlaceholder index={index} />;
  }

  return (
    <div className="game-screenshot">
      <Image
        src={src}
        alt={`${title} 스크린샷 ${index}`}
        fill
        className="game-screenshot-img"
        sizes="(max-width: 768px) 100vw, 600px"
      />
    </div>
  );
}
