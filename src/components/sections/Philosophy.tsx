"use client";

import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { philosophyItems } from "@/data/personal";

function TerminalLine({ item, delay }: { item: typeof philosophyItems[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedLabel, setDisplayedLabel] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<"idle" | "label" | "text" | "done">("idle");

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => setPhase("label"), delay);
    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (phase === "label") {
      const cmd = `$ echo ${item.label}`;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedLabel(cmd.slice(0, i));
        if (i >= cmd.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("text"), 300);
        }
      }, 25 + Math.random() * 15);
      return () => clearInterval(interval);
    }
    if (phase === "text") {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedText(item.text.slice(0, i));
        if (i >= item.text.length) {
          clearInterval(interval);
          setPhase("done");
        }
      }, 15 + Math.random() * 10);
      return () => clearInterval(interval);
    }
  }, [phase, item]);

  return (
    <div ref={ref} className="mb-10">
      <div className="mb-2 font-mono text-sm md:text-base" style={{ color: "var(--moss-light)" }}>
        {displayedLabel}
        {phase === "label" && <span className="animate-pulse" style={{ color: "var(--moss)" }}>▋</span>}
      </div>
      <div
        className="text-2xl font-light leading-relaxed md:text-3xl lg:text-4xl"
        style={{ color: phase === "text" || phase === "done" ? "var(--accent)" : "transparent" }}
      >
        {displayedText}
        {phase === "text" && <span className="animate-pulse" style={{ color: "var(--moss)" }}>▋</span>}
      </div>
    </div>
  );
}

export default function Philosophy() {
  return (
    <section className="relative px-6 py-32 md:py-40" style={{ background: "var(--bg-primary)", opacity: "var(--vp-ready)" } as React.CSSProperties}>
      <div className="mx-auto max-w-4xl">
        {/* Terminal chrome */}
        <div className="mb-8 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-zinc-800)" }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-zinc-800)" }} />
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--color-zinc-800)" }} />
          <span className="ml-2 font-mono text-[10px]" style={{ color: "var(--color-zinc-700)" }}>philosophy.sh</span>
        </div>

        {philosophyItems.map((item, i) => (
          <TerminalLine key={item.label} item={item} delay={i * 600} />
        ))}
      </div>
    </section>
  );
}
