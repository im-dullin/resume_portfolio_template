"use client";

import { ogImageData } from "@/data/personal";

export default function OgImagePreview() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        gap: "24px",
        padding: "40px",
      }}
    >
      <p style={{ color: "#71717a", fontSize: "14px" }}>
        OG Image Preview — 1200 × 630
      </p>

      {/* ── OG IMAGE ── */}
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#fafaf8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
          flexShrink: 0,
          display: "flex",
        }}
      >
        {/* ═══ LEFT: Hero area ═══ */}
        <div
          style={{
            width: "520px",
            flexShrink: 0,
            padding: "56px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "11px", color: "#c0bdb6", letterSpacing: "0.25em", fontFamily: "monospace" }}>
              PORTFOLIO
            </span>
            <div style={{ width: "24px", height: "1px", background: "#ddd" }} />
            <span style={{ fontSize: "11px", color: "#c0bdb6", fontFamily: "monospace" }}>{new Date().getFullYear()}</span>
          </div>

          {/* Name + tagline */}
          <div>
            <div style={{ fontSize: "68px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-3.5px", lineHeight: 1 }}>
              {ogImageData.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "16px" }}>
              <div style={{ width: "24px", height: "2px", background: "#C14D3C", opacity: 0.5, borderRadius: "1px" }} />
              <span style={{ fontSize: "15px", color: "#8a8780", fontWeight: 400, letterSpacing: "-0.3px" }}>
                {ogImageData.tagline}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px", paddingLeft: "34px" }}>
              {ogImageData.roles.map((role, i) => (
                <span key={role} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {i > 0 && <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#ddd", display: "inline-block" }} />}
                  <span style={{ fontSize: "12px", color: "#b0ada6" }}>{role}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div style={{ display: "flex", gap: "36px" }}>
            {ogImageData.metrics.map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: "26px", fontWeight: 700, color: "#1a1a1a", letterSpacing: "-1px", lineHeight: 1 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: "10px", color: "#c0bdb6", marginTop: "5px" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {ogImageData.techBadges.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "3px 9px",
                  borderRadius: "3px",
                  border: "1px solid #ebebeb",
                  fontSize: "9px",
                  color: "#b0ada6",
                  fontFamily: "monospace",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ═══ RIGHT: Dense info grid ═══ */}
        <div
          style={{
            flex: 1,
            borderLeft: "1px solid #efefef",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* R1: Status bar */}
          <div
            style={{
              padding: "14px 32px",
              borderBottom: "1px solid #efefef",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "9px", color: "#c0bdb6", letterSpacing: "2px", fontFamily: "monospace" }}>
              OVERVIEW
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#5E8C50" }} />
              <span style={{ fontSize: "10px", color: "#5E8C50", fontWeight: 500 }}>Open to Work</span>
            </div>
          </div>

          {/* R2: Experience */}
          <div style={{ padding: "20px 32px", borderBottom: "1px solid #efefef" }}>
            <div style={{ fontSize: "9px", color: "#c0bdb6", letterSpacing: "1.5px", fontFamily: "monospace", marginBottom: "12px" }}>
              EXPERIENCE
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ogImageData.experiences.map((exp) => (
                <div key={exp.org} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "#2a2a28" }}>{exp.role}</span>
                    <span style={{ fontSize: "9px", color: "#c0bdb6" }}>{exp.detail}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0, marginLeft: "12px" }}>
                    <span style={{ fontSize: "9px", color: "#b0ada6" }}>{exp.org}</span>
                    <span style={{ fontSize: "9px", color: "#d5d5d5", fontFamily: "monospace" }}>{exp.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R3: Projects grid */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                padding: "0 32px",
                borderTop: "1px solid #efefef",
                display: "flex",
                alignItems: "center",
                height: "32px",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "9px", color: "#c0bdb6", letterSpacing: "1.5px", fontFamily: "monospace" }}>
                FEATURED PROJECTS
              </span>
            </div>
            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr" }}>
              {ogImageData.featuredProjects.map((p, i) => (
                <div
                  key={p.name}
                  style={{
                    padding: "14px 20px",
                    borderTop: "1px solid #efefef",
                    borderRight: (i % 3 !== 2) ? "1px solid #efefef" : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#2a2a28", letterSpacing: "-0.3px" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "10px", color: "#a09d97", marginTop: "3px" }}>
                    {p.desc}
                  </div>
                  <div style={{ fontSize: "8px", color: "#d0cdc7", marginTop: "4px", fontFamily: "monospace" }}>
                    {p.tech}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* R4: Bottom bar */}
          <div
            style={{
              padding: "12px 32px",
              borderTop: "1px solid #efefef",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "16px" }}>
              {ogImageData.bottomProjects.map((p) => (
                <span key={p} style={{ fontSize: "9px", color: "#c0bdb6" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom accent ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "140px",
            height: "1px",
            background: "linear-gradient(90deg, #5E8C50, transparent)",
            opacity: 0.2,
            zIndex: 10,
          }}
        />
      </div>

      <p style={{ color: "#3f3f46", fontSize: "12px" }}>
        이 화면을 스크린샷하여 src/app/opengraph-image.png로 저장하세요
      </p>
    </div>
  );
}
