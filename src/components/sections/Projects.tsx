"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";

const SHOWCASE = projects;
const N = SHOWCASE.length;

/* Height of each row in the scrollable list (px) */
const ROW_H = 72;

export default function Projects() {
  const listRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* ── Derive active index from scroll position (top-aligned) ── */
  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ROW_H);
    setActiveIdx(Math.max(0, Math.min(idx, N - 1)));
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const active = SHOWCASE[activeIdx];
  const num = String(activeIdx + 1).padStart(2, "0");

  /* Visible rows in the list container */
  const VISIBLE_ROWS = 8;

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        {/* Section label */}
        <div className="mb-16">
          <SectionHeading label="프로젝트" title="주요 작업" />
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 lg:gap-16">
          {/* ── Left: Fixed info panel ── */}
          <div className="hidden w-[340px] shrink-0 lg:block">
            <div className="sticky top-32">
              {/* Big number */}
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  NO.
                </p>
                <p
                  className="mt-1 font-mono text-[96px] font-extralight leading-none tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {num}
                </p>
              </div>

              {/* Period + Tech */}
              <div className="mt-10 space-y-6">
                  {/* Period */}
                  <div>
                    <p
                      className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Period
                    </p>
                    <p
                      className="font-mono text-base tracking-wide"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {active.period}
                    </p>
                  </div>

                  {/* Role */}
                  <div>
                    <p
                      className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Role
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {active.role}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p
                      className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.tech.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs tracking-wider"
                          style={{
                            color: "var(--text-muted)",
                            background: "var(--overlay-4)",
                            padding: "4px 12px",
                            borderRadius: 5,
                            border: "1px solid var(--overlay-6)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <p
                      className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Description
                    </p>
                    <p
                      className="text-[15px] leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {active.description}
                    </p>
                  </div>

                  {/* View project link */}
                  <Link
                    href={`/projects/${active.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                    style={{ color: "var(--text-primary)" }}
                    data-cursor-hover
                  >
                    <span
                      className="h-[1px] w-6"
                      style={{ background: "var(--text-primary)" }}
                    />
                    View Project
                  </Link>
              </div>
            </div>
          </div>

          {/* ── Right: Scrollable project list ── */}
          <div className="relative min-w-0 flex-1">
            {/* Top highlight bar — active row sits here */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-0 z-10"
              style={{
                height: `${ROW_H}px`,
                borderBottom: "1px solid var(--overlay-15)",
                background: "var(--overlay-2)",
              }}
            />

            {/* Bottom fade */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
              style={{
                background:
                  "linear-gradient(to top, var(--bg-primary), transparent)",
              }}
            />

            {/* Scrollable container with scroll-snap */}
            <div
              ref={listRef}
              className="no-scrollbar relative overflow-y-auto"
              style={{
                height: `${ROW_H * VISIBLE_ROWS}px`,
                scrollSnapType: "y mandatory",
              }}
            >
              {SHOWCASE.map((project, i) => {
                const isActive = i === activeIdx;
                const distance = Math.abs(i - activeIdx);

                return (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    data-cursor-hover
                  >
                    <motion.div
                      className="flex items-center gap-4 px-2"
                      style={{
                        height: `${ROW_H}px`,
                        scrollSnapAlign: "start",
                      }}
                      animate={{
                        opacity:
                          isActive
                            ? 1
                            : distance === 1
                              ? 0.35
                              : distance === 2
                                ? 0.18
                                : 0.08,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {/* Number prefix */}
                      <span
                        className="shrink-0 font-mono text-xs tracking-wider"
                        style={{ color: "var(--text-muted)", width: "56px" }}
                      >
                        NO — {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Title */}
                      <h3
                        className="truncate tracking-tight transition-all duration-300"
                        style={{
                          color: "var(--text-primary)",
                          fontSize: isActive
                            ? "clamp(1.5rem, 3.5vw, 2.75rem)"
                            : "clamp(1.25rem, 3vw, 2.25rem)",
                          fontWeight: isActive ? 500 : 300,
                        }}
                      >
                        {project.title}
                      </h3>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Bottom padding so last item can snap to top */}
              <div
                style={{ height: `${ROW_H * (VISIBLE_ROWS - 1)}px` }}
                aria-hidden
              />
            </div>
          </div>
        </div>

        {/* ── Mobile: active project info (shown below list on small screens) ── */}
        <div className="mt-8 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-baseline gap-3">
                <span
                  className="font-mono text-3xl font-extralight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {num}
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--text-muted)" }}
                >
                  {active.period}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {active.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {active.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider"
                    style={{
                      color: "var(--text-muted)",
                      background: "var(--overlay-4)",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${active.slug}`}
                className="inline-block font-mono text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-70"
                style={{ color: "var(--text-primary)" }}
                data-cursor-hover
              >
                View Project →
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View all button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group flex items-center gap-2 rounded-full py-3 pl-6 pr-3 text-sm font-medium transition-all"
            style={{
              background: "var(--overlay-6)",
              color: "var(--text-primary)",
              border: "1px solid var(--overlay-8)",
            }}
            data-cursor-hover
          >
            <span>모든 프로젝트 보기</span>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5"
              style={{
                background: "var(--btn-arrow-bg)",
                color: "var(--btn-arrow-text)",
              }}
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
