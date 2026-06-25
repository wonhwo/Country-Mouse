export default function ScreenshotPlaceholder({ index }) {
  return (
    <div className="ph ph-screenshot" role="img" aria-label={`스크린샷 ${index} 자리`}>
      <span className="ph-label">스크린샷 {index}</span>
      <span className="ph-dims">16 : 9</span>
    </div>
  );
}
