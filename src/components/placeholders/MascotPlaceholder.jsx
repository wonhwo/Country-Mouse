export default function MascotPlaceholder({
  size = 'hero',
  label = '마스코트 일러스트',
  dims = '1 : 1',
}) {
  return (
    <div className={`ph ph-mascot-${size}`} role="img" aria-label={`${label} 자리`}>
      <svg className="ph-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="ph-label">{label} 자리</span>
      <span className="ph-dims">{dims}</span>
    </div>
  );
}
