"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personal, certifications, experiences, skills } from "@/data/personal";
import SectionHeading from "@/components/ui/SectionHeading";

/* Stagger orchestration */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 py-32"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="소개" title="한눈에 보기" />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* ═══════════════════════════════════════════
              HERO BLOCK: Photo + Name + Stats
              ═══════════════════════════════════════════ */}
          <div className="relative">
            {/* Content grid: Photo left | Info right */}
            <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:gap-14 lg:gap-20">
              {/* Photo — editorial portrait */}
              <motion.div variants={fadeUp} className="shrink-0">
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(200px, 22vw, 280px)",
                    aspectRatio: "3 / 4",
                  }}
                >
                  <Image
                    src="/images/profile.png"
                    alt={personal.name.ko}
                    fill
                    className="object-cover object-top"
                    sizes="280px"
                  />
                  {/* Subtle bottom fade */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/4"
                    style={{
                      background: "linear-gradient(to top, var(--bg-secondary), transparent)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Name + tagline + stats */}
              <div className="flex-1 pb-2">
                <motion.div variants={fadeUp}>
                  <p
                    className="text-xs font-medium uppercase tracking-[0.3em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {personal.name.en}
                  </p>
                  <h3
                    className="mt-2 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {personal.name.ko}
                  </h3>
                </motion.div>

                <motion.p
                  variants={fadeUp}
                  className="mt-5 max-w-lg text-base leading-[1.8]"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {personal.about}
                </motion.p>

                {/* Stats — large numbers inline */}
                <motion.div
                  variants={fadeUp}
                  className="mt-10 flex gap-14"
                >
                  {[
                    { n: personal.stats.yearsOfExperience, suffix: "+", label: "Years of Exp." },
                    { n: personal.stats.projectsCompleted, suffix: "+", label: "Projects" },
                    { n: personal.stats.certifications, suffix: "", label: "Certifications" },
                  ].map((s) => (
                    <div key={s.label} className="relative">
                      <p className="flex items-baseline gap-0.5">
                        <span
                          className="text-4xl font-bold tabular-nums tracking-tight"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.n}
                        </span>
                        {s.suffix && (
                          <span
                            className="text-xl font-light"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {s.suffix}
                          </span>
                        )}
                      </p>
                      <p
                        className="mt-1 text-xs font-medium uppercase tracking-[0.2em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════
              DATA SECTION
              ═══════════════════════════════════════════ */}
          <div className="relative mt-20">
            <div>
              {/* Contact row */}
              <motion.div
                variants={fadeUp}
                className="mb-10 flex flex-wrap gap-x-8 gap-y-2 border-b pb-6"
                style={{ borderColor: "var(--overlay-6)" }}
              >
                {[
                  { label: "Birth", value: personal.birth },
                  { label: "Location", value: personal.location },
                  { label: "Education", value: personal.education },
                  { label: "Email", value: personal.email },
                ].map((item) => (
                  <div key={item.label} className="flex items-baseline gap-2.5">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.15em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Certification + Experience — 2 columns */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
                {/* Certification */}
                <motion.div variants={fadeUp}>
                  <h4
                    className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Certification
                  </h4>
                  <div className="space-y-4">
                    {certifications.map((c) => (
                      <div key={c.name} className="group flex gap-5">
                        <span
                          className="w-16 shrink-0 pt-px text-right font-mono text-[13px] tabular-nums"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {c.date}
                        </span>
                        <div
                          className="h-px w-3 shrink-0 self-center"
                          style={{ background: "var(--overlay-12)" }}
                        />
                        <span
                          className="text-[15px] leading-snug"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {c.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Experience */}
                <motion.div variants={fadeUp}>
                  <h4
                    className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Experience
                  </h4>
                  <div className="space-y-4">
                    {experiences.map((e, i) => (
                      <div key={i} className="group flex gap-5">
                        <span
                          className="w-16 shrink-0 pt-px text-right font-mono text-[13px] tabular-nums"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {e.date}
                        </span>
                        <div
                          className="h-px w-3 shrink-0 self-center"
                          style={{ background: "var(--overlay-12)" }}
                        />
                        <span
                          className="text-[15px] leading-snug"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {e.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Skills */}
              <motion.div variants={fadeUp} className="mt-12">
                <h4
                  className="mb-6 text-xs font-semibold uppercase tracking-[0.25em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Skills & Tools
                </h4>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
                  {skills.map((s, i) => (
                    <span key={s} className="flex items-center gap-2">
                      <span
                        className="text-[15px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {s}
                      </span>
                      {i < skills.length - 1 && (
                        <span
                          className="text-xs"
                          style={{ color: "var(--overlay-15)" }}
                        >
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
