import Reveal from '@/components/Reveal';
import GuestbookExplorer from '@/components/guestbook/GuestbookExplorer';

export const metadata = {
  title: '방명록',
  description: '작업실에 들러준 분들이 남긴 짧은 말들입니다.',
};

export default function GuestbookPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/guestbook</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">방명록</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              들러주셔서 감사합니다. GitHub로 로그인한 뒤 응원이나 짧은 말을 남겨 주시면 확인 후
              공개합니다.
            </p>
          </Reveal>
        </div>
      </header>
      <GuestbookExplorer />
    </>
  );
}
