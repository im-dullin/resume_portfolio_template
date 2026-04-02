"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiArrowRight, FiCommand } from "react-icons/fi";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  category: "navigation" | "project" | "social" | "shortcut";
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: CommandItem[] = useMemo(() => [
    // Navigation
    { id: "home", label: "홈", description: "히어로 섹션으로 이동", category: "navigation", action: () => scrollToSection("hero"), keywords: ["hero", "top", "홈"] },
    { id: "about", label: "소개", description: "소개 섹션으로 이동", category: "navigation", action: () => scrollToSection("about"), keywords: ["소개", "about"] },
    { id: "projects", label: "프로젝트", description: "프로젝트 페이지로 이동", category: "navigation", action: () => navigate("/projects"), keywords: ["프로젝트", "작업", "projects"] },
    { id: "career", label: "경력", description: "경력 타임라인으로 이동", category: "navigation", action: () => scrollToSection("timeline"), keywords: ["경력", "이력", "career", "timeline"] },
    { id: "skills", label: "기술", description: "기술 스택으로 이동", category: "navigation", action: () => scrollToSection("techstack"), keywords: ["기술", "스킬", "skills"] },
    { id: "blog", label: "블로그", description: "블로그 페이지로 이동", category: "navigation", action: () => navigate("/blog"), keywords: ["블로그", "글", "blog"] },
    { id: "contact", label: "연락처", description: "연락처 섹션으로 이동", category: "navigation", action: () => scrollToSection("contact"), keywords: ["연락", "이메일", "email", "contact"] },
    // Projects
    // 📝 프로젝트 항목을 본인 프로젝트로 교체하세요
    { id: "proj-taskflow", label: "TaskFlow", description: "팀 협업 도구 → 프로젝트 상세", category: "project", action: () => navigate("/projects/taskflow"), keywords: ["taskflow", "협업"] },
    { id: "proj-foodmap", label: "FoodMap", description: "맛집 추천 서비스 → 프로젝트 상세", category: "project", action: () => navigate("/projects/foodmap"), keywords: ["foodmap", "맛집"] },
    { id: "proj-devlog", label: "DevLog", description: "개발 블로그 플랫폼 → 프로젝트 상세", category: "project", action: () => navigate("/projects/devlog"), keywords: ["devlog", "블로그"] },
    // 📝 소셜 링크를 본인 계정으로 교체하세요
    { id: "github", label: "GitHub", description: "github.com/your-username", category: "social", action: () => openExternal("https://github.com/your-username"), keywords: ["깃허브", "코드"] },
    { id: "linkedin", label: "LinkedIn", description: "linkedin.com/in/your-profile", category: "social", action: () => openExternal("https://www.linkedin.com/in/your-profile/"), keywords: ["링크드인"] },
    { id: "email", label: "이메일 보내기", description: "sample@email.com", category: "social", action: () => openExternal("mailto:sample@email.com"), keywords: ["이메일", "메일", "연락", "email"] },
    // Shortcuts
    { id: "shortcut-k", label: "Cmd + K", description: "이 팔레트를 열기", category: "shortcut", action: () => {}, keywords: [] },
  ], []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items.filter((i) => i.id !== "shortcut-k");
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords?.some((kw) => kw.includes(q))
    );
  }, [query, items]);

  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  const categoryLabels: Record<string, string> = {
    navigation: "탐색",
    project: "프로젝트",
    social: "링크",
    shortcut: "단축키",
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const flatFiltered = filtered.filter((i) => i.id !== "shortcut-k");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, flatFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && flatFiltered[selectedIndex]) {
      flatFiltered[selectedIndex].action();
      setIsOpen(false);
    }
  };

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  function navigate(path: string) {
    window.location.href = path;
  }

  function openExternal(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  let flatIndex = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100]"
            style={{ background: "var(--shadow-heavy)", backdropFilter: "blur(4px)" }}
            onClick={() => setIsOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[20%] z-[101] w-[90%] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid var(--overlay-8)",
              boxShadow: "0 25px 50px -12px var(--shadow-heavy)",
            }}
          >
            {/* Search input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: "1px solid var(--overlay-4)" }}
            >
              <FiSearch className="shrink-0 text-sm" style={{ color: "var(--text-muted)" }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="명령어 입력 또는 검색..."
                className="flex-1 border-none bg-transparent text-sm outline-none"
                style={{ color: "var(--text-primary)", caretColor: "var(--text-secondary)" }}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd
                className="flex items-center rounded px-1.5 py-0.5 font-mono text-[10px]"
                style={{
                  background: "var(--overlay-4)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--overlay-6)",
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[320px] overflow-y-auto py-2" style={{ scrollbarWidth: "none" }}>
              {Object.entries(grouped).map(([category, categoryItems]) => (
                <div key={category}>
                  <div
                    className="px-4 py-1.5 text-[10px] font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {categoryLabels[category] || category}
                  </div>
                  {categoryItems
                    .filter((i) => i.id !== "shortcut-k")
                    .map((item) => {
                      const thisIndex = flatIndex++;
                      const isSelected = thisIndex === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            item.action();
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(thisIndex)}
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors"
                          style={{
                            background: isSelected
                              ? "var(--overlay-4)"
                              : "transparent",
                          }}
                        >
                          <div>
                            <div className="text-sm" style={{ color: "var(--text-primary)" }}>
                              {item.label}
                            </div>
                            <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                              {item.description}
                            </div>
                          </div>
                          {isSelected && (
                            <FiArrowRight className="shrink-0 text-xs" style={{ color: "var(--text-muted)" }} />
                          )}
                        </button>
                      );
                    })}
                </div>
              ))}
              {flatFiltered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                  검색 결과 없음
                </div>
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between px-4 py-2"
              style={{ borderTop: "1px solid var(--overlay-4)" }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                  <kbd className="rounded border px-1 font-mono text-[9px]" style={{ borderColor: "var(--overlay-6)" }}>↑↓</kbd>
                  탐색
                </span>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                  <kbd className="rounded border px-1 font-mono text-[9px]" style={{ borderColor: "var(--overlay-6)" }}>↵</kbd>
                  선택
                </span>
              </div>
              <span className="flex items-center gap-1 text-[10px]" style={{ color: "var(--text-muted)" }}>
                <FiCommand className="text-[9px]" />K to toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
