export default function CapsulePlaceholder({ title, engine, large = false }) {
  return (
    <div
      className={large ? 'ph ph-capsule-lg' : 'ph ph-capsule'}
      role="img"
      aria-label={`${title} 캡슐 아트 자리`}
    >
      {engine && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.1em',
            padding: '4px 10px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-hairline)',
            borderRadius: 2,
            color: 'var(--text-primary)',
            zIndex: 2,
          }}
        >
          {engine}
        </div>
      )}
      <span className="ph-label">캡슐 아트 자리</span>
      <span className="ph-dims">{large ? '16 : 7 · 헤더' : '460 × 215'}</span>
      {title && (
        <div
          style={{
            position: 'absolute',
            bottom: 14,
            left: 18,
            right: 18,
            fontFamily: 'var(--font-display)',
            fontSize: large ? 32 : 22,
            fontWeight: 500,
            color: 'var(--text-tertiary)',
            opacity: 0.5,
            letterSpacing: '-0.01em',
            zIndex: 2,
          }}
        >
          {title}
        </div>
      )}
    </div>
  );
}
