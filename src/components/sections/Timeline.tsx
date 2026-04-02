"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { timelineEntries, awards, teachings } from "@/data/timeline";
import SectionHeading from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/* ────────────────────────────────────────────────────────────────
   Config
   ──────────────────────────────────────────────────────────────── */
const VB_W = 1200;
const VB_H = 4200;

const WAYPOINTS = [
  { x: 160, y: 200 },
  { x: 1040, y: 800 },
  { x: 160, y: 1400 },
  { x: 1040, y: 2000 },
  { x: 160, y: 2600 },
  { x: 1040, y: 3200 },
  { x: 160, y: 3800 },
];

function buildCurvePath(): string {
  const pts = WAYPOINTS;
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    const midY = (curr.y + next.y) / 2;
    d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
  }
  return d;
}

const CURVE_D = buildCurvePath();
const N = timelineEntries.length;

/* Smoothed spring config — Apple-like damping */
const SPRING_CFG = { stiffness: 80, damping: 30, mass: 0.5 };

/* ────────────────────────────────────────────────────────────────
   useSmoothedTransform — useTransform + useSpring in one
   ──────────────────────────────────────────────────────────────── */
function useSmoothedTransform(
  mv: MotionValue<number>,
  inputRange: number[],
  outputRange: number[],
) {
  const raw = useTransform(mv, inputRange, outputRange);
  return useSpring(raw, SPRING_CFG);
}

/* ────────────────────────────────────────────────────────────────
   CurvePath — ghost line + scroll-driven canyon fill + traveling glow
   ──────────────────────────────────────────────────────────────── */
function CurvePath({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const measRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(99999);

  useEffect(() => {
    if (measRef.current) setLen(measRef.current.getTotalLength());
  }, []);

  const dashOffset = useSmoothedTransform(scrollYProgress, [0.0, 0.85], [len, 0]);

  /* Traveling highlight dot position along the path */
  const dotProgress = useSpring(
    useTransform(scrollYProgress, [0.0, 0.85], [0, 1]),
    SPRING_CFG,
  );

  return (
    <>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dot-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
        </filter>
        <radialGradient id="dot-grad">
          <stop offset="0%" stopColor="var(--canyon-light)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--canyon)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ghost base — full path always faintly visible */}
      <path
        d={CURVE_D}
        fill="none"
        stroke="var(--overlay-6)"
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* Canyon glow halo */}
      <motion.path
        d={CURVE_D}
        fill="none"
        stroke="var(--canyon)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={len}
        style={{ strokeDashoffset: dashOffset }}
        filter="url(#glow)"
        opacity={0.35}
      />

      {/* Canyon crisp core */}
      <motion.path
        ref={measRef}
        d={CURVE_D}
        fill="none"
        stroke="var(--canyon-light)"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeDasharray={len}
        style={{ strokeDashoffset: dashOffset }}
      />

      {/* Traveling glow dot */}
      <TravelingDot pathD={CURVE_D} progress={dotProgress} totalLength={len} />
    </>
  );
}

/* Separate component to use the path ref properly */
function TravelingDot({
  pathD,
  progress,
  totalLength,
}: {
  pathD: string;
  progress: MotionValue<number>;
  totalLength: number;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!pathRef.current) return;
    const path = pathRef.current;

    const unsub = progress.on("change", (v) => {
      const pt = path.getPointAtLength(v * totalLength);
      setPos({ x: pt.x, y: pt.y });
    });
    return unsub;
  }, [progress, totalLength]);

  return (
    <>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      {/* Large soft glow */}
      <circle
        cx={pos.x}
        cy={pos.y}
        r={30}
        fill="url(#dot-grad)"
        filter="url(#dot-glow)"
        opacity={0.6}
      />
      {/* Crisp bright center */}
      <circle cx={pos.x} cy={pos.y} r={3} fill="var(--canyon-light)" />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   EntryCard — scroll-linked staggered reveal per element
   ──────────────────────────────────────────────────────────────── */
function EntryCard({
  entry,
  index,
  scrollYProgress,
  svgMetrics,
}: {
  entry: (typeof timelineEntries)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  svgMetrics: { scaleX: number; scaleY: number; offsetTop: number } | null;
}) {
  const wp = WAYPOINTS[index];
  const isLeft = wp.x < VB_W / 2;

  /* Each card's scroll window — spread across 0.05 to 0.78 so last card has room */
  const base = 0.05 + (index / (N - 1)) * 0.73;
  const span = 0.10;

  /* Stagger offsets for each element within the card */
  const s0 = base;                     // period
  const s1 = base + span * 0.15;       // company
  const s2 = base + span * 0.3;        // role
  const s3 = base + span * 0.5;        // description + achievements
  const s4 = base + span * 0.7;        // tech tags

  /* Card container */
  const containerOpacity = useSmoothedTransform(scrollYProgress, [s0, s0 + span * 0.3], [0, 1]);
  const containerY = useSmoothedTransform(scrollYProgress, [s0, s0 + span * 0.6], [60, 0]);
  const containerScale = useSmoothedTransform(scrollYProgress, [s0, s0 + span * 0.5], [0.96, 1]);

  /* Individual element animations */
  const periodOpacity = useSmoothedTransform(scrollYProgress, [s0, s0 + span * 0.25], [0, 1]);
  const periodX = useSmoothedTransform(scrollYProgress, [s0, s0 + span * 0.3], [isLeft ? -20 : 20, 0]);

  const titleOpacity = useSmoothedTransform(scrollYProgress, [s1, s1 + span * 0.3], [0, 1]);
  const titleY = useSmoothedTransform(scrollYProgress, [s1, s1 + span * 0.35], [20, 0]);

  const roleOpacity = useSmoothedTransform(scrollYProgress, [s2, s2 + span * 0.3], [0, 1]);
  const roleY = useSmoothedTransform(scrollYProgress, [s2, s2 + span * 0.35], [14, 0]);

  const bodyOpacity = useSmoothedTransform(scrollYProgress, [s3, s3 + span * 0.35], [0, 1]);
  const bodyY = useSmoothedTransform(scrollYProgress, [s3, s3 + span * 0.4], [14, 0]);

  const tagsOpacity = useSmoothedTransform(scrollYProgress, [s4, s4 + span * 0.3], [0, 1]);

  /* Early return AFTER all hooks */
  if (!svgMetrics) return null;

  const pxX = wp.x * svgMetrics.scaleX;
  const pxY = wp.y * svgMetrics.scaleY + svgMetrics.offsetTop;

  const CARD_MAX_W = 400;

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        top: pxY - (index === N - 1 ? 240 : 40),
        ...(isLeft
          ? { left: pxX + 50, maxWidth: CARD_MAX_W }
          : { right: `calc(100% - ${pxX - 50}px)`, maxWidth: CARD_MAX_W }),
        opacity: containerOpacity,
        y: containerY,
        scale: containerScale,
      }}
    >
      <div className={`p-4 ${isLeft ? "" : "text-right"}`}>
        {/* Period — slides in from the curve side */}
        <motion.span
          className="mb-3 inline-block font-mono text-[11px] tracking-[0.2em] uppercase"
          style={{
            color: "var(--canyon-light)",
            opacity: periodOpacity,
            x: periodX,
          }}
        >
          {entry.period}
        </motion.span>

        {/* Company name — rises up */}
        <motion.h3
          className="mb-1 text-xl font-semibold tracking-tight"
          style={{
            color: "var(--text-primary)",
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          {entry.company}
        </motion.h3>

        {/* Role */}
        <motion.p
          className="mb-4 text-sm font-medium"
          style={{
            color: "var(--text-primary)",
            opacity: roleOpacity,
            y: roleY,
          }}
        >
          {entry.role}
        </motion.p>

        {/* Description + achievements */}
        <motion.div style={{ opacity: bodyOpacity, y: bodyY }}>
          <p
            className="mb-3 text-[13px] leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            {entry.description}
          </p>
          <ul className={`mb-3 space-y-1.5 ${isLeft ? "" : "text-right"}`}>
            {entry.achievements.map((a, j) => (
              <li
                key={j}
                className="text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {isLeft ? "· " : ""}{a}{!isLeft ? " ·" : ""}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tech tags */}
        <motion.div
          className={`flex flex-wrap gap-2 pt-1 ${isLeft ? "" : "justify-end"}`}
          style={{ opacity: tagsOpacity }}
        >
          {entry.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────────
   TimelineMobile — elegant staggered reveal
   ──────────────────────────────────────────────────────────────── */
function TimelineMobile() {
  return (
    <div className="space-y-10">
      {timelineEntries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div
            className="p-5"
            style={{
              borderLeft: "1.5px solid var(--canyon)",
              paddingLeft: 24,
            }}
          >
            <span
              className="mb-3 inline-block font-mono text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "var(--canyon-light)" }}
            >
              {entry.period}
            </span>
            <h3
              className="mb-1 text-lg font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {entry.company}
            </h3>
            <p
              className="mb-3 text-sm font-medium"
              style={{ color: "var(--text-primary)", opacity: 0.75 }}
            >
              {entry.role}
            </p>
            <p
              className="mb-3 text-[13px] leading-[1.7]"
              style={{ color: "var(--text-secondary)" }}
            >
              {entry.description}
            </p>
            <ul className="mb-3 space-y-1.5">
              {entry.achievements.map((a, j) => (
                <li
                  key={j}
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  · {a}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-1">
              {entry.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Main Timeline
   ──────────────────────────────────────────────────────────────── */
export default function Timeline() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [svgMetrics, setSvgMetrics] = useState<{
    scaleX: number;
    scaleY: number;
    offsetTop: number;
  } | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  /* Heading: fade in then out — stays visible longer */
  const headingOpacity = useSmoothedTransform(
    scrollYProgress,
    [0, 0.03, 0.15, 0.22],
    [0, 1, 1, 0],
  );
  const headingY = useSmoothedTransform(
    scrollYProgress,
    [0, 0.03, 0.15, 0.22],
    [30, 0, 0, -20],
  );
  const headingScale = useSmoothedTransform(
    scrollYProgress,
    [0, 0.03],
    [0.97, 1],
  );

  const measureSvg = useCallback(() => {
    if (!svgRef.current || !sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const svgBcr = svgRef.current.getBoundingClientRect();

    const containerW = svgBcr.width;
    const containerH = svgBcr.height;
    const aspectSvg = VB_W / VB_H;
    const aspectContainer = containerW / containerH;

    let renderedW: number, renderedH: number, offsetY: number;

    if (aspectContainer > aspectSvg) {
      renderedH = containerH;
      renderedW = containerH * aspectSvg;
      offsetY = 0;
    } else {
      renderedW = containerW;
      renderedH = containerW / aspectSvg;
      offsetY = (containerH - renderedH) / 2;
    }

    setSvgMetrics({
      scaleX: renderedW / VB_W,
      scaleY: renderedH / VB_H,
      offsetTop: svgBcr.top - sectionRect.top + offsetY,
    });
  }, []);

  /* Ambient glow opacities — must be called unconditionally */
  const glow1Opacity = useSmoothedTransform(scrollYProgress, [0.05, 0.2, 0.5], [0, 0.6, 0]);
  const glow2Opacity = useSmoothedTransform(scrollYProgress, [0.45, 0.6, 0.85], [0, 0.5, 0]);

  useEffect(() => {
    measureSvg();
    const ro = new ResizeObserver(measureSvg);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, [measureSvg]);

  return (
    <>
      <section
        id="timeline"
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ background: "var(--bg-secondary)" }}
      >
        {isMobile ? (
          <div className="px-6 pt-32 pb-24">
            <div className="mx-auto max-w-5xl">
              <SectionHeading
                label="경력"
                title="커리어 패스"
                description="기술과 비즈니스를 연결하는 여정"
              />
              <TimelineMobile />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-6">
            {/* Heading — scroll-linked fade in/out */}
            <motion.div
              className="pt-32 pb-8 text-center"
              style={{
                opacity: headingOpacity,
                y: headingY,
                scale: headingScale,
              }}
            >
              <SectionHeading
                label="경력"
                title="커리어 패스"
                description="기술과 비즈니스를 연결하는 여정"
              />
            </motion.div>

            {/* Desktop curve + cards */}
            <div className="relative pb-24">
              {/* Ambient glow — follows first third of the curve */}
              <motion.div
                className="pointer-events-none absolute"
                style={{
                  top: "12%",
                  left: "8%",
                  width: 700,
                  height: 700,
                  background:
                    "radial-gradient(ellipse at center, var(--canyon-glow) 0%, transparent 70%)",
                  opacity: glow1Opacity,
                  filter: "blur(20px)",
                }}
              />

              {/* Second glow for lower section */}
              <motion.div
                className="pointer-events-none absolute"
                style={{
                  top: "60%",
                  right: "5%",
                  width: 600,
                  height: 600,
                  background:
                    "radial-gradient(ellipse at center, var(--canyon-glow) 0%, transparent 70%)",
                  opacity: glow2Opacity,
                  filter: "blur(20px)",
                }}
              />

              <svg
                ref={svgRef}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: "block" }}
              >
                <CurvePath scrollYProgress={scrollYProgress} />
              </svg>

              {timelineEntries.map((entry, i) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  svgMetrics={svgMetrics}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Awards & Teaching */}
      <section
        className="px-6 py-20"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass rounded-xl p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">
                <span style={{ color: "var(--text-primary)" }}>수상 경력</span>
              </h3>
              {awards.map((award, i) => (
                <div key={i} className="mb-3">
                  <p className="text-sm font-medium">{award.title}</p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {award.organization} · {award.date}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    {award.description}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="glass rounded-xl p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">
                <span style={{ color: "var(--text-primary)" }}>교육 & 강연</span>
              </h3>
              <div className="space-y-3">
                {teachings.map((t, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{t.title}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
