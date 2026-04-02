"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import CustomCursor from "@/components/layout/CustomCursor";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

/* ─── Tag → Category mapping ─── */
const TAG_TO_CATEGORY: Record<string, string> = {
  "Next.js": "Frontend", "React": "Frontend", "Framer Motion": "Frontend",
  "GSAP": "Frontend", "Animation": "Frontend", "Tailwind CSS": "Frontend",
  "CSS": "Frontend", "Three.js": "Frontend", "3D": "Frontend", "WebGL": "Frontend",
  "MDX": "Frontend", "Radix UI": "Frontend", "Accessibility": "Frontend",
  "Forms": "Frontend", "Server Components": "Frontend", "Tiptap": "Frontend",
  "Rich Text": "Frontend", "Recharts": "Frontend", "Data Visualization": "Frontend",
  "Frontend": "Frontend", "Performance": "Frontend",
  "Django": "Backend", "Python": "Backend", "Supabase": "Backend",
  "Firebase": "Backend", "Backend": "Backend", "Prisma": "Backend",
  "Database": "Backend", "PostgreSQL": "Backend", "API Design": "Backend",
  "WebSocket": "Backend", "Real-time": "Backend", "Security": "Backend",
  "NextAuth": "Backend", "Authentication": "Backend", "Payments": "Backend",
  "Integration": "Backend", "Kakao Maps": "Backend", "CMS": "Backend",
  "Sanity": "Backend", "SaaS": "Backend",
  "Docker": "DevOps", "DevOps": "DevOps", "Vercel": "DevOps",
  "Git": "DevOps", "Workflow": "DevOps", "Tooling": "DevOps",
  "Biome": "DevOps", "DX": "DevOps", "pnpm": "DevOps",
  "Monorepo": "DevOps", "Maven": "DevOps", "Open Source": "DevOps",
  "AI": "AI",
  "Architecture": "Architecture", "Microservices": "Architecture",
  "State Management": "Architecture", "React Query": "Architecture",
  "Zustand": "Architecture", "Redux": "Architecture",
  "TypeScript": "TypeScript", "Programming": "TypeScript",
  "Java": "TypeScript", "Debugging": "TypeScript",
  "Career": "Career", "Retrospective": "Career", "Communication": "Career",
  "Freelance": "Career", "ESG": "Career", "Domain Knowledge": "Career",
};

const CATEGORY_ORDER = ["Frontend", "Backend", "DevOps", "AI", "Architecture", "TypeScript", "Career"];

function getCategories(tags: string[]): string[] {
  const cats = new Set<string>();
  for (const tag of tags) {
    cats.add(TAG_TO_CATEGORY[tag] || "기타");
  }
  return Array.from(cats);
}

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach((p) => p.tags.forEach((t) => cats.add(TAG_TO_CATEGORY[t] || "기타")));
    return CATEGORY_ORDER.filter((c) => cats.has(c));
  }, [posts]);

  const filtered = activeCategory
    ? posts.filter((p) => getCategories(p.tags).includes(activeCategory))
    : posts;

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen px-6 pb-32 pt-16 md:px-10 lg:px-16"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="mx-auto max-w-[1400px]">
          {/* Header */}
          <div className="mb-8 pt-16">
            <Link
              href="/"
              className="text-sm transition-colors"
              style={{ color: "var(--text-muted)" }}
              data-cursor-hover
            >
              ← Back
            </Link>
          </div>

          {/* Large title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            style={{ color: "var(--text-primary)" }}
          >
            BLOG
          </motion.h1>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12 grid gap-4 md:grid-cols-2"
          >
            <div>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--text-muted)" }}
              >
                Articles
              </span>
            </div>
            <div>
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                기술적 인사이트와 프로젝트 경험을 공유합니다.
                실전에서 겪은 시행착오와 깨달음을 기록합니다.
              </p>
            </div>
          </motion.div>

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className="shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors"
              style={{
                background: !activeCategory ? "var(--overlay-8)" : "transparent",
                color: !activeCategory ? "var(--text-primary)" : "var(--text-muted)",
                border: "1px solid",
                borderColor: !activeCategory ? "var(--overlay-12)" : "transparent",
              }}
              data-cursor-hover
            >
              전체
            </button>
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className="shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors"
                style={{
                  background: activeCategory === cat ? "var(--overlay-8)" : "transparent",
                  color: activeCategory === cat ? "var(--text-primary)" : "var(--text-muted)",
                  border: "1px solid",
                  borderColor: activeCategory === cat ? "var(--overlay-12)" : "transparent",
                }}
                data-cursor-hover
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Section label */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 text-3xl font-light md:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            {activeCategory ? `${activeCategory} Articles` : "Latest Articles"}
          </motion.h2>

          {/* Blog grid — Gallery style */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ border: "1px solid var(--overlay-8)" }}
          >
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              >
                <Link href={`/blog/${post.slug}`} data-cursor-hover>
                  <div
                    className="group flex h-full flex-col justify-between p-6 transition-colors"
                    style={{
                      border: "1px solid var(--overlay-8)",
                      margin: "-1px",
                    }}
                  >
                    {/* Top — date + reading time */}
                    <div className="mb-4 flex items-start justify-between">
                      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {post.date}
                      </span>
                      <span className="shrink-0 ml-4 text-xs" style={{ color: "var(--text-muted)" }}>
                        {post.readingTime}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="mb-4 flex-1">
                      <h3
                        className="mb-2 text-base font-medium leading-snug tracking-tight transition-colors md:text-lg"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {post.title}
                      </h3>
                      <p
                        className="line-clamp-2 text-xs leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {post.description}
                      </p>
                    </div>

                    {/* Bottom — tags */}
                    <div>
                      <span
                        className="mb-2 block text-[9px] font-medium uppercase tracking-[0.3em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Topics
                      </span>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {post.tags.join(", ")}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
