export interface TimelineEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
  type: "work" | "education" | "award" | "certification";
}
