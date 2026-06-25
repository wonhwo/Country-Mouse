# Country Mouse Studio

서울의 1인 게임 개발 스튜디오 포트폴리오 사이트. 단일 JSX 시안(V3)을 **Next.js(App Router) + SCSS** 구조로 이관한 프로젝트입니다.

## 기술 스택

- **Next.js 16** (App Router, JavaScript)
- **React 19**
- **Sass(SCSS)** — CSS 변수 토큰 + 믹스인
- 배포: **Vercel** (GitHub `main` 자동 배포)

## 로컬 실행

```bash
npm install      # 최초 1회
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 빌드 결과 실행
npm run lint     # ESLint
```

## 폴더 구조

```
src/
├─ app/                      # 라우트 (폴더 = URL)
│  ├─ layout.js              # 공통 레이아웃 (폰트/메타/Nav/Footer)
│  ├─ page.js                # /            홈
│  ├─ not-found.js           # 404
│  ├─ games/page.js          # /games
│  ├─ games/[id]/page.js     # /games/:slug 게임 상세
│  ├─ favorites/page.js      # /favorites
│  ├─ about/page.js          # /about
│  ├─ tech/page.js           # /tech
│  ├─ notes/page.js          # /notes
│  └─ notes/[id]/page.js     # /notes/:slug 노트 글
├─ components/
│  ├─ layout/                # Nav("use client"), Footer
│  ├─ home/                  # Hero, FeaturedProject, Workshop, FieldNotesHome
│  ├─ games/                 # GamesExplorer (필터, "use client")
│  ├─ notes/                 # NotesExplorer (필터, "use client")
│  ├─ placeholders/          # Logo/Mascot/Capsule/Screenshot/Portrait
│  ├─ Reveal.jsx             # 스크롤 등장 애니메이션 ("use client")
│  └─ PageTransition.jsx     # 라우트 전환 애니메이션 ("use client")
├─ data/
│  ├─ games.js               # 게임 목록
│  ├─ notes.js               # 노트 목록 + 본문(blocks)
│  └─ favorites.js           # 분석한 게임
└─ styles/
   ├─ globals.scss           # 전역 스타일 (@use 로 묶음)
   ├─ _tokens.scss           # 색/폰트 CSS 변수
   ├─ _variables.scss        # SCSS 변수(브레이크포인트)
   ├─ _mixins.scss           # 미디어쿼리 믹스인
   └─ _base.scss             # reset, body, 폰트, reduced-motion
```

### 콘텐츠 수정 방법

- **게임 추가/수정**: `src/data/games.js` 의 `GAMES` 배열 수정. `id` 가 곧 URL slug.
- **노트 추가/수정**: `src/data/notes.js`. `body` 는 블록 배열이며 타입은 `lead | p | h2 | quote`.
- **분석한 게임**: `src/data/favorites.js`.

### 에셋 교체

현재 로고/마스코트/캡슐/스크린샷은 플레이스홀더 컴포넌트입니다. 실제 이미지로 교체할 때는
`public/` 에 이미지를 넣고 `src/components/placeholders/*` 를 `next/image` 기반으로 바꾸면 됩니다.

## 배포 (Vercel + 커스텀 도메인)

코드는 이미 Vercel에 바로 올릴 수 있는 상태입니다. 아래는 **대시보드에서 직접** 진행하는 단계입니다.

### 1. GitHub에 올리기

```bash
git add -A
git commit -m "Next.js 이관 초기 버전"
git branch -M main
git remote add origin https://github.com/<계정>/<리포>.git   # 원격이 없을 때만
git push -u origin main
```

### 2. Vercel 프로젝트 연결

1. https://vercel.com 로그인 → **Add New… → Project**
2. 위 GitHub 리포 **Import**
3. Framework Preset 이 **Next.js** 로 자동 인식되는지 확인 (Build/Output 설정 그대로 두면 됨)
4. **Deploy** 클릭 → 첫 배포 완료
5. 이후 `main` 브랜치에 push 하면 **자동으로 Production 재배포**됩니다.

### 3. 커스텀 도메인 연결

1. Vercel 프로젝트 → **Settings → Domains**
2. 구매한 도메인 입력 후 **Add**
3. Vercel이 안내하는 DNS 레코드를 도메인 등록업체(가비아/Cloudflare 등)에 등록:
   - **루트 도메인** (`example.com`): `A` 레코드 → `76.76.21.21`
   - **www 서브도메인**: `CNAME` → `cname.vercel-dns.com`
   - (등록업체/Vercel 안내값이 다르면 **Vercel 화면의 값**을 우선)
4. DNS 전파 후 Vercel이 자동으로 HTTPS 인증서를 발급합니다.

> 메모: `src/app/layout.js` 의 `metadataBase` 가 `https://countrymouse.studio` 로 되어 있습니다.
> 실제 도메인이 정해지면 이 값을 바꿔주면 OG/메타 URL이 정확해집니다.
