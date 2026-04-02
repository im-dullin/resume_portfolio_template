export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  role: string;
  period: string;
  image?: string;
  featured: boolean;
  gridSize?: "large" | "wide" | "normal";
  responsibilities?: string[];
  achievements?: string[];
  links?: {
    github?: string;
    demo?: string;
    article?: string;
  };
}
