"use client";

import { personal } from "@/data/personal";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-8"
      style={{
        background: "var(--bg-secondary)",
        borderColor: "var(--bg-glass-border)",
        opacity: "var(--vp-ready)",
      } as React.CSSProperties}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} {personal.name.en}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href={personal.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-text-primary"
            style={{ color: "var(--text-secondary)" }}
          >
            GitHub
          </a>
          <a
            href={personal.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-text-primary"
            style={{ color: "var(--text-secondary)" }}
          >
            LinkedIn
          </a>
          <a
            href={personal.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors hover:text-text-primary"
            style={{ color: "var(--text-secondary)" }}
          >
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
}
