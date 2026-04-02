"use client";

import Image from "next/image";

/* ── Dark & White Hybrid + Blue Accent ── */
/* Hero/Philosophy/Contact → 다크  |  About/Projects/Blog → 화이트 */
const D = {
  bg:          "#09090b",
  bgSec:       "#111113",
  text:        "#fafafa",
  textSec:     "#a1a1aa",
  textMuted:   "#52525b",
  border:      "rgba(255,255,255,0.08)",
  glassBg:     "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.08)",
};

const L = {
  bg:          "#FFFFFF",
  bgSec:       "#F8F9FB",
  text:        "#111111",
  textSec:     "#6B7280",
  textMuted:   "#D1D5DB",
  border:      "#E5E7EB",
  glassBg:     "rgba(0,0,0,0.03)",
  glassBorder: "rgba(0,0,0,0.08)",
};

const A = {
  primary:     "#2563EB",
  bright:      "#3B82F6",
  light:       "#93C5FD",
  glow:        "rgba(37,99,235,0.12)",
  glowStrong:  "rgba(37,99,235,0.20)",
  border:      "rgba(37,99,235,0.25)",
  darkText:    "#93C5FD",
  lightText:   "#2563EB",
};

const projects = [
  { num: "01", title: "AI 감성분석 챗봇", desc: "BERT 기반 감성분석 모델을 활용한 지능형 챗봇 시스템. 사용자 감정을 실시간으로 분석하여 맥락에 맞는 응답을 생성합니다.", tech: ["BERT", "Python", "FastAPI", "Next.js"], role: "AI 개발 및 백엔드 설계", period: "2024" },
  { num: "02", title: "IoT 블록체인 관제 시스템", desc: "IoT 센서 데이터를 블록체인에 기록하는 위변조 방지 관제 시스템. 실시간 모니터링 대시보드와 이상 감지 알림을 제공합니다.", tech: ["Blockchain", "IoT", "Node.js", "React"], role: "풀스택 개발 및 아키텍처 설계", period: "2024" },
  { num: "03", title: "CBAM 대응 자동화 솔루션", desc: "공공데이터와 AI 멀티 에이전트를 결합하여 탄소국경조정제도(CBAM) 대응을 자동화하는 솔루션.", tech: ["AI Multi-Agent", "Python", "Next.js"], role: "프로젝트 리드 및 AI 개발", period: "2024" },
];

const philosophy = [
  { label: "철학", text: "복잡한 문제일수록 단순한 구조에서 답을 찾습니다." },
  { label: "차별점", text: "같은 기술이라도 활용하는 방식에서 차이가 생깁니다." },
  { label: "원칙", text: "유지비는 0에 수렴해야 하고, 실행 구조는 가벼울수록 지속 가능합니다." },
];

export default function HybridBluePreview() {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cursor: "auto" }}>

      {/* ══════════════════════════════════════════════
          DARK — Navbar
          ══════════════════════════════════════════════ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(9,9,11,0.9)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", borderRadius: 999, background: D.glassBg, border: `1px solid ${D.glassBorder}` }}>
            <span style={{ padding: "10px 20px", fontSize: 14, fontWeight: 600, color: D.text }}>홍길동</span>
            <span style={{ padding: "10px 16px", fontSize: 14, color: D.textSec, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>Menu</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Projects", "Blog", "Contact"].map((item, i) => (
              <span key={item} style={{ fontSize: 13, fontWeight: 500, color: i === 0 ? A.light : D.textMuted }}>{item}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════
          DARK — Hero
          ══════════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: D.bg, color: D.text }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 40px 48px", display: "flex", flex: 1, alignItems: "flex-end", gap: 40 }}>
          <div style={{ flex: 1, paddingBottom: 64 }}>
            <p style={{ color: D.textSec, fontSize: 15, lineHeight: 1.6, marginBottom: 24, maxWidth: 240 }}>
              비즈니스 문제를 기술로<br />해결하는 개발자.
            </p>
            <h1 style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: D.text }}>
              문제의 답을<br />기술로<br />만듭니다
            </h1>
          </div>
          <div style={{ width: "50%", position: "relative" }}>
            <div style={{ position: "relative", height: "85vh", borderRadius: 16, overflow: "hidden", border: `1px solid ${D.border}` }}>
              <Image src="/images/profile-placeholder.svg" alt="홍길동" fill style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(100%) contrast(1.1)" }} sizes="50vw" priority />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${D.bg}, transparent 33%)` }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 50% 35%, rgba(37,99,235,0.06), transparent 70%)" }} />
            </div>
          </div>
        </div>
        {/* Status bar */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: A.bright }} />
              <span style={{ fontSize: 11, color: D.textSec }}>Open to work</span>
            </div>
            <span style={{ fontSize: 11, color: D.textMuted }}>광주, 대한민국</span>
          </div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "12px 12px 12px 24px", fontSize: 14, fontWeight: 500, color: D.text, background: D.glassBg, border: `1px solid ${D.glassBorder}`, textDecoration: "none" }}>
            <span>View Projects</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: A.primary, color: "#fff" }}>→</span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DARK — Philosophy
          ══════════════════════════════════════════════ */}
      <section style={{ background: D.bg, padding: "128px 24px", color: D.text }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: D.textMuted }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: D.textMuted }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: D.textMuted }} />
            <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 10, color: D.textMuted }}>philosophy.sh</span>
          </div>
          {philosophy.map((item) => (
            <div key={item.label} style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "monospace", fontSize: 14, color: A.darkText, marginBottom: 8 }}>$ echo {item.label}</div>
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, lineHeight: 1.4, color: "#e4e4e7" }}>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LIGHT — About
          ══════════════════════════════════════════════ */}
      <section style={{ background: L.bgSec, padding: "96px 24px", color: L.text }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: A.lightText }}>About</span>
            <h2 style={{ fontSize: 36, fontWeight: 600, marginTop: 12, color: L.text }}>The Brief</h2>
          </div>
          <div style={{ width: "100%", height: 300, borderRadius: 16, background: L.bg, border: `1px solid ${L.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: L.textMuted, fontSize: 14 }}>[ 이력서 이미지 영역 ]</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LIGHT — Projects
          ══════════════════════════════════════════════ */}
      <section style={{ background: L.bg, padding: "96px 24px", color: L.text }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: A.lightText }}>Projects</span>
          <h2 style={{ fontSize: 36, fontWeight: 600, marginTop: 12, color: L.text }}>Selected Work</h2>
          <p style={{ marginTop: 8, color: L.textSec, fontSize: 15 }}>비즈니스 문제를 기술로 해결한 프로젝트들</p>
        </div>
        <div style={{ display: "flex", gap: 20, overflowX: "auto", padding: "0 40px 16px", scrollbarWidth: "none" }}>
          {projects.map((p) => (
            <div key={p.num} style={{ minWidth: 360, height: 450, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", background: L.bgSec, border: `1px solid ${L.border}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.1em", color: L.textMuted }}>{p.num}</span>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: L.textMuted }}>{p.period}</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 0" }}>
                <h3 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginBottom: 12, color: L.text }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: L.textSec }}>{p.desc}</p>
              </div>
              <div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, background: A.glow, border: `1px solid ${A.border}`, color: A.lightText }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: L.textMuted }}>{p.role}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "12px 12px 12px 24px", fontSize: 14, fontWeight: 500, color: L.text, background: L.glassBg, border: `1px solid ${L.border}`, textDecoration: "none" }}>
            <span>모든 프로젝트 보기</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: A.primary, color: "#fff" }}>→</span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DARK — Contact
          ══════════════════════════════════════════════ */}
      <section style={{ background: D.bg, padding: "96px 24px", textAlign: "center", color: D.text }}>
        <span style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: A.darkText }}>Contact</span>
        <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 600, marginTop: 24, marginBottom: 16, color: D.text }}>다음 팀원을 찾고 계신가요?</h2>
        <p style={{ fontSize: 18, fontWeight: 300, color: D.textSec, marginBottom: 12 }}>기술로 문제를 해결하는 사람이 필요하다면,</p>
        <p style={{ fontSize: 14, color: D.textMuted, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>채용 제안, 공동 창업, 기술 자문, 프로젝트 협업 — 어떤 형태든 좋습니다.<br />편하게 연락 주세요.</p>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 999, background: A.glow, border: `1px solid ${A.border}`, color: D.text, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
          <span style={{ color: A.darkText }}>✉</span> sample@email.com
        </a>
        <div style={{ width: 48, height: 1, background: D.textMuted, margin: "48px auto" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {["GitHub", "LinkedIn", "Blog"].map((s) => (
            <span key={s} style={{ fontSize: 14, color: D.textMuted }}>{s}</span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DARK — Footer
          ══════════════════════════════════════════════ */}
      <footer style={{ background: D.bgSec, borderTop: `1px solid ${D.border}`, padding: "32px 40px", color: D.text }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, color: D.textMuted }}>© 2026 Dong Yeop Kim. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["GitHub", "LinkedIn", "Blog"].map((s) => (
              <span key={s} style={{ fontSize: 14, color: D.textSec }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Color palette info ── */}
      <div style={{ background: D.bg, padding: "48px 40px", borderTop: `1px solid ${D.border}` }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: D.text, marginBottom: 8 }}>Dark & White Hybrid + Blue Accent</h3>
          <p style={{ fontSize: 13, color: D.textMuted, marginBottom: 32 }}>Hero · Philosophy · Contact → Dark &nbsp;|&nbsp; About · Projects → Light</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            {[
              { color: D.bg, label: "Dark BG", sub: "#09090b" },
              { color: D.bgSec, label: "Dark Sec", sub: "#111113" },
              { color: D.textMuted, label: "Dark Muted", sub: "#52525b" },
              { color: D.textSec, label: "Dark Text2", sub: "#a1a1aa" },
              { color: L.bg, label: "Light BG", sub: "#FFFFFF" },
              { color: L.bgSec, label: "Light Sec", sub: "#F8F9FB" },
              { color: L.textSec, label: "Light Text2", sub: "#6B7280" },
              { color: A.primary, label: "Blue", sub: "#2563EB" },
              { color: A.bright, label: "Blue Bright", sub: "#3B82F6" },
              { color: A.light, label: "Blue Light", sub: "#93C5FD" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 4 }} />
                <div style={{ fontSize: 9, color: D.textSec }}>{s.label}</div>
                <div style={{ fontSize: 9, fontFamily: "monospace", color: D.textMuted }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
