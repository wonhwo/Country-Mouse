import Image from 'next/image';
import { MASCOT } from '@/lib/brand';

export default function SiteMascot({ size = 'hero', className = '', priority = false }) {
  return (
    <Image
      src={MASCOT.src}
      alt={MASCOT.alt}
      width={MASCOT.width}
      height={MASCOT.height}
      className={`site-mascot site-mascot--${size} ${className}`.trim()}
      priority={priority}
    />
  );
}
