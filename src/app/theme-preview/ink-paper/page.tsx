"use client";

import Image from "next/image";

/* ── Dark + Blue Accent Theme ── */
/* 현재 다크 베이스(#09090b)에 Ink & Paper의 블루(#0066FF) 포인트 컬러 적용 */
const T = {
  bg:          "#09090b",
  bgSec:       "#0c0c0e",
  bgTer:       "#141416",
  text:        "#fafafa",
  textSec:     "#71717a",
  textMuted:   "#3f3f46",
  accent:      "#0066FF",
  accentSoft:  "#0066FF",
  accentGlow:  "rgba(0,102,255,0.15)",
  accentBorder:"rgba(0,102,255,0.25)",
  accentText:  "#60a5ff",
  border:      "rgba(255,255,255,0.06)",
  glassBg:     "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.06)",
};

const projects = [
  { num: "01", title: "AI 감성분석 챗봇", desc: "BERT 기반 감성분석 모델을 활용한 지능형 챗봇 시스템", tech: ["BERT", "Python", "FastAPI", "Next.js"], role: "AI 개발 및 백엔드 설계", period: "2024" },
  { num: "02", title: "IoT 블록체인 관제 시스템", desc: "IoT 센서 데이터를 블록체인에 기록하는 위변조 방지 관제 시스템", tech: ["Blockchain", "IoT", "Node.js", "React"], role: "풀스택 개발 및 아키텍처 설계", period: "2024" },
  { num: "03", title: "CBAM 대응 자동화 솔루션", desc: "공공데이터와 AI 멀티 에이전트를 결합하여 CBAM 대응을 자동화", tech: ["AI Multi-Agent", "Python", "Next.js"], role: "프로젝트 리드 및 AI 개발", period: "2024" },
];

const philosophy = [
  { label: "철학", text: "복잡한 문제일수록 단순한 구조에서 답을 찾습니다." },
  { label: "차별점", text: "같은 기술이라도 활용하는 방식에서 차이가 생깁니다." },
  { label: "원칙", text: "유지비는 0에 수렴해야 하고, 실행 구조는 가벼울수록 지속 가능합니다." },
];

export default function DarkBluePreview() {
  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", cursor: "auto" }}>

      {/* ── NAVBAR ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(9,9,11,0.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", borderRadius: 999, background: T.glassBg, border: `1px solid ${T.glassBorder}` }}>
            <span style={{ padding: "10px 20px", fontSize: 14, fontWeight: 500, color: T.text }}>홍길동</span>
            <span style={{ padding: "10px 16px", fontSize: 14, color: T.textSec, background: "rgba(255,255,255,0.06)", borderRadius: 999 }}>Menu</span>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: T.bg }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 40px 48px", display: "flex", flex: 1, alignItems: "flex-end", gap: 40 }}>
          <div style={{ flex: 1, paddingBottom: 64 }}>
            <p style={{ color: T.textSec, fontSize: 15, lineHeight: 1.6, marginBottom: 24, maxWidth: 240 }}>
              비즈니스 문제를 기술로<br />해결하는 개발자.
            </p>
            <h1 style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", color: T.text }}>
              문제의 답을<br />기술로<br />만듭니다
            </h1>
          </div>
          <div style={{ width: "50%", position: "relative" }}>
            <div style={{ position: "relative", height: "85vh", borderRadius: 16, overflow: "hidden", border: `1px solid ${T.border}` }}>
              <Image src="/images/profile-hero.jpg" alt="홍길동" fill style={{ objectFit: "cover", objectPosition: "top", filter: "grayscale(100%) contrast(1.1)" }} sizes="50vw" priority />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bg}, transparent 33%)` }} />
              {/* Blue glow behind photo */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,102,255,0.06), transparent 70%)" }} />
            </div>
          </div>
        </div>
        {/* Status bar */}
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
              <span style={{ fontSize: 11, color: T.textSec }}>Open to work</span>
            </div>
            <span style={{ fontSize: 11, color: T.textMuted }}>광주, 대한민국</span>
          </div>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "12px 12px 12px 24px", fontSize: 14, fontWeight: 500, color: T.text, background: T.glassBg, border: `1px solid ${T.glassBorder}`, textDecoration: "none" }}>
            <span>View Projects</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: T.accent, color: "#fff" }}>→</span>
          </a>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section style={{ background: T.bg, padding: "128px 24px" }}>
        <div style={{ maxWidth: 896, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.textMuted }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.textMuted }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.textMuted }} />
            <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 10, color: T.textMuted }}>philosophy.sh</span>
          </div>
          {philosophy.map((item) => (
            <div key={item.label} style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "monospace", fontSize: 14, color: T.accentText, marginBottom: 8 }}>$ echo {item.label}</div>
              <div style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 300, lineHeight: 1.4, color: "#e4e4e7" }}>{item.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: T.bgSec, padding: "128px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: T.accentText }}>About</span>
            <h2 style={{ fontSize: 36, fontWeight: 600, marginTop: 12, color: T.text }}>The Brief</h2>
          </div>
          <div style={{ width: "100%", height: 300, borderRadius: 16, background: T.bgTer, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: T.textMuted, fontSize: 14 }}>[ 이력서 이미지 영역 ]</span>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section style={{ background: T.bg, padding: "128px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", marginBottom: 48 }}>
          <span style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: T.accentText }}>Projects</span>
          <h2 style={{ fontSize: 36, fontWeight: 600, marginTop: 12, color: T.text }}>Selected Work</h2>
          <p style={{ marginTop: 8, color: T.textSec, fontSize: 15 }}>비즈니스 문제를 기술로 해결한 프로젝트들</p>
        </div>
        <div style={{ display: "flex", gap: 20, overflowX: "auto", padding: "0 40px 16px", scrollbarWidth: "none" }}>
          {projects.map((p) => (
            <div key={p.num} style={{ minWidth: 360, height: 450, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", border: `1px solid ${T.border}`, cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.1em", color: T.textMuted }}>{p.num}</span>
                <span style={{ fontSize: 11, letterSpacing: "0.1em", color: T.textMuted }}>{p.period}</span>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "32px 0" }}>
                <h3 style={{ fontSize: 28, fontWeight: 600, lineHeight: 1.2, marginBottom: 12, color: T.text }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: T.textSec }}>{p.desc}</p>
              </div>
              <div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.tech.map((t) => (
                    <span key={t} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 999, border: `1px solid ${T.accentBorder}`, color: T.accentText, background: T.accentGlow }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 12, color: T.textMuted }}>{p.role}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, padding: "12px 12px 12px 24px", fontSize: 14, fontWeight: 500, color: T.text, background: T.glassBg, border: `1px solid ${T.glassBorder}`, textDecoration: "none" }}>
            <span>모든 프로젝트 보기</span>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: T.accent, color: "#fff" }}>→</span>
          </a>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: T.bg, padding: "128px 24px", textAlign: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.3em", color: T.accentText }}>Contact</span>
        <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", fontWeight: 600, marginTop: 24, marginBottom: 16, color: T.text }}>다음 팀원을 찾고 계신가요?</h2>
        <p style={{ fontSize: 18, fontWeight: 300, color: T.textSec, marginBottom: 12 }}>기술로 문제를 해결하는 사람이 필요하다면,</p>
        <p style={{ fontSize: 14, color: T.textMuted, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>채용 제안, 공동 창업, 기술 자문, 프로젝트 협업 — 어떤 형태든 좋습니다.<br />편하게 연락 주세요.</p>
        <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px", borderRadius: 999, background: T.accentGlow, border: `1px solid ${T.accentBorder}`, color: T.text, fontSize: 16, fontWeight: 500, textDecoration: "none" }}>
          <span style={{ color: T.accentText }}>✉</span> sample@email.com
        </a>
        <div style={{ width: 48, height: 1, background: T.textMuted, margin: "48px auto" }} />
        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          {["GitHub", "LinkedIn", "Blog"].map((s) => (
            <span key={s} style={{ fontSize: 14, color: T.textMuted }}>{s}</span>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.bgSec, borderTop: `1px solid ${T.border}`, padding: "32px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 14, color: T.textMuted }}>© 2026 Dong Yeop Kim. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["GitHub", "LinkedIn", "Blog"].map((s) => (
              <span key={s} style={{ fontSize: 14, color: T.textSec }}>{s}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Color palette info ── */}
      <div style={{ background: T.bgSec, padding: "48px 40px", borderTop: `1px solid ${T.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: T.text, marginBottom: 24 }}>Dark + Blue Accent — Color Palette</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            {[
              { color: T.bg, label: "Background" },
              { color: T.bgTer, label: "Tertiary" },
              { color: T.textMuted, label: "Muted" },
              { color: T.textSec, label: "Secondary" },
              { color: T.accent, label: "Accent" },
              { color: T.accentText, label: "Accent Light" },
              { color: T.text, label: "Primary" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color, border: `1px solid rgba(255,255,255,0.1)`, marginBottom: 6 }} />
                <div style={{ fontSize: 10, color: T.textSec }}>{s.label}</div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: T.textMuted }}>{s.color}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
