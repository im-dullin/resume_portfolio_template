// ============================================================
// 📝 이 파일을 수정하여 나만의 포트폴리오를 만드세요!
// 아래 샘플 데이터를 본인 정보로 교체하면 됩니다.
// ============================================================

export const personal = {
  name: {
    ko: "홍길동",        // 한국어 이름
    en: "Gil-dong Hong", // 영어 이름
    hanja: "",           // 한자 이름 (선택사항, 빈 문자열이면 미표시)
  },
  title: "프론트엔드 개발자 · 컴퓨터공학 전공",
  roles: [
    "프론트엔드 개발자",
    "UI/UX 엔지니어",
    "웹 퍼블리셔",
  ],
  tagline: "사용자 경험을 최우선으로 생각하며, 깔끔한 코드로 문제를 해결합니다.",
  about:
    "컴퓨터공학을 전공하며 웹 프론트엔드 개발에 열정을 가진 학생 개발자입니다. React와 Next.js를 중심으로 다양한 프로젝트를 진행하며 실력을 쌓고 있고, 팀 프로젝트를 통해 협업과 커뮤니케이션 능력을 키워왔습니다.",
  email: "sample@email.com",
  phone: "010-0000-0000",     // 연락처 (선택사항)
  birth: "2000.01.01",        // 생년월일 (선택사항)
  location: "서울, 대한민국",
  education: "OO대학교 컴퓨터공학과 3학년 재학",
  social: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-profile/",
    blog: "https://your-blog.tistory.com/",
  },
  stats: {
    yearsOfExperience: 2,   // 경력 연수
    projectsCompleted: 8,   // 완료 프로젝트 수
    certifications: 3,      // 보유 자격증 수
  },
};

// ============================================================
// 히어로 섹션 텍스트
// ============================================================
export const heroTexts = {
  subtitle: "사용자 경험을 디자인하는\n개발자.",
  heading: "아이디어를\n코드로\n만듭니다",
  statusText: "구직 중",          // 상태 표시 (예: "구직 중", "재직 중", "프리랜서")
  locationText: "Republic of Korea",
  ctaText: "프로젝트 보기",
  profileImage: "/images/profile-placeholder.svg", // 프로필 이미지 경로
};

// ============================================================
// About 섹션 데이터
// ============================================================
export const certifications = [
  { date: "2025.06", name: "정보처리기사" },
  { date: "2024.11", name: "SQLD (SQL 개발자)" },
  { date: "2024.03", name: "TOEIC 850점" },
];

export const experiences = [
  { date: "2025.03", name: "OO 스타트업 프론트엔드 인턴" },
  { date: "2024.09", name: "교내 IT 동아리 회장" },
  { date: "2024.06", name: "해커톤 우수상 수상" },
  { date: "2023.12", name: "오픈소스 컨트리뷰션 아카데미 수료" },
];

export const skills = [
  "React", "Next.js", "TypeScript", "JavaScript",
  "Tailwind CSS", "HTML/CSS", "Git", "Figma",
  "Node.js", "Python", "MySQL",
];

// ============================================================
// Philosophy (철학) 섹션 데이터
// ============================================================
export const philosophyItems = [
  { label: "철학", text: "좋은 코드는 읽기 쉬운 코드라고 믿습니다. 복잡한 문제도 단순하고 명확한 구조로 풀어냅니다." },
  { label: "성장", text: "매일 어제보다 나은 개발자가 되기 위해 노력합니다. 새로운 기술을 배우는 것을 즐깁니다." },
  { label: "협업", text: "혼자 빠르게 가는 것보다, 함께 멀리 가는 것을 선호합니다. 팀의 시너지를 만드는 개발자입니다." },
  { label: "사용자", text: "기술은 사용자의 문제를 해결하기 위한 도구입니다. 항상 사용자 관점에서 생각합니다." },
  { label: "원칙", text: "테스트 가능한 코드, 재사용 가능한 구조, 일관된 컨벤션. 원칙을 지키되 유연하게 적용합니다." },
];

// ============================================================
// Contact 섹션 텍스트
// ============================================================
export const contactTexts = {
  heading: "함께 일할 동료를 찾고 계신가요?",
  description: "기술로 문제를 해결하는 사람이 필요하다면,",
  subDescription: "인턴십, 프로젝트 협업, 스터디 — 어떤 형태든 좋습니다.\n편하게 연락 주세요.",
};

// ============================================================
// OG Image (소셜 미리보기) 데이터
// ============================================================
export const ogImageData = {
  name: "홍길동",
  tagline: "사용자 경험을 디자인하는 개발자",
  roles: ["프론트엔드 개발자", "UI/UX 엔지니어"],
  metrics: [
    { value: "8+", label: "프로젝트" },
    { value: "2년", label: "경력" },
    { value: "3", label: "자격증" },
  ],
  techBadges: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python"],
  experiences: [
    { role: "프론트엔드 인턴", detail: "React · Next.js 개발", org: "OO 스타트업", period: "2025 —" },
    { role: "IT 동아리 회장", detail: "스터디 · 프로젝트 운영", org: "OO대학교", period: "2024 —" },
    { role: "오픈소스 기여", detail: "컨트리뷰션 아카데미 수료", org: "NHN", period: "2023" },
  ],
  featuredProjects: [
    { name: "TaskFlow", desc: "팀 협업 도구", tech: "Next.js · Supabase" },
    { name: "FoodMap", desc: "맛집 추천 앱", tech: "React · Firebase" },
    { name: "DevLog", desc: "개발 블로그 플랫폼", tech: "Next.js · MDX" },
    { name: "WeatherNow", desc: "날씨 대시보드", tech: "React · Chart.js" },
    { name: "StudyMate", desc: "스터디 매칭 서비스", tech: "Next.js · Prisma" },
    { name: "PortfolioKit", desc: "포트폴리오 템플릿", tech: "Next.js · Three.js" },
  ],
  bottomProjects: ["UI 컴포넌트 라이브러리", "Chrome 확장 프로그램", "CLI 도구"],
};

// ============================================================
// 메타데이터 (SEO)
// ============================================================
export const siteMetadata = {
  title: "홍길동 | 프론트엔드 개발자 포트폴리오",
  description: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발자 홍길동의 포트폴리오",
  keywords: ["홍길동", "프론트엔드 개발자", "React", "Next.js", "포트폴리오"],
  ogTitle: "홍길동 | 프론트엔드 개발자",
  ogDescription: "깔끔한 코드로 사용자 경험을 디자인합니다. 8개+ 프로젝트 · 프론트엔드 개발자",
  siteName: "홍길동 포트폴리오",
};
