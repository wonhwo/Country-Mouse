import Image from 'next/image';
import { MASCOT } from '@/lib/brand';

const MASCOT_VARIANTS = {
  default: MASCOT.src,
  gap: '/assets/logo-mascot-gap.png',
};

export default function SiteLogo({ className = '', variant = 'default' }) {
  const src = MASCOT_VARIANTS[variant] ?? MASCOT_VARIANTS.default;

  return (
    <span className={`site-logo ${className}`}>
      <Image
        src={src}
        alt=""
        width={MASCOT.width}
        height={MASCOT.height}
        className="site-logo-mascot"
        priority
        aria-hidden
      />
      <span className="site-logo-wordmark">
        <span className="site-logo-title">Country Mouse</span>
        <span className="site-logo-sub">studio</span>
      </span>
    </span>
  );
}
