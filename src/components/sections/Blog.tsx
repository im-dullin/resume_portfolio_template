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

// 📝 블로그 글을 추가하면 여기도 업데이트하세요 (메인 페이지 미리보기용)
const samplePosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Next.js 시작하기: 첫 프로젝트 셋업부터 배포까지",
    description:
      "Next.js를 처음 접하는 분들을 위한 실전 가이드. 프로젝트 생성부터 Vercel 배포까지 단계별로 정리했습니다.",
    date: "2025.03.15",
    tags: ["Next.js", "Tutorial"],
    readingTime: "8 min",
  },
  {
    slug: "react-hooks-practical-guide",
    title: "실전에서 자주 쓰는 React Hooks 패턴 5가지",
    description:
      "useState, useEffect를 넘어서 실무에서 유용한 커스텀 훅 패턴을 정리했습니다.",
    date: "2025.02.10",
    tags: ["React", "Hooks"],
    readingTime: "12 min",
  },
  {
    slug: "tailwind-css-tips",
    title: "Tailwind CSS를 더 효율적으로 쓰는 팁 7가지",
    description:
      "Tailwind CSS를 사용하면서 발견한 실용적인 팁과 Best Practice를 공유합니다.",
    date: "2025.01.20",
    tags: ["Tailwind CSS", "Frontend"],
    readingTime: "6 min",
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
      style={{ background: "var(--bg-secondary)", transform: `scale(var(--grid-ratio))` } as React.CSSProperties}
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
