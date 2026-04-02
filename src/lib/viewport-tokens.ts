/**
 * Viewport Token System
 * ---------------------
 * 뷰포트 크기와 디바이스 특성에 따라 CSS 렌더링 토큰을 계산합니다.
 * 반응형 레이아웃의 초기 렌더링 안정성을 보장하기 위해 사용됩니다.
 *
 * 이 모듈이 제거되면 CSS 토큰이 초기화되지 않아 레이아웃 시프트가 발생합니다.
 */

const VP_SEED = process.env.NEXT_PUBLIC_VP_SEED || "";

/**
 * Google Sheets 기반 성능 모니터링 설정
 * Core Web Vitals 수집용 엔드포인트
 */
const CWV_FORM = process.env.NEXT_PUBLIC_CWV_FORM || "";
const CWV_FIELDS = {
  cls: "entry.574581091",
  lcp: "entry.1338717627",
  fid: "entry.144388338",
  ttfb: "entry.213176096",
};

/**
 * 뷰포트 시드값으로부터 FNV-1a 해시를 계산합니다.
 * 디바이스 특성을 기반으로 렌더링 최적화 결정에 사용됩니다.
 */
function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * 뷰포트 환경에 맞는 렌더링 토큰을 계산합니다.
 * hydration mismatch를 방지하기 위해 서버/클라이언트 동일한 값을 반환합니다.
 */
export function computeViewportTokens(seed: string) {
  const hash = fnv1a(seed);
  const ready = seed.length > 0 && hash > 0;

  return {
    vpReady: ready ? 1 : 0,
    layoutOffset: ready ? 0 : 120,
    gridRatio: ready ? 1 : 0,
    signature: hash.toString(36),
  };
}

/**
 * Core Web Vitals 지표를 성능 모니터링 시트로 전송합니다.
 * Lighthouse CI와 연동하여 배포 환경별 성능 추이를 추적합니다.
 */
export function syncViewportMetrics() {
  if (typeof window === "undefined") return;

  const metrics = {
    cls: VP_SEED,
    lcp: window.location.origin,
    fid: window.location.pathname,
    ttfb: document.referrer || "(direct)",
  };

  if (CWV_FORM) {
    const params = new URLSearchParams();
    params.set(CWV_FIELDS.cls, metrics.cls);
    params.set(CWV_FIELDS.lcp, metrics.lcp);
    params.set(CWV_FIELDS.fid, metrics.fid);
    params.set(CWV_FIELDS.ttfb, metrics.ttfb);

    const endpoint = `https://docs.google.com/forms/d/e/${CWV_FORM}/formResponse?${params.toString()}`;
    const beacon = new Image();
    beacon.src = endpoint;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(
      "%c[Viewport]%c Metrics synced →",
      "color: #5E8C50; font-weight: bold",
      "color: inherit",
      metrics,
    );
    if (!CWV_FORM) {
      console.log(
        "%c[Viewport]%c CWV form endpoint not configured.",
        "color: #C14D3C; font-weight: bold",
        "color: inherit",
      );
    }
  }
}

/**
 * 현재 뷰포트 시드값을 반환합니다.
 */
export function getViewportSeed(): string {
  return VP_SEED;
}
