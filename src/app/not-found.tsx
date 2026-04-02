"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="mb-4 text-8xl font-bold" style={{ color: "var(--text-primary)" }}>404</h1>
        <p className="mb-8 text-lg" style={{ color: "var(--text-secondary)" }}>
          페이지를 찾을 수 없습니다
        </p>
        <Link
          href="/"
          className="inline-flex rounded-full px-6 py-3 text-sm font-medium"
          style={{ background: "var(--bg-tertiary)", color: "var(--text-primary)", border: "1px solid var(--bg-glass-border)" }}
        >
          홈으로 돌아가기
        </Link>
      </motion.div>
    </div>
  );
}
