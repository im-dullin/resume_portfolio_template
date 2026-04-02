"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

const SPRING = { stiffness: 80, damping: 30, mass: 0.5 };

function useSmoothTransform(
  mv: MotionValue<number>,
  input: number[],
  output: number[],
) {
  return useSpring(useTransform(mv, input, output), SPRING);
}

const samplePosts = [
  {
    slug: "ai-multi-agent-systems",
    title: "AI 멀티 에이전트 시스템을 처음 설계하며 배운 것들",
    description:
      "CBAM 자동화 프로젝트에서 멀티 에이전트 아키텍처를 직접 설계하면서 겪은 시행착오와 깨달음을 정리했습니다.",
    date: "2024.12.15",
    tags: ["AI", "Architecture"],
    readingTime: "8 min",
  },
  {
    slug: "nextjs-app-router-deep-dive",
    title: "Next.js App Router를 실전에서 쓰며 깨달은 것들",
    description:
      "Server Component와 Client Component의 경계에서 겪은 혼란과, 실제 프로젝트에서 정립한 나만의 기준을 공유합니다.",
    date: "2025.08.20",
    tags: ["Next.js", "React"],
    readingTime: "10 min",
  },
  {
    slug: "ten-projects-retrospective",
    title: "1년간 10개 이상의 프로젝트를 만들며 배운 것",
    description:
      "기업 웹사이트, SaaS, POS, 오픈소스까지 — 다양한 프로젝트를 빠르게 전환하며 얻은 교훈을 정리합니다.",
    date: "2026.01.15",
    tags: ["Career", "Retrospective"],
    readingTime: "10 min",
  },
];

/* ─── Hero (featured) post ─── */
function HeroPost({
  post,
  scrollYProgress,
}: {
  post: (typeof samplePosts)[0];
  scrollYProgress: MotionValue<number>;
}) {
  const opacity = useSmoothTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const y = useSmoothTransform(scrollYProgress, [0.05, 0.18], [40, 0]);
  const scale = useSmoothTransform(scrollYProgress, [0.05, 0.15], [0.97, 1]);

  return (
    <motion.div style={{ opacity, y, scale }}>
      <Link href={`/blog/${post.slug}`}>
        <article
          className="group relative overflow-hidden rounded-2xl p-8 md:p-10"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--bg-glass-border)",
          }}
          data-cursor-hover
        >
          {/* Subtle gradient overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(193,77,60,0.06) 0%, transparent 60%)",
            }}
          />

          <div className="relative">
            {/* Tags */}
            <div className="mb-6 flex items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--canyon-light)" }}
                >
                  {tag}
                </span>
              ))}
              <span
                className="font-mono text-[11px]"
                style={{ color: "var(--text-muted)" }}
              >
                ·
              </span>
              <span
                className="font-mono text-[11px] tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {post.readingTime}
              </span>
            </div>

            {/* Title — large editorial */}
            <h3
              className="mb-4 text-2xl font-semibold leading-tight tracking-tight transition-colors md:text-3xl lg:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h3>

            {/* Description */}
            <p
              className="mb-6 max-w-xl text-sm leading-[1.8] md:text-base"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.description}
            </p>

            {/* Date + read arrow */}
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-xs tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {post.date}
              </span>
              <span
                className="text-sm font-medium transition-transform group-hover:translate-x-1"
                style={{ color: "var(--text-secondary)" }}
              >
                읽어보기 →
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ─── Side post (smaller) ─── */
function SidePost({
  post,
  index,
  scrollYProgress,
}: {
  post: (typeof samplePosts)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const base = 0.18 + index * 0.08;
  const opacity = useSmoothTransform(scrollYProgress, [base, base + 0.1], [0, 1]);
  const y = useSmoothTransform(scrollYProgress, [base, base + 0.12], [30, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <Link href={`/blog/${post.slug}`}>
        <article
          className="group flex h-full flex-col justify-between rounded-2xl p-6"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--bg-glass-border)",
          }}
          data-cursor-hover
        >
          <div>
            {/* Tags */}
            <div className="mb-4 flex items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: "var(--canyon-light)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3
              className="mb-3 text-lg font-semibold leading-snug tracking-tight transition-colors md:text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              {post.title}
            </h3>

            {/* Description */}
            <p
              className="mb-4 text-sm leading-[1.7]"
              style={{ color: "var(--text-secondary)" }}
            >
              {post.description}
            </p>
          </div>

          {/* Bottom meta */}
          <div className="flex items-center justify-between pt-4"
            style={{ borderTop: "1px solid var(--overlay-4)" }}
          >
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {post.readingTime}
            </span>
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {post.date}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const headingOpacity = useSmoothTransform(scrollYProgress, [0, 0.06], [0, 1]);
  const headingY = useSmoothTransform(scrollYProgress, [0, 0.06], [30, 0]);
  const viewAllOpacity = useSmoothTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  const [hero, ...rest] = samplePosts;

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="px-6 py-32"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div style={{ opacity: headingOpacity, y: headingY }}>
          <SectionHeading
            label="블로그"
            title="추천 글"
            description="기술적 인사이트와 프로젝트 경험을 공유합니다"
          />
        </motion.div>

        {/* Magazine layout: hero + 2-col side */}
        <div className="space-y-4">
          {/* Hero post */}
          <HeroPost post={hero} scrollYProgress={scrollYProgress} />

          {/* Side posts — 2 columns */}
          <div className="grid gap-4 md:grid-cols-2">
            {rest.map((post, i) => (
              <SidePost
                key={post.slug}
                post={post}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* View all */}
        <motion.div
          className="mt-12 text-center"
          style={{
            opacity: viewAllOpacity,
          }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-sm tracking-wider transition-colors"
            style={{ color: "var(--text-muted)" }}
            data-cursor-hover
          >
            모든 포스트 보기 →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
