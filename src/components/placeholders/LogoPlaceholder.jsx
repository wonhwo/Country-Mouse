export default function LogoPlaceholder({ className = '' }) {
  return (
    <span
      className={`ph ph-logo-nav ${className}`}
      aria-label="로고 자리"
      style={{ background: 'transparent', borderColor: 'var(--border-soft)' }}
    >
      <span className="ph-label">로고 자리</span>
    </span>
  );
}
