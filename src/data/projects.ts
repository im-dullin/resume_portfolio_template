// ============================================================
// 📝 프로젝트 목록을 본인의 프로젝트로 교체하세요!
// featured: true인 프로젝트는 메인 페이지에 크게 표시됩니다.
// slug는 src/content/projects/ 폴더의 MDX 파일명과 일치해야 합니다.
// ============================================================

import { Project } from "@/types/project";

export const projects: Project[] = [
  // ─── Featured Projects (메인에 크게 표시) ───
  {
    slug: "taskflow",
    title: "TaskFlow 팀 협업 도구",
    description:
      "실시간 칸반 보드와 팀 채팅을 지원하는 프로젝트 관리 웹 앱. Supabase Realtime을 활용한 실시간 동기화가 핵심입니다.",
    longDescription:
      "교내 해커톤에서 시작된 프로젝트로, 팀원들과의 협업 과정에서 느꼈던 불편함을 해결하기 위해 만들었습니다. 드래그 앤 드롭 칸반 보드, 실시간 채팅, 마감일 알림 기능을 제공합니다.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "dnd-kit"],
    role: "풀스택 개발",
    period: "2025.01 - 현재",
    featured: true,
    gridSize: "large",
    responsibilities: [
      "Supabase Realtime 기반 실시간 칸반 보드 구현",
      "드래그 앤 드롭 UI (dnd-kit) 개발",
      "Supabase Auth 기반 소셜 로그인 연동",
      "RLS(Row Level Security) 기반 권한 관리 설계",
    ],
    achievements: [
      "교내 해커톤 우수상 수상",
      "일일 활성 사용자 50명+ 달성",
      "팀원 피드백 기반 3회 이상 이터레이션",
    ],
    links: {
      github: "https://github.com/your-username/taskflow",
      demo: "https://taskflow-demo.vercel.app",
    },
  },
  {
    slug: "foodmap",
    title: "FoodMap 맛집 추천 서비스",
    description:
      "공공데이터 API와 카카오맵을 활용한 맛집 추천 서비스. 사용자 리뷰와 위치 기반 필터링을 제공합니다.",
    longDescription:
      "공공데이터 포털의 음식점 데이터와 카카오맵 API를 결합하여 위치 기반 맛집 추천 서비스를 만들었습니다. 사용자 리뷰 시스템과 북마크 기능을 포함합니다.",
    tech: ["React", "Firebase", "Kakao Maps API", "Styled Components"],
    role: "프론트엔드 개발",
    period: "2024.09 - 2024.12",
    featured: true,
    gridSize: "large",
    responsibilities: [
      "카카오맵 API 연동 및 커스텀 마커 구현",
      "공공데이터 API 연동 및 데이터 정규화",
      "Firebase Auth/Firestore 기반 사용자 시스템 구축",
      "반응형 UI 및 모바일 최적화",
    ],
    achievements: [
      "공공데이터 활용 경진대회 장려상",
      "200개+ 음식점 데이터 수집 및 정규화",
      "모바일 사용자 비율 70% 달성",
    ],
    links: {
      github: "https://github.com/your-username/foodmap",
    },
  },

  // ─── Regular Projects ───
  {
    slug: "devlog",
    title: "DevLog 개발 블로그 플랫폼",
    description:
      "MDX 기반 기술 블로그 플랫폼. 코드 하이라이팅, 목차 자동 생성, SEO 최적화를 지원합니다.",
    tech: ["Next.js", "MDX", "Tailwind CSS", "Vercel"],
    role: "1인 개발",
    period: "2024.06 - 2024.08",
    featured: false,
    responsibilities: [
      "MDX 파서 및 렌더러 구현",
      "코드 블록 구문 하이라이팅 (Shiki)",
      "자동 목차 생성 및 스크롤 스파이",
      "SEO 메타태그 및 sitemap 자동 생성",
    ],
    achievements: [
      "Lighthouse 성능 점수 95+ 달성",
      "주간 방문자 100명+ 달성",
    ],
    links: {
      github: "https://github.com/your-username/devlog",
      demo: "https://devlog-demo.vercel.app",
    },
  },
  {
    slug: "weather-now",
    title: "WeatherNow 날씨 대시보드",
    description:
      "OpenWeather API를 활용한 실시간 날씨 대시보드. Chart.js로 주간 기온 변화를 시각화합니다.",
    tech: ["React", "Chart.js", "OpenWeather API", "CSS Modules"],
    role: "1인 개발",
    period: "2024.03 - 2024.05",
    featured: false,
    responsibilities: [
      "OpenWeather API 연동 및 데이터 캐싱",
      "Chart.js 기반 기온/습도 그래프 구현",
      "Geolocation API 기반 현재 위치 감지",
      "다크 모드 지원",
    ],
    achievements: [
      "API 호출 최적화로 일일 무료 한도 내 운영",
      "PWA 지원으로 모바일 홈 화면 추가 가능",
    ],
    links: {
      github: "https://github.com/your-username/weather-now",
    },
  },
  {
    slug: "studymate",
    title: "StudyMate 스터디 매칭",
    description:
      "관심 분야와 일정 기반으로 스터디 그룹을 매칭해주는 서비스. 교내 학생들을 위해 만들었습니다.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "NextAuth.js"],
    role: "백엔드 개발",
    period: "2024.01 - 2024.03",
    featured: false,
    responsibilities: [
      "Prisma ORM 기반 데이터 모델 설계",
      "NextAuth.js 소셜 로그인 연동",
      "관심사 기반 매칭 알고리즘 구현",
      "REST API 설계 및 개발",
    ],
    achievements: [
      "교내 100명+ 학생 사용",
      "10개+ 스터디 그룹 매칭 성공",
    ],
    links: {
      github: "https://github.com/your-username/studymate",
    },
  },
];
