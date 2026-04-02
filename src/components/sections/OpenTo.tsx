"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";

const SPRING = { stiffness: 80, damping: 30, mass: 0.5 };

function useSmoothTransform(
  mv: MotionValue<number>,
  input: number[],
  output: number[],
) {
  return useSpring(useTransform(mv, input, output), SPRING);
}

/* ─── Data ─── */
const SERVICES = [
  {
    num: "01",
    title: "공동창업",
    en: "Co-founding",
    description:
      "기술 공동창업자로서 아이디어를 제품으로 만들어내는 여정에 함께합니다. MVP 설계부터 기술 아키텍처, 팀 빌딩까지 풀스택으로 기여할 수 있습니다.",
  },
  {
    num: "02",
    title: "채용 제안",
    en: "Employment",
    description:
      "개발 리드, R&D 책임자, 혹은 풀스택 엔지니어 포지션에 관심이 있습니다. 기술과 비즈니스를 연결하는 역할에서 최고의 성과를 냅니다.",
  },
  {
    num: "03",
    title: "기술 자문",
    en: "Consulting",
    description:
      "AI 전환 전략, 기술 아키텍처 리뷰, 개발 프로세스 개선 등 기술 자문을 제공합니다. 기업 규모와 단계에 맞는 실용적인 조언을 드립니다.",
  },
  {
    num: "04",
    title: "프로젝트 협업",
    en: "Collaboration",
    description:
      "웹/앱 개발, AI 솔루션, SaaS 구축 등 프로젝트 단위 협업이 가능합니다. 기획부터 배포까지 전 과정을 함께할 수 있습니다.",
  },
];

/* ─── Service column ─── */
function ServiceColumn({
  service,
  index,
  scrollYProgress,
}: {
  service: (typeof SERVICES)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const base = 0.2 + index * 0.04;
  const opacity = useSmoothTransform(scrollYProgress, [base, base + 0.1], [0, 1]);
  const y = useSmoothTransform(scrollYProgress, [base, base + 0.12], [30, 0]);

  return (
    <motion.div
      className="flex flex-col"
      style={{ opacity, y }}
    >
      <h4
        className="mb-3 text-lg font-semibold tracking-tight md:text-xl"
        style={{ color: "var(--text-primary)" }}
      >
        {service.title}
      </h4>
      <p
        className="mb-auto text-[13px] leading-[1.8]"
        style={{ color: "var(--text-secondary)" }}
      >
        {service.description}
      </p>
      <span
        className="mt-6 font-mono text-xs tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {service.num}
      </span>
    </motion.div>
  );
}

/* ─── Main ─── */
export default function OpenTo() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  /* Heading animations */
  const titleOpacity = useSmoothTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const titleY = useSmoothTransform(scrollYProgress, [0, 0.1], [40, 0]);

  const lineWidth = useSmoothTransform(scrollYProgress, [0.06, 0.2], [0, 100]);

  const subtitleOpacity = useSmoothTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const subtitleY = useSmoothTransform(scrollYProgress, [0.1, 0.2], [24, 0]);

  const descOpacity = useSmoothTransform(scrollYProgress, [0.18, 0.28], [0, 1]);
  const descY = useSmoothTransform(scrollYProgress, [0.18, 0.28], [20, 0]);

  const dividerOpacity = useSmoothTransform(scrollYProgress, [0.15, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="px-6 py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-6xl">
        {/* ─── Top: Title area ─── */}
        <motion.h2
          className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl"
          style={{
            color: "var(--text-primary)",
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          제가 하는 일
        </motion.h2>

        {/* Divider line with labels */}
        <div className="relative mb-10">
          <div
            className="h-[1px] w-full"
            style={{ background: "var(--overlay-6)" }}
          />
          <motion.div
            className="absolute left-0 top-0 h-[1px]"
            style={{
              width: useTransform(lineWidth, (v) => `${v}%`),
              background: "var(--overlay-20)",
            }}
          />
          <div className="mt-3 flex items-center justify-between">
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              Sec.
            </span>
            <span
              className="font-mono text-[11px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              /A
            </span>
          </div>
        </div>

        {/* ─── Subtitle + Status badge ─── */}
        <div className="mb-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.div
            className="max-w-2xl"
            style={{ opacity: subtitleOpacity, y: subtitleY }}
          >
            <p
              className="text-xl leading-[1.6] md:text-2xl"
              style={{ color: "var(--text-primary)", opacity: 0.85 }}
            >
              기술과 비즈니스를 연결합니다.
              <br />
              문제를 정의하고, 해결하고,
              <br />
              제품으로 만들어냅니다.
            </p>
          </motion.div>

          {/* Active status badge */}
          <motion.div
            className="shrink-0"
            style={{ opacity: subtitleOpacity }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5"
              style={{
                background: "rgba(34, 197, 94, 0.10)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
              }}
            >
              {/* Pulsing dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                  style={{ background: "#4ade80" }}
                />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ background: "#22c55e" }}
                />
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#4ade80" }}
              >
                구직 중
              </span>
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className="mb-16 max-w-xl text-sm leading-[1.8] md:ml-auto md:text-right"
          style={{
            color: "var(--text-secondary)",
            opacity: descOpacity,
            y: descY,
          }}
        >
          어떤 형태의 제안이든 환영합니다. 공동창업부터 프로젝트 단위 협업,
          기술 자문, 채용 제안까지 — 함께 만들어갈 수 있는 기회라면 언제든 열려 있습니다.
        </motion.p>

        {/* ─── Divider before columns ─── */}
        <motion.div
          className="mb-10 h-[1px]"
          style={{
            background: "var(--overlay-8)",
            opacity: dividerOpacity,
          }}
        />

        {/* ─── 4-column services grid ─── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceColumn
              key={service.num}
              service={service}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
