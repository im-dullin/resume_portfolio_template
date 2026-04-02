export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  featured?: boolean;
}

export interface BlogMeta extends BlogPost {
  content: string;
}
