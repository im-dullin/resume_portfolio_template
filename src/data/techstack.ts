// ============================================================
// 📝 기술 스택을 본인의 스킬셋으로 교체하세요!
// level: 1(입문) ~ 5(전문가) 수준으로 설정합니다.
// ============================================================

export interface TechNode {
  name: string;
  category: string;
  level: number; // 1-5
  x?: number;
  y?: number;
}

export interface TechCategory {
  name: string;
  color: string;
  nodes: TechNode[];
}

export const techCategories: TechCategory[] = [
  {
    name: "Frontend",
    color: "#6366f1",
    nodes: [
      { name: "React", category: "Frontend", level: 4 },
      { name: "Next.js", category: "Frontend", level: 4 },
      { name: "TypeScript", category: "Frontend", level: 3 },
      { name: "Tailwind CSS", category: "Frontend", level: 4 },
      { name: "HTML/CSS", category: "Frontend", level: 5 },
      { name: "JavaScript", category: "Frontend", level: 4 },
    ],
  },
  {
    name: "Backend",
    color: "#8b5cf6",
    nodes: [
      { name: "Node.js", category: "Backend", level: 3 },
      { name: "Express", category: "Backend", level: 3 },
      { name: "Supabase", category: "Backend", level: 3 },
      { name: "Firebase", category: "Backend", level: 3 },
      { name: "MySQL", category: "Backend", level: 2 },
      { name: "REST API", category: "Backend", level: 4 },
    ],
  },
  {
    name: "Tools",
    color: "#a78bfa",
    nodes: [
      { name: "Git", category: "Tools", level: 4 },
      { name: "GitHub", category: "Tools", level: 4 },
      { name: "Figma", category: "Tools", level: 3 },
      { name: "VS Code", category: "Tools", level: 5 },
      { name: "Vercel", category: "Tools", level: 3 },
    ],
  },
  {
    name: "Language",
    color: "#c4b5fd",
    nodes: [
      { name: "Python", category: "Language", level: 3 },
      { name: "Java", category: "Language", level: 2 },
      { name: "C/C++", category: "Language", level: 2 },
    ],
  },
];
