"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechAnnotationProps {
  tech: string;
  detail: string;
  children: React.ReactNode;
}

export default function TechAnnotation({
  tech,
  detail,
  children,
}: TechAnnotationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {children}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[10px] transition-colors"
        style={{
          background: isOpen ? "rgba(255,255,255,0.06)" : "transparent",
          color: "var(--text-muted)",
          border: "1px solid",
          borderColor: isOpen ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.04)",
        }}
        data-cursor-hover
      >
        {"</>"}
      </button>

      {/* Annotation overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-4 top-12 z-20 w-64 rounded-lg p-3"
            style={{
              background: "var(--bg-tertiary)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 10px 30px -5px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="mb-1.5 font-mono text-[11px] font-medium"
              style={{ color: "var(--text-primary)" }}
            >
              {tech}
            </div>
            <div
              className="text-[11px] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {detail}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
