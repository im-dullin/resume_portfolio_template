# Portfolio Template

학생을 위한 Next.js 기반 개인 포트폴리오 웹사이트 템플릿입니다.
코딩을 잘 몰라도 **데이터 파일만 수정하면** 나만의 포트폴리오를 완성할 수 있습니다.

> **상업적 사용은 금지됩니다.** 이 템플릿은 비상업적 용도(개인 포트폴리오, 학습, 비영리)로만 사용할 수 있습니다.
> 모든 배포 사이트는 자동으로 추적되며, 상업적 사용이 감지될 경우 법적 조치가 진행됩니다.
> 자세한 내용은 하단의 [라이선스](#라이선스) 항목을 참고하세요.

---

## 주요 기능

- 인터랙티브 히어로 섹션 (3D 애니메이션)
- 스크롤 연동 커리어 패스 타임라인
- 프로젝트 쇼케이스 (상세 페이지 포함)
- MDX 기반 블로그
- 터미널 스타일 인터랙티브 UI
- 다크/라이트 모드 + 4가지 테마
- SEO 최적화 (메타태그, OG 이미지, sitemap)
- 반응형 디자인 (모바일/태블릿/데스크톱)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, Three.js |
| Content | MDX (마크다운 + React 컴포넌트) |
| Deployment | Vercel (권장) |

---

## 시작하기 (5분 완성)

### Step 1. 레포 만들기

GitHub에서 **"Use this template"** 버튼을 클릭하면 나만의 레포가 생성됩니다.

또는 터미널에서:
```bash
git clone https://github.com/im-dullin/resume_portfolio_template.git my-portfolio
cd my-portfolio
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 샘플 사이트가 보입니다.

### Step 2. 내 정보 입력하기

**`src/data/` 폴더 안의 파일만 수정하면 됩니다!**

| 파일 | 무엇을 수정하나요? | 어떤 내용? |
|------|---|---|
| **`personal.ts`** | 나의 기본 정보 | 이름, 이메일, 소개, 자격증, 경력 요약, 철학, 연락처 문구, SEO 메타데이터 |
| **`projects.ts`** | 프로젝트 목록 | 프로젝트 이름, 설명, 기술 스택, GitHub/데모 링크 |
| **`timeline.ts`** | 경력 타임라인 | 회사/활동, 역할, 기간, 성과 (항목 추가 시 스크롤 애니메이션 자동 확장) |
| **`techstack.ts`** | 기술 스택 | 보유 기술 이름과 숙련도 (1~5) |
| **`navigation.ts`** | 메뉴 | 네비게이션 메뉴 항목 |

#### personal.ts 수정 예시

```typescript
export const personal = {
  name: {
    ko: "김철수",           // ← 본인 이름으로 변경
    en: "Cheol-su Kim",
  },
  title: "백엔드 개발자 · 컴퓨터공학 전공",
  email: "myemail@gmail.com",
  // ... 나머지 항목도 본인 정보로 채우세요
};
```

#### timeline.ts 수정 예시 (항목 추가)

```typescript
export const timelineEntries: TimelineEntry[] = [
  {
    id: "my-internship",
    company: "OO기업",
    role: "백엔드 인턴",
    period: "2025.06 ~ 2025.12",
    description: "Spring Boot 기반 API 개발",
    achievements: ["REST API 10개 개발", "테스트 커버리지 80% 달성"],
    tech: ["Java", "Spring Boot", "MySQL"],
    type: "work",
  },
  // ← 여기에 복붙해서 항목을 추가하면 스크롤 애니메이션이 자동으로 늘어납니다
];
```

### Step 3. 프로필 사진 넣기

1. `public/images/` 폴더에 사진 파일을 넣으세요
2. `src/data/personal.ts`에서 경로를 수정하세요:

```typescript
export const heroTexts = {
  profileImage: "/images/my-photo.jpg",  // ← 히어로 섹션 사진
  // ...
};
```

3. About 섹션 사진은 `public/images/profile.png` 파일을 교체하면 됩니다

### Step 4. 블로그 글 추가하기

`src/content/blog/` 폴더에 `.mdx` 파일을 만드세요:

```mdx
---
title: "나의 첫 기술 블로그"
description: "블로그를 시작한 이유"
date: "2025-06-01"
tags: ["일상", "개발"]
readingTime: "3 min"
---

## 안녕하세요!

마크다운 문법으로 자유롭게 작성하면 됩니다.

- 목록도 되고
- **굵은 글씨**도 됩니다

코드 블록도 지원됩니다:
```

### Step 5. 프로젝트 상세 페이지 추가하기

`src/content/projects/` 폴더에 `.mdx` 파일을 만드세요.

> **중요**: 파일명은 `src/data/projects.ts`의 `slug` 값과 **같아야** 합니다.

예시: `projects.ts`에 `slug: "my-app"`이면 → `src/content/projects/my-app.mdx` 생성

```mdx
---
title: "My App"
description: "프로젝트 한 줄 설명"
tech: ["React", "Node.js"]
role: "풀스택 개발"
period: "2025.01 - 2025.06"
---

## 프로젝트 소개

여기에 프로젝트 상세 내용을 작성합니다.
```

### Step 6. 배포하기

#### Vercel로 배포 (무료, 가장 쉬움)

1. [vercel.com](https://vercel.com)에 GitHub 계정으로 가입
2. **"Add New Project"** → GitHub 레포 선택
3. **"Deploy"** 클릭
4. 1~2분 후 `https://내이름.vercel.app` 주소로 사이트 완성!

#### 직접 빌드

```bash
npm run build
```

`out/` 폴더에 정적 파일이 생성됩니다. Netlify, GitHub Pages 등에 업로드하면 됩니다.

---

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (라우팅)
├── components/
│   ├── layout/             # 네비게이션, 푸터 등
│   ├── sections/           # Hero, About, Contact 등 섹션
│   ├── ui/                 # 버튼, 카드 등 공통 UI
│   └── three/              # 3D 컴포넌트
├── content/
│   ├── blog/               # 블로그 글 (.mdx)
│   └── projects/           # 프로젝트 상세 (.mdx)
├── data/                   # ⭐ 여기만 수정하세요!
│   ├── personal.ts         # 개인정보 & 모든 텍스트
│   ├── projects.ts         # 프로젝트 목록
│   ├── timeline.ts         # 경력 타임라인
│   ├── techstack.ts        # 기술 스택
│   └── navigation.ts       # 네비게이션 메뉴
├── hooks/                  # 커스텀 React 훅
├── lib/                    # 유틸리티 함수
└── types/                  # TypeScript 타입 정의
```

## 테마 변경

기본 4가지 테마가 제공됩니다. 사이트의 `/theme-preview`에서 미리볼 수 있습니다.

## 커스터마이징

| 하고 싶은 것 | 수정할 파일 |
|---|---|
| 메뉴 항목 변경 | `src/data/navigation.ts` |
| 섹션 순서 변경 | `src/app/page.tsx` |
| 새 섹션 추가 | `src/components/sections/`에 컴포넌트 생성 후 `page.tsx`에 추가 |
| 색상/폰트 변경 | `src/app/globals.css` |

---

## 자주 묻는 질문

**Q. 코딩을 잘 모르는데 사용할 수 있나요?**
A. 네! `src/data/` 폴더의 파일만 수정하면 됩니다. 각 파일에 주석으로 설명이 달려 있습니다.

**Q. 블로그 글은 어떻게 작성하나요?**
A. 마크다운 문법을 사용합니다. `src/content/blog/` 폴더에 `.mdx` 파일을 만들면 자동으로 인식됩니다.

**Q. 경력 항목을 추가하면 애니메이션도 자동으로 늘어나나요?**
A. 네! `timeline.ts`에 항목을 추가하면 스크롤 애니메이션, 곡선 경로, 카드 배치가 모두 자동으로 조절됩니다.

**Q. 배포는 무료인가요?**
A. Vercel 무료 플랜으로 배포할 수 있습니다. 개인 프로젝트라면 충분합니다.

---

## 라이선스

**CC BY-NC-SA 4.0** (Creative Commons 저작자표시-비영리-동일조건변경허락 4.0)

### 할 수 있는 것
- 개인 포트폴리오로 사용
- 학습 목적으로 코드 수정
- 비영리 프로젝트에 활용
- 동일 라이선스 하에 재배포

### 할 수 없는 것
- 상업적 목적으로 사용 (기업 웹사이트, 유료 서비스 등)
- 이 템플릿을 유료로 판매하거나 재판매
- 저작권 표시 제거

### 사용 추적 안내

이 템플릿에는 **사용 현황 모니터링 시스템**이 내장되어 있습니다.

- 모든 배포 사이트의 URL과 사용 정보가 자동으로 수집됩니다
- 상업적 사용, 저작권 코드 제거 등 라이선스 위반이 감지될 경우 법적 조치가 진행됩니다
- 모니터링 시스템의 제거 또는 우회 시도는 라이선스 위반에 해당합니다

상업적 라이선스가 필요한 경우 별도 문의해 주세요.

---

Made by [@im-dullin](https://github.com/im-dullin)
