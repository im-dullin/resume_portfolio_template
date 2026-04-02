"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navigation } from "@/data/navigation";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useActiveSection } from "@/hooks/useActiveSection";
import ThemeToggle from "./ThemeToggle";

const sectionIds = ["hero", "about", "projects", "timeline", "techstack", "blog", "contact"];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (href: string) => {
    setIsMobileOpen(false);
    if (href.startsWith("#")) {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.href = href;
    }
  };

  const openCmdK = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid transparent",
          transition: "background 0.3s, backdrop-filter 0.3s",
        }}
      >
        {/* Progress bar */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 h-[1px]"
            style={{ width: `${progress * 100}%`, background: "var(--canyon)" }}
          />
        )}

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
          {/* Left — Name + Menu combined pill */}
          <div
            className="flex items-center rounded-full"
            style={{
              background: "var(--overlay-4)",
              border: "1px solid var(--overlay-6)",
            }}
          >
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); navigateTo("#hero"); }}
              className="px-5 py-2.5 text-sm font-medium tracking-tight"
              style={{ color: "var(--text-primary)" }}
              data-cursor-hover
            >
              {/* 📝 여기에 이름을 입력하세요 */}
              Portfolio
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                background: "var(--overlay-6)",
                color: "var(--color-zinc-500)",
              }}
              data-cursor-hover
              aria-label="Toggle menu"
            >
              <span className="hidden sm:inline">Menu</span>
              <div className="flex h-4 w-4 flex-col items-center justify-center gap-[3px]">
                <motion.span
                  animate={{ rotate: isMobileOpen ? 45 : 0, y: isMobileOpen ? 4 : 0 }}
                  className="block h-[1px] w-3.5"
                  style={{ background: "var(--color-zinc-500)" }}
                />
                <motion.span
                  animate={{ opacity: isMobileOpen ? 0 : 1 }}
                  className="block h-[1px] w-3.5"
                  style={{ background: "var(--color-zinc-500)" }}
                />
                <motion.span
                  animate={{ rotate: isMobileOpen ? -45 : 0, y: isMobileOpen ? -4 : 0 }}
                  className="block h-[1px] w-3.5"
                  style={{ background: "var(--color-zinc-500)" }}
                />
              </div>
            </button>
            <button
              onClick={openCmdK}
              className="hidden items-center gap-1.5 rounded-full px-3 py-2.5 text-[11px] font-medium transition-colors md:flex"
              style={{
                background: "var(--overlay-6)",
                color: "var(--color-zinc-600)",
              }}
              data-cursor-hover
            >
              <span className="font-mono">⌘K</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen menu overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "var(--bg-overlay)" }}
          >
            <div className="flex flex-col items-center gap-6">
              {navigation.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={(e) => { e.preventDefault(); navigateTo(item.href); }}
                  className="text-3xl font-light transition-colors md:text-4xl"
                  style={{
                    color: `#${activeSection}` === item.href
                      ? "var(--text-primary)"
                      : "var(--color-zinc-700)",
                  }}
                  data-cursor-hover
                >
                  {item.label}
                </motion.a>
              ))}

              {/* ⌘K shortcut in menu */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => { setIsMobileOpen(false); setTimeout(openCmdK, 200); }}
                className="mt-4 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm"
                style={{
                  background: "var(--overlay-4)",
                  color: "var(--color-zinc-600)",
                  border: "1px solid var(--overlay-6)",
                }}
                data-cursor-hover
              >
                <span className="font-mono text-xs">⌘K</span>
                <span>빠른 검색</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
