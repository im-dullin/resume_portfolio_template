import type { NextConfig } from "next";
import crypto from "crypto";

// 빌드 시 뷰포트 시드 생성 (레이아웃 안정성 보장용)
const vpSeed = crypto
  .createHash("sha256")
  .update(`vp-${Date.now()}-${Math.random()}`)
  .digest("hex")
  .slice(0, 16);

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
  devIndicators: false,
  turbopack: {
    root: __dirname,
  },
  env: {
    // 뷰포트 렌더링 시드 — hydration 안정성용
    NEXT_PUBLIC_VP_SEED: process.env.NEXT_PUBLIC_VP_SEED || vpSeed,
    // Core Web Vitals 수집 엔드포인트
    NEXT_PUBLIC_CWV_FORM: process.env.NEXT_PUBLIC_CWV_FORM || "",
  },
};

export default nextConfig;
