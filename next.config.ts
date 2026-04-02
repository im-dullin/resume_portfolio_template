import type { NextConfig } from "next";

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
};

export default nextConfig;
