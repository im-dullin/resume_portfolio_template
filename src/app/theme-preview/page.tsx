"use client";

const themes = [
  {
    name: "Current — Monochrome Dark",
    bg: "#09090b",
    bgSecondary: "#141416",
    bgTertiary: "#1c1c1e",
    textPrimary: "#fafafa",
    textSecondary: "#71717a",
    textMuted: "#3f3f46",
    accent: "#e4e4e7",
    accentBtn: "#e4e4e7",
    accentBtnText: "#09090b",
    tagBg: "#1c1c1e",
    tagText: "#a1a1aa",
    border: "rgba(255,255,255,0.06)",
    swatches: ["#09090b", "#141416", "#3f3f46", "#71717a", "#e4e4e7", "#fafafa"],
  },
  {
    name: "1 — Warm Cream",
    bg: "#FAF8F5",
    bgSecondary: "#F2EFEB",
    bgTertiary: "#E8E4DF",
    textPrimary: "#1C1917",
    textSecondary: "#78716C",
    textMuted: "#D6D3D1",
    accent: "#292524",
    accentBtn: "#292524",
    accentBtnText: "#FAF8F5",
    tagBg: "#E8E4DF",
    tagText: "#57534E",
    border: "#E8E4DF",
    swatches: ["#FAF8F5", "#F2EFEB", "#E8E4DF", "#78716C", "#292524", "#1C1917"],
  },
  {
    name: "2 — Ink & Paper",
    bg: "#FFFFFF",
    bgSecondary: "#F7F7F7",
    bgTertiary: "#EEEEEE",
    textPrimary: "#111111",
    textSecondary: "#555555",
    textMuted: "#CCCCCC",
    accent: "#0066FF",
    accentBtn: "#0066FF",
    accentBtnText: "#FFFFFF",
    tagBg: "#EEEEEE",
    tagText: "#555555",
    border: "#EEEEEE",
    swatches: ["#FFFFFF", "#F7F7F7", "#EEEEEE", "#555555", "#0066FF", "#111111"],
  },
  {
    name: "3 — Deep Navy",
    bg: "#0F172A",
    bgSecondary: "#1E293B",
    bgTertiary: "#334155",
    textPrimary: "#F1F5F9",
    textSecondary: "#94A3B8",
    textMuted: "#475569",
    accent: "#38BDF8",
    accentBtn: "#38BDF8",
    accentBtnText: "#0F172A",
    tagBg: "#334155",
    tagText: "#94A3B8",
    border: "#334155",
    swatches: ["#0F172A", "#1E293B", "#334155", "#94A3B8", "#38BDF8", "#F1F5F9"],
  },
  {
    name: "4 — Forest Moss",
    bg: "#FAFDF7",
    bgSecondary: "#F1F5EC",
    bgTertiary: "#E2E8D9",
    textPrimary: "#1A2E1A",
    textSecondary: "#4D6B4D",
    textMuted: "#B5C7AB",
    accent: "#2D5A2D",
    accentBtn: "#2D5A2D",
    accentBtnText: "#FAFDF7",
    tagBg: "#E2E8D9",
    tagText: "#2D5A2D",
    border: "#E2E8D9",
    swatches: ["#FAFDF7", "#F1F5EC", "#E2E8D9", "#4D6B4D", "#2D5A2D", "#1A2E1A"],
  },
  {
    name: "5 — Warm Midnight",
    bg: "#1A1520",
    bgSecondary: "#221C28",
    bgTertiary: "#2E2735",
    textPrimary: "#F0ECF4",
    textSecondary: "#9B8FB0",
    textMuted: "#4A3F58",
    accent: "#D4A0FF",
    accentBtn: "#D4A0FF",
    accentBtnText: "#1A1520",
    tagBg: "#2E2735",
    tagText: "#D4A0FF",
    border: "#2E2735",
    swatches: ["#1A1520", "#221C28", "#4A3F58", "#9B8FB0", "#D4A0FF", "#F0ECF4"],
  },
];

function ThemeCard({ theme }: { theme: (typeof themes)[number] }) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      {/* Label */}
      <div
        style={{
          padding: "14px 24px",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.5,
          textTransform: "uppercase" as const,
          background: "#222",
          color: "#aaa",
          borderBottom: "1px solid #333",
        }}
      >
        {theme.name}
      </div>

      {/* Body */}
      <div style={{ background: theme.bg, padding: "32px 28px" }}>
        {/* Nav */}
        <nav
          style={{
            display: "flex",
            gap: 20,
            paddingBottom: 16,
            marginBottom: 28,
            borderBottom: `1px solid ${theme.textMuted}`,
          }}
        >
          {["Home", "Projects", "Blog", "Contact"].map((item, i) => (
            <span
              key={item}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: i === 0 ? theme.textPrimary : theme.textSecondary,
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Hero */}
        <h2
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: theme.textPrimary,
            marginBottom: 6,
          }}
        >
          홍길동
        </h2>
        <p
          style={{
            fontSize: 13,
            color: theme.textSecondary,
            marginBottom: 20,
          }}
        >
          R&D 연구책임자 · 풀스택 개발자 · AI 개발자
        </p>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: theme.textSecondary,
            marginBottom: 20,
          }}
        >
          AI와 블록체인 기술을 활용한 혁신적인 솔루션을 설계하고 구현합니다.
          복잡한 문제를 단순하게 풀어내는 것을 좋아합니다.
        </p>

        {/* Card */}
        <div
          style={{
            padding: 18,
            borderRadius: 10,
            background: theme.bgSecondary,
            border: `1px solid ${theme.border}`,
            marginBottom: 16,
          }}
        >
          <h3
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: theme.textPrimary,
              marginBottom: 4,
            }}
          >
            AI 기반 분석 플랫폼
          </h3>
          <p style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 10 }}>
            실시간 데이터 분석 및 시각화 대시보드
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            {["Next.js", "Python", "LLM"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 11,
                  padding: "3px 10px",
                  borderRadius: 99,
                  background: theme.tagBg,
                  color: theme.tagText,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: theme.accentBtn,
              color: theme.accentBtnText,
            }}
          >
            프로젝트 보기
          </button>
          <button
            style={{
              padding: "10px 22px",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              background: "transparent",
              color: theme.textSecondary,
              border: `1px solid ${theme.textMuted}`,
            }}
          >
            연락하기
          </button>
        </div>

        {/* Swatches */}
        <div style={{ display: "flex", gap: 6 }}>
          {theme.swatches.map((color, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: color,
                border: "1px solid rgba(128,128,128,0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ThemePreviewPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        padding: "40px 20px",
        cursor: "auto",
      }}
    >
      <h1
        style={{
          color: "#fff",
          textAlign: "center",
          marginBottom: 40,
          fontSize: 28,
          fontWeight: 300,
        }}
      >
        Portfolio Theme Preview
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: 32,
          maxWidth: 1240,
          margin: "0 auto",
        }}
      >
        {themes.map((theme) => (
          <ThemeCard key={theme.name} theme={theme} />
        ))}
      </div>
    </div>
  );
}
