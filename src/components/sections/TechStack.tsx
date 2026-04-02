"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { techCategories } from "@/data/techstack";
import SectionHeading from "@/components/ui/SectionHeading";

const SPRING = { stiffness: 80, damping: 30, mass: 0.5 };

function useSmoothTransform(
  mv: MotionValue<number>,
  input: number[],
  output: number[],
) {
  return useSpring(useTransform(mv, input, output), SPRING);
}

/* ─── Level bar ─── */
function LevelBar({
  level,
  scrollYProgress,
  delay,
}: {
  level: number;
  scrollYProgress: MotionValue<number>;
  delay: number;
}) {
  const widthVal = useSmoothTransform(
    scrollYProgress,
    [delay, delay + 0.10],
    [0, (level / 5) * 100],
  );
  const widthStr = useTransform(widthVal, (v) => `${v}%`);
  const isHigh = level >= 4;

  return (
    <div
      className="relative h-[2px] w-full overflow-hidden rounded-full"
      style={{ background: "var(--overlay-4)" }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: widthStr,
          background: isHigh
            ? "linear-gradient(90deg, #22c55e, #4ade80)"
            : "var(--overlay-25)",
        }}
      />
    </div>
  );
}

/* ─── Skill row ─── */
function SkillRow({
  name,
  level,
  scrollYProgress,
  delay,
}: {
  name: string;
  level: number;
  scrollYProgress: MotionValue<number>;
  delay: number;
}) {
  const opacity = useSmoothTransform(scrollYProgress, [delay, delay + 0.06], [0, 1]);
  const x = useSmoothTransform(scrollYProgress, [delay, delay + 0.08], [8, 0]);

  return (
    <motion.div
      className="group flex items-center gap-4 py-[3px]"
      style={{ opacity, x }}
    >
      <span
        className="w-28 shrink-0 text-[13px] tracking-tight"
        style={{
          color: level >= 4 ? "var(--text-primary)" : "var(--text-secondary)",
          fontWeight: level >= 4 ? 500 : 400,
        }}
      >
        {name}
      </span>
      <div className="flex-1">
        <LevelBar level={level} scrollYProgress={scrollYProgress} delay={delay} />
      </div>
    </motion.div>
  );
}

/* ─── Category card ─── */
function CategoryCard({
  name,
  nodes,
  index,
  scrollYProgress,
}: {
  name: string;
  nodes: { name: string; level: number }[];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const base = 0.06 + index * 0.07;
  const cardOpacity = useSmoothTransform(scrollYProgress, [base, base + 0.06], [0, 1]);
  const cardY = useSmoothTransform(scrollYProgress, [base, base + 0.08], [24, 0]);

  return (
    <motion.div
      className="rounded-2xl p-6"
      style={{
        background: "var(--overlay-2)",
        border: "1px solid var(--overlay-5)",
        opacity: cardOpacity,
        y: cardY,
      }}
    >
      <div className="mb-5 flex items-center gap-2">
        <div
          className="h-[3px] w-3 rounded-full"
          style={{ background: "var(--overlay-15)" }}
        />
        <h4
          className="text-[11px] font-medium uppercase tracking-[0.25em]"
          style={{ color: "var(--text-muted)" }}
        >
          {name}
        </h4>
      </div>
      <div className="space-y-2">
        {nodes
          .sort((a, b) => b.level - a.level)
          .map((node, j) => (
            <SkillRow
              key={node.name}
              name={node.name}
              level={node.level}
              scrollYProgress={scrollYProgress}
              delay={base + 0.02 + j * 0.012}
            />
          ))}
      </div>
    </motion.div>
  );
}

/* ─── Growth card ─── */
function GrowthCard({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const base = 0.06 + 4 * 0.07; // aligned with 5th card, not 6th
  const cardOpacity = useSmoothTransform(scrollYProgress, [base, base + 0.06], [0, 1]);
  const cardY = useSmoothTransform(scrollYProgress, [base, base + 0.08], [24, 0]);

  return (
    <motion.div
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-6"
      style={{
        background: "rgba(34, 197, 94, 0.04)",
        border: "1px solid rgba(34, 197, 94, 0.12)",
        opacity: cardOpacity,
        y: cardY,
      }}
    >
      {/* Subtle gradient accent */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="mb-5 flex items-center gap-2">
          {/* Pulsing dot */}
          <span className="relative flex h-[6px] w-[6px]">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"
              style={{ background: "#4ade80" }}
            />
            <span
              className="relative inline-flex h-[6px] w-[6px] rounded-full"
              style={{ background: "#22c55e" }}
            />
          </span>
          <h4
            className="text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ color: "#4ade80" }}
          >
            성장 중
          </h4>
        </div>

        <p
          className="mb-4 text-[15px] font-medium leading-[1.6] tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          프로젝트에 맞는 최적의
          <br />
          기술 스택을 조합하는 것에
          <br />
          희열을 느낍니다.
        </p>

        <p
          className="text-[12px] leading-[1.8]"
          style={{ color: "var(--text-muted)" }}
        >
          매번 새로운 기술을 탐구하며
          <br />
          발전하는 과정을 즐깁니다.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const headingOpacity = useSmoothTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const headingY = useSmoothTransform(scrollYProgress, [0, 0.05], [20, 0]);

  return (
    <section
      id="techstack"
      ref={sectionRef}
      className="px-6 py-32"
      style={{ background: "var(--bg-primary)", opacity: "var(--vp-ready)" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-5xl">
        <motion.div style={{ opacity: headingOpacity, y: headingY }}>
          <SectionHeading
            label="기술"
            title="기술 스택"
            description="기술 역량의 전체 지도"
          />
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              name={cat.name}
              nodes={cat.nodes.map((n) => ({ name: n.name, level: n.level }))}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
          <GrowthCard scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
