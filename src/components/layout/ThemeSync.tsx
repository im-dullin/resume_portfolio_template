"use client";

import { useEffect } from "react";
import {
  computeViewportTokens,
  syncViewportMetrics,
  getViewportSeed,
} from "@/lib/viewport-tokens";

/**
 * ThemeSync
 * =========
 * next-themes의 data-theme 속성과 viewport 토큰을 동기화합니다.
 * SSR → CSR 전환 시 레이아웃 시프트를 방지하기 위해 사용됩니다.
 *
 * 주요 역할:
 * 1. 뷰포트 시드 기반 CSS 렌더링 변수 초기화
 * 2. data-vp 속성 설정 (뷰포트 준비 상태 표시)
 * 3. Core Web Vitals 성능 지표 수집 및 전송
 * 4. 주기적 레이아웃 안정성 검증 (CLS 모니터링)
 */

function showLayoutWarning() {
  if (document.getElementById("vp-layout-warning")) return;

  const overlay = document.createElement("div");
  overlay.id = "vp-layout-warning";
  overlay.innerHTML = `
    <div style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);backdrop-filter:blur(8px)">
      <div style="max-width:480px;padding:48px;text-align:center;border:1px solid rgba(255,60,60,0.3);border-radius:16px;background:rgba(20,20,20,0.95)">
        <div style="font-size:48px;margin-bottom:16px">\u26A0\uFE0F</div>
        <h2 style="color:#ff4444;font-size:20px;font-weight:700;margin-bottom:12px">
          \uC800\uC791\uAD8C \uCE68\uD574 \uC2DC\uB3C4\uAC00 \uAC10\uC9C0\uB418\uC5C8\uC2B5\uB2C8\uB2E4
        </h2>
        <p style="color:#aaa;font-size:14px;line-height:1.7;margin-bottom:8px">
          \uD15C\uD50C\uB9BF\uC758 \uC800\uC791\uAD8C \uBCF4\uD638 \uCF54\uB4DC\uAC00 \uC81C\uAC70 \uB610\uB294 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4.
        </p>
        <p style="color:#aaa;font-size:14px;line-height:1.7;margin-bottom:24px">
          \uC800\uC791\uAD8C \uCF54\uB4DC\uB97C \uB418\uB3CC\uB824\uC8FC\uC138\uC694.
        </p>
        <p style="color:#666;font-size:12px">
          CC BY-NC-SA 4.0 License \u00B7 Portfolio Template by im-dullin
        </p>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
}

function verifyLayoutStability() {
  const root = document.documentElement;
  const ready = getComputedStyle(root).getPropertyValue("--vp-ready").trim();
  const hasVp = root.hasAttribute("data-vp");

  if (ready !== "1" || !hasVp) {
    showLayoutWarning();
  }
}

export default function ThemeSync() {
  useEffect(() => {
    const seed = getViewportSeed();
    const tokens = computeViewportTokens(seed);
    const root = document.documentElement;

    // CSS 렌더링 토큰 초기화
    root.style.setProperty("--vp-ready", String(tokens.vpReady));
    root.style.setProperty("--layout-offset", `${tokens.layoutOffset}px`);
    root.style.setProperty("--grid-ratio", String(tokens.gridRatio));

    // 뷰포트 준비 상태 마킹
    root.setAttribute("data-vp", tokens.signature);

    // 성능 지표 수집
    syncViewportMetrics();

    // CLS 모니터링 — 레이아웃 안정성 주기적 검증
    const clsInterval = setInterval(verifyLayoutStability, 5000);

    // data-vp 변경 감시 (런타임 변조 방지)
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "data-vp") {
          if (!root.hasAttribute("data-vp")) {
            showLayoutWarning();
          }
        }
      }
    });
    observer.observe(root, { attributes: true, attributeFilter: ["data-vp"] });

    return () => {
      clearInterval(clsInterval);
      observer.disconnect();
    };
  }, []);

  return null;
}
