"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface TerminalLine {
  type: "command" | "output" | "empty";
  text: string;
  delay?: number;
}

// 📝 부트 시퀀스를 본인 정보로 교체하세요
const BOOT_SEQUENCE: TerminalLine[] = [
  { type: "command", text: "whoami", delay: 600 },
  { type: "output", text: "홍길동 (Gil-dong Hong)" },
  { type: "output", text: "프론트엔드 개발자 · UI/UX 엔지니어 · 컴퓨터공학 전공" },
  { type: "empty", text: "" },
  { type: "command", text: "cat skills.json | jq '.primary'", delay: 400 },
  {
    type: "output",
    text: '{\n  "frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],\n  "backend":  ["Node.js", "Supabase", "Firebase"],\n  "tools":    ["Git", "Figma", "Vercel"]\n}',
  },
  { type: "empty", text: "" },
  { type: "command", text: "git log --oneline -3", delay: 300 },
  { type: "output", text: "a1b2c3d  feat: TaskFlow — 실시간 칸반 보드 협업 도구" },
  { type: "output", text: "d4e5f6g  feat: FoodMap — 위치 기반 맛집 추천 서비스" },
  { type: "output", text: "g7h8i9j  feat: DevLog — MDX 기반 기술 블로그 플랫폼" },
  { type: "empty", text: "" },
  { type: "command", text: "echo $STATUS", delay: 300 },
  { type: "output", text: "🟢 Open to opportunities" },
  { type: "empty", text: "" },
];

// 📝 인터랙티브 명령어 응답을 본인 정보로 교체하세요
const INTERACTIVE_COMMANDS: Record<string, string> = {
  help: "사용 가능한 명령어:\n  whoami    — 소개\n  skills    — 기술 스택\n  projects  — 주요 프로젝트\n  career    — 경력 요약\n  contact   — 연락처\n  cert      — 자격증\n  clear     — 화면 초기화",
  whoami: "홍길동 — 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자.\n2+ years of experience / 8+ projects / 3 certifications",
  skills: "Frontend:  React · Next.js · TypeScript · Tailwind CSS · HTML/CSS\nBackend:   Node.js · Supabase · Firebase\nTools:     Git · Figma · Vercel · VS Code\nLanguage:  Python · Java",
  projects: "1. TaskFlow — 실시간 칸반 보드 팀 협업 도구\n2. FoodMap — 위치 기반 맛집 추천 서비스\n3. DevLog — MDX 기반 기술 블로그 플랫폼\n4. WeatherNow — 실시간 날씨 대시보드\n\ntype 'projects --detail' for more →",
  "projects --detail": "→ /projects 페이지에서 각 프로젝트의 상세 케이스 스터디를 확인하세요.",
  career: "2025.03 ~  OO 스타트업 프론트엔드 인턴\n2024.09 ~  교내 IT 동아리 회장\n2023.07 ~  오픈소스 컨트리뷰션 아카데미 참가",
  contact: "Email:    sample@email.com\nGitHub:   github.com/your-username\nLinkedIn: linkedin.com/in/your-profile\nBlog:     your-blog.tistory.com",
  cert: "정보처리기사 (2025.06)\nSQLD (2024.11)\nTOEIC 850 (2024.03)",
  clear: "__CLEAR__",
};

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<{ type: string; text: string }[]>([]);
  const [currentTyping, setCurrentTyping] = useState("");
  const [bootComplete, setBootComplete] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Boot sequence
  useEffect(() => {
    let cancelled = false;

    async function runBoot() {
      for (const line of BOOT_SEQUENCE) {
        if (cancelled) return;

        if (line.type === "command") {
          setIsTyping(true);
          // Type command character by character
          const cmd = line.text;
          for (let i = 0; i <= cmd.length; i++) {
            if (cancelled) return;
            setCurrentTyping(cmd.slice(0, i));
            await new Promise((r) => setTimeout(r, 35 + Math.random() * 25));
          }
          await new Promise((r) => setTimeout(r, line.delay || 200));
          setCurrentTyping("");
          setIsTyping(false);
          setLines((prev) => [...prev, { type: "command", text: cmd }]);
        } else {
          setLines((prev) => [...prev, { type: line.type, text: line.text }]);
        }

        await new Promise((r) => setTimeout(r, 80));
        scrollToBottom();
      }

      if (!cancelled) {
        setBootComplete(true);
        setLines((prev) => [
          ...prev,
          { type: "output", text: 'type "help" for available commands ↵' },
        ]);
      }
    }

    const timer = setTimeout(runBoot, 1800);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [scrollToBottom]);

  useEffect(scrollToBottom, [lines, currentTyping, scrollToBottom]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "command", text: cmd.trim() }]);

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const response = INTERACTIVE_COMMANDS[trimmed];
    if (response) {
      if (response === "__CLEAR__") {
        setLines([]);
      } else {
        setLines((prev) => [...prev, { type: "output", text: response }]);
      }
    } else if (trimmed) {
      setLines((prev) => [
        ...prev,
        { type: "output", text: `command not found: ${trimmed}. type "help" for available commands.` },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && userInput.trim()) {
      handleCommand(userInput);
      setUserInput("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      className="mx-auto w-full max-w-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal window */}
      <div
        className="overflow-hidden rounded-lg"
        style={{
          background: "rgba(9, 9, 11, 0.9)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
        >
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#3f3f46" }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#3f3f46" }} />
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#3f3f46" }} />
          </div>
          <span
            className="ml-2 font-mono text-[11px]"
            style={{ color: "var(--text-muted)" }}
          >
            user@portfolio ~ %
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={terminalRef}
          className="h-[340px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed md:h-[380px]"
          style={{ scrollbarWidth: "none" }}
        >
          {lines.map((line, i) => (
            <div key={i} className="min-h-[20px]">
              {line.type === "command" ? (
                <div className="flex">
                  <span style={{ color: "var(--text-muted)" }}>$ </span>
                  <span style={{ color: "var(--text-primary)" }}>{line.text}</span>
                </div>
              ) : line.type === "empty" ? (
                <br />
              ) : (
                <div
                  className="whitespace-pre-wrap pl-0"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {line.text}
                </div>
              )}
            </div>
          ))}

          {/* Currently typing command */}
          {isTyping && (
            <div className="flex">
              <span style={{ color: "var(--text-muted)" }}>$ </span>
              <span style={{ color: "var(--text-primary)" }}>{currentTyping}</span>
              <span
                className="animate-pulse"
                style={{ color: "var(--text-muted)" }}
              >
                ▋
              </span>
            </div>
          )}

          {/* User input prompt */}
          {bootComplete && !isTyping && (
            <div className="flex">
              <span style={{ color: "var(--text-muted)" }}>$ </span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-none bg-transparent font-mono text-[13px] outline-none"
                style={{ color: "var(--text-primary)", caretColor: "var(--text-muted)" }}
                placeholder=""
                autoComplete="off"
                spellCheck={false}
              />
              <span
                className="animate-pulse"
                style={{ color: "var(--text-muted)" }}
              >
                ▋
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
