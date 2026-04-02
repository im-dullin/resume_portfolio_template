# Portfolio Template

Next.js 기반 개인 포트폴리오 웹사이트 템플릿입니다.
샘플 데이터를 본인 정보로 교체하면 바로 사용할 수 있습니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router, Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion, Three.js
- **Deployment**: Vercel (권장)

## 시작하기

### 1. 템플릿 사용

GitHub에서 **"Use this template"** 버튼을 클릭하여 나만의 레포를 생성하세요.

또는 직접 클론:

```bash
git clone https://github.com/im-dullin/resume_portfolio_template.git my-portfolio
cd my-portfolio
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 확인합니다.

### 2. 내 정보 입력하기

**`src/data/` 폴더의 파일만 수정하면 됩니다!**

| 파일 | 내용 | 설명 |
|------|------|------|
| `src/data/personal.ts` | 개인정보 & 텍스트 | 이름, 연락처, 소개, 자격증, 경험, 철학, SEO 메타데이터 등 **모든 텍스트** |
| `src/data/projects.ts` | 프로젝트 목록 | 프로젝트 제목, 설명, 기술 스택, 링크 |
| `src/data/timeline.ts` | 경력 타임라인 | 경력, 수상, 교육 경험 |
| `src/data/techstack.ts` | 기술 스택 | 보유 기술과 숙련도 (1~5) |

### 3. 콘텐츠 추가하기

| 폴더 | 용도 | 형식 |
|------|------|------|
| `src/content/blog/` | 블로그 글 | MDX (마크다운 + React) |
| `src/content/projects/` | 프로젝트 상세 | MDX |
| `public/images/` | 이미지 | PNG, JPG, SVG |

#### 블로그 글 추가 예시

`src/content/blog/my-first-post.mdx` 파일 생성:

```mdx
---
title: "나의 첫 블로그 글"
description: "블로그 글 설명"
date: "2025-01-01"
tags: ["태그1", "태그2"]
readingTime: "5 min"
---

## 제목

본문 내용을 여기에 작성합니다.
```

#### 프로젝트 상세 추가 예시

`src/content/projects/my-project.mdx` 파일 생성:

```mdx
---
title: "프로젝트 이름"
description: "프로젝트 설명"
tech: ["Next.js", "TypeScript"]
role: "역할"
period: "2025.01 - 2025.06"
---

## 프로젝트 개요

프로젝트 상세 내용을 작성합니다.
```

> **중요**: MDX 파일명은 `src/data/projects.ts`의 `slug` 값과 일치해야 합니다.

### 4. 프로필 이미지 교체

- `public/images/` 폴더에 프로필 사진을 넣으세요
- `src/data/personal.ts`의 `heroTexts.profileImage` 경로를 수정하세요
- About 섹션은 `public/images/profile.png`을 사용합니다

### 5. 배포하기

#### Vercel (권장)

1. [Vercel](https://vercel.com)에 가입
2. GitHub 레포를 연결
3. **Deploy** 클릭

#### 정적 빌드

```bash
npm run build
```

`out/` 폴더에 정적 파일이 생성됩니다. 이 파일을 원하는 호스팅에 업로드하세요.

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (라우팅)
├── components/
│   ├── layout/             # Navigation, Footer
│   ├── sections/           # Hero, About, Contact 등
│   ├── ui/                 # 버튼, 카드 등 공통 UI
│   └── three/              # 3D 컴포넌트
├── content/
│   ├── blog/               # 블로그 MDX 파일
│   └── projects/           # 프로젝트 MDX 파일
├── data/                   # ⭐ 여기만 수정하세요!
│   ├── personal.ts         # 개인정보 & 모든 텍스트
│   ├── projects.ts         # 프로젝트 목록
│   ├── timeline.ts         # 경력 타임라인
│   ├── techstack.ts        # 기술 스택
│   └── navigation.ts       # 네비게이션 메뉴
├── hooks/                  # 커스텀 React 훅
├── lib/                    # 유틸리티 함수
├── styles/                 # 글로벌 CSS
└── types/                  # TypeScript 타입 정의
```

## 테마

기본 제공 테마가 있습니다. `/theme-preview`에서 미리볼 수 있습니다.

## 커스터마이징

### 네비게이션 메뉴 변경

`src/data/navigation.ts`를 수정하세요.

### 섹션 순서 변경

`src/app/page.tsx`에서 컴포넌트 순서를 변경하세요.

### 새로운 섹션 추가

1. `src/components/sections/`에 새 컴포넌트 생성
2. `src/app/page.tsx`에 import 및 추가
3. 필요시 `src/data/navigation.ts`에 메뉴 항목 추가

## License

MIT License - 자유롭게 수정하고 사용하세요.
