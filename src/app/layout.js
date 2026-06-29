import '@/styles/globals.scss';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/PageTransition';
import Providers from '@/components/providers/Providers';

export const metadata = {
  metadataBase: new URL('https://countrymouse.studio'),
  title: {
    default: 'Country Mouse Studio — 1인 게임 개발 스튜디오',
    template: '%s · Country Mouse Studio',
  },
  description:
    '서울의 1인 게임 개발 스튜디오. Unity와 Unreal Engine으로 게임 시스템을 설계하고 게임을 만듭니다.',
  openGraph: {
    title: 'Country Mouse Studio',
    description:
      '서울의 1인 게임 개발 스튜디오. 게임 시스템을 설계하고 게임을 만듭니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: '/assets/og-mascot.png', width: 180, height: 180, alt: 'Country Mouse Studio 마스코트' }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/css/SpoqaHanSansNeo.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <Providers>
          <div className="cms-root">
            <Nav />
            <PageTransition>{children}</PageTransition>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
