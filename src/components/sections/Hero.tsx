"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal, heroTexts } from "@/data/personal";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 pb-12 pt-20 md:px-10 lg:flex-row lg:items-end lg:px-16">

        {/* ── LEFT COLUMN — text ── */}
        <div className="relative z-20 flex flex-1 flex-col justify-end pb-8 lg:pb-16">
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mb-6 max-w-[240px] text-sm leading-relaxed md:text-base"
            style={{ color: "var(--color-zinc-500)" }}
          >
            {heroTexts.subtitle.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heroTexts.subtitle.split("\n").length - 1 && <br />}
              </span>
            ))}
          </motion.p>

          {/* Large heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[1.05] tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            {heroTexts.heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < heroTexts.heading.split("\n").length - 1 && <br />}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* ── RIGHT COLUMN — photo ── */}
        <div className="relative flex flex-col items-end lg:w-[55%] xl:w-[50%]">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="relative h-[60vh] w-full overflow-hidden rounded-t-2xl md:h-[70vh] lg:h-[85vh] lg:rounded-2xl"
          >
            <Image
              src={heroTexts.profileImage}
              alt={personal.name.ko}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 55vw"
              priority
              style={{ filter: "grayscale(100%) contrast(1.1)" }}
            />

            {/* Bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background: "linear-gradient(to top, var(--bg-primary), transparent)",
              }}
            />

            {/* Subtle light glow behind head */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 30%, var(--overlay-6), transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── STATUS BAR — bottom edge ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 pb-6 md:px-10 lg:px-16"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="relative h-1.5 w-1.5">
              <div className="absolute inset-0 animate-ping rounded-full" style={{ background: "var(--moss)", opacity: 0.4 }} />
              <div className="absolute inset-0 rounded-full" style={{ background: "var(--moss)" }} />
            </div>
            <span className="text-[11px]" style={{ color: "var(--color-zinc-600)" }}>
              {heroTexts.statusText}
            </span>
          </div>
          <span className="text-[11px]" style={{ color: "var(--color-zinc-700)" }}>
            {heroTexts.locationText}
          </span>
        </div>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-2 rounded-full py-3 pl-6 pr-3 text-sm font-medium transition-all"
          style={{
            background: "var(--overlay-6)",
            color: "var(--text-primary)",
            border: "1px solid var(--overlay-8)",
          }}
          data-cursor-hover
        >
          <span>{heroTexts.ctaText}</span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5"
            style={{ background: "var(--btn-arrow-bg)", color: "var(--btn-arrow-text)" }}
          >
            →
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
