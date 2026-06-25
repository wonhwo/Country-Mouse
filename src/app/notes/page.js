import Reveal from '@/components/Reveal';
import NotesExplorer from '@/components/notes/NotesExplorer';

export const metadata = {
  title: '작업 노트',
  description: '작업하면서 떠오른 생각, 다른 게임에서 배운 것, 그리고 시도해본 기술들을 시간 순으로 남겨둡니다.',
};

export default function NotesPage() {
  return (
    <>
      <header className="page-head">
        <div className="container">
          <Reveal>
            <div className="eyebrow">~/notes</div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="page-title">작업 노트</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="page-desc">
              작업하면서 떠오른 생각, 다른 게임에서 배운 것, 그리고 시도해본 기술들을 시간 순으로
              남겨둡니다.
            </p>
          </Reveal>
        </div>
      </header>
      <NotesExplorer />
    </>
  );
}
