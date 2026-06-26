import Image from 'next/image';
import CapsulePlaceholder from '@/components/placeholders/CapsulePlaceholder';

export default function GameCapsule({ title, engine, src, large = false, priority = false }) {
  if (!src) {
    return <CapsulePlaceholder title={title} engine={engine} large={large} />;
  }

  const cls = large ? 'game-capsule game-capsule-lg' : 'game-capsule';

  return (
    <div className={cls}>
      <Image
        src={src}
        alt={`${title} 스크린샷`}
        fill
        className="game-capsule-img"
        sizes={large ? '(max-width: 768px) 100vw, 1240px' : '(max-width: 768px) 100vw, 460px'}
        priority={priority}
      />
      {engine && <div className="game-capsule-engine">{engine}</div>}
    </div>
  );
}
