import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { inter, pretendard } from "@/lib/fonts";
import { siteMetadata } from "@/data/personal";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${pretendard.variable} antialiased`}
        style={{ cursor: "none" }}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
