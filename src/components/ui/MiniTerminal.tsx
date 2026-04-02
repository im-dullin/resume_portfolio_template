"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { personal } from "@/data/personal";

interface Line {
  type: "cmd" | "out" | "gap";
  text: string;
  delay?: number;
}

const SEQUENCE: Line[] = [
  { type: "cmd", text: "whoami", delay: 500 },
  { type: "out", text: `${personal.name.ko} — ${personal.title}` },
  { type: "gap", text: "" },
  { type: "cmd", text: "git log --oneline -3", delay: 300 },
  { type: "out", text: "a1b2c3d feat: 팀 협업 도구" },
  { type: "out", text: "d4e5f6g feat: 맛집 추천 서비스" },
  { type: "out", text: "g7h8i9j feat: 개발 블로그 플랫폼" },
  { type: "gap", text: "" },
  { type: "cmd", text: "echo $STATUS", delay: 200 },
  { type: "out", text: "🟢 Open to opportunities" },
];

export default function MiniTerminal() {
  const [visibleLines, setVisibleLines] = useState<Line[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const idx = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const typeNext = useCallback(() => {
    if (idx.current >= SEQUENCE.length) return;
    const line = SEQUENCE[idx.current];

    if (line.type === "cmd") {
      let charIdx = 0;
      setCurrentTyping("");
      const interval = setInterval(() => {
        charIdx++;
        setCurrentTyping(line.text.slice(0, charIdx));
        if (charIdx >= line.text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentTyping("");
            setVisibleLines((prev) => [...prev, line]);
            idx.current++;
            typeNext();
          }, 200);
        }
      }, 30 + Math.random() * 20);
    } else {
      setVisibleLines((prev) => [...prev, line]);
      idx.current++;
      setTimeout(typeNext, line.delay ?? 80);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(typeNext, 800);
    return () => clearTimeout(timeout);
  }, [typeNext]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleLines, currentTyping]);

  return (
    <div
      className="overflow-hidden rounded-lg border"
      style={{
        background: "var(--bg-primary)",
        borderColor: "var(--bg-glass-border)",
        maxWidth: 480,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5 px-3 py-2"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ef4444" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#eab308" }} />
        <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#22c55e" }} />
        <span className="ml-2 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
          portfolio — zsh
        </span>
      </div>
      {/* Lines */}
      <div ref={containerRef} className="h-48 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
        {visibleLines.map((line, i) => {
          if (line.type === "gap") return <div key={i} className="h-2" />;
          if (line.type === "cmd")
            return (
              <div key={i}>
                <span style={{ color: "var(--moss-light)" }}>$ </span>
                <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
              </div>
            );
          return (
            <div key={i} style={{ color: "var(--text-secondary)" }}>
              {line.text}
            </div>
          );
        })}
        {currentTyping && (
          <div>
            <span style={{ color: "var(--moss-light)" }}>$ </span>
            <span style={{ color: "var(--text-primary)" }}>{currentTyping}</span>
            <span className="animate-pulse" style={{ color: "var(--moss)" }}>
              ▋
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
