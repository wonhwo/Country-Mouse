export default function PortraitPlaceholder() {
  return (
    <div className="ph ph-portrait" role="img" aria-label="프로필 사진 자리">
      <svg className="ph-icon" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="ph-label">프로필 사진</span>
      <span className="ph-dims">4 : 5</span>
    </div>
  );
}
