import Link from 'next/link';

export const metadata = {
  title: '페이지를 찾을 수 없습니다',
};

export default function NotFound() {
  return (
    <section style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          404
        </div>
        <h1
          className="page-title"
          style={{ fontSize: 'clamp(40px, 7vw, 88px)', margin: '24px 0 0' }}
        >
          길을 잃었습니다
        </h1>
        <p className="page-desc" style={{ margin: '32px auto 40px' }}>
          요청하신 페이지를 찾을 수 없습니다. 작업실 입구로 돌아가시겠어요?
        </p>
        <Link className="btn-primary" href="/" style={{ marginTop: 0 }}>
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
