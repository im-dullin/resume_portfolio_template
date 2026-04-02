// ============================================================
// 📝 경력/경험 타임라인을 본인 정보로 교체하세요!
// ============================================================

import { TimelineEntry } from "@/types/timeline";

export const timelineEntries: TimelineEntry[] = [
  {
    id: "startup-intern",
    company: "OO 스타트업",
    role: "프론트엔드 인턴",
    period: "2025.03 ~ 현재",
    description: "React와 Next.js 기반 웹 서비스의 프론트엔드 개발을 담당하고 있습니다.",
    achievements: [
      "사내 어드민 대시보드 UI 리뉴얼",
      "공통 컴포넌트 라이브러리 구축 참여",
      "Storybook 기반 디자인 시스템 문서화",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    type: "work",
  },
  {
    id: "university-club",
    company: "OO대학교 IT 동아리",
    role: "회장",
    period: "2024.09 ~ 현재",
    description: "교내 IT 동아리를 운영하며 스터디와 팀 프로젝트를 기획합니다.",
    achievements: [
      "주간 기술 스터디 운영 (참여자 20명+)",
      "교내 해커톤 주최 및 운영",
      "신입 부원 멘토링 프로그램 기획",
    ],
    tech: ["React", "Node.js", "Git"],
    type: "work",
  },
  {
    id: "opensource-academy",
    company: "오픈소스 컨트리뷰션 아카데미",
    role: "참가자",
    period: "2023.07 ~ 2023.11",
    description: "오픈소스 프로젝트에 기여하며 협업 프로세스를 경험했습니다.",
    achievements: [
      "오픈소스 프로젝트 PR 5건 머지",
      "코드 리뷰 프로세스 경험",
      "수료 우수상 수상",
    ],
    tech: ["TypeScript", "Git", "GitHub Actions"],
    type: "work",
  },
];

export const awards = [
  {
    title: "교내 해커톤 우수상",
    organization: "OO대학교",
    date: "2024.06",
    description: "팀 협업 도구 'TaskFlow'를 개발하여 우수상 수상",
  },
  {
    title: "공공데이터 활용 경진대회 장려상",
    organization: "한국정보화진흥원",
    date: "2024.10",
    description: "공공 API를 활용한 맛집 추천 서비스 개발",
  },
];

export const teachings = [
  {
    title: "신입 부원 웹 개발 기초 교육",
    organization: "OO대학교 IT 동아리",
    description: "HTML/CSS/JS 기초부터 React 입문까지 8주 커리큘럼 운영",
  },
  {
    title: "고등학생 코딩 멘토링",
    organization: "교육 봉사 동아리",
    description: "Python 기초 프로그래밍 교육 및 프로젝트 멘토링",
  },
];
