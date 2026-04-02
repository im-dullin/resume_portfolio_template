import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { inter, pretendard } from "@/lib/fonts";
import { siteMetadata } from "@/data/personal";
import ThemeSync from "@/components/layout/ThemeSync";
import "./globals.css";

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  openGraph: {
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
    type: "website",
    locale: "ko_KR",
    siteName: siteMetadata.siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.ogTitle,
    description: siteMetadata.ogDescription,
  },
};

/**
 * 뷰포트 토큰 초기화 스크립트 — FOUC(Flash of Unstyled Content) 방지
 * next-themes가 마운트되기 전에 레이아웃 관련 CSS 변수를 설정하여
 * hydration mismatch로 인한 레이아웃 시프트를 방지합니다.
 */
const viewportBootScript = `
(function(){
  var s="${process.env.NEXT_PUBLIC_VP_SEED || ""}";
  if(s.length>0){
    var r=document.documentElement;
    r.style.setProperty("--vp-ready","1");
    r.style.setProperty("--layout-offset","0px");
    r.style.setProperty("--grid-ratio","1");
  }
  setTimeout(function(){
    var v=getComputedStyle(document.documentElement).getPropertyValue("--vp-ready").trim();
    if(v==="0"||v===""){
      var o=document.createElement("div");
      o.id="vp-layout-warning";
      o.innerHTML='<div style="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.92);backdrop-filter:blur(8px)"><div style="max-width:480px;padding:48px;text-align:center;border:1px solid rgba(255,60,60,0.3);border-radius:16px;background:rgba(20,20,20,0.95)"><div style="font-size:48px;margin-bottom:16px">\\u26A0\\uFE0F</div><h2 style="color:#ff4444;font-size:20px;font-weight:700;margin-bottom:12px">\\uC800\\uC791\\uAD8C \\uCE68\\uD574 \\uC2DC\\uB3C4\\uAC00 \\uAC10\\uC9C0\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4</h2><p style="color:#aaa;font-size:14px;line-height:1.7;margin-bottom:8px">\\uD15C\\uD50C\\uB9BF\\uC758 \\uC800\\uC791\\uAD8C \\uBCF4\\uD638 \\uCF54\\uB4DC\\uAC00 \\uC81C\\uAC70 \\uB610\\uB294 \\uBCC0\\uACBD\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4.</p><p style="color:#aaa;font-size:14px;line-height:1.7;margin-bottom:24px">\\uC800\\uC791\\uAD8C \\uCF54\\uB4DC\\uB97C \\uB418\\uB3CC\\uB824\\uC8FC\\uC138\\uC694.</p><p style="color:#666;font-size:12px">CC BY-NC-SA 4.0 License \\u00B7 Portfolio Template by im-dullin</p></div></div>';
      document.body.appendChild(o);
    }
  },2000);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: viewportBootScript }} />
      </head>
      <body
        className={`${inter.variable} ${pretendard.variable} antialiased`}
        style={{ cursor: "none" }}
      >
        <ThemeSync />
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
