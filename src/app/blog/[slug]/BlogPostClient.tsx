"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import CustomCursor from "@/components/layout/CustomCursor";
import { useScrollProgress } from "@/hooks/useScrollProgress";

interface RelatedPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface Props {
  slug: string;
  mdxElement: ReactNode | null;
  meta: Record<string, unknown> | null;
  relatedPosts: RelatedPost[];
}

export default function BlogPostClient({ slug, mdxElement, meta, relatedPosts }: Props) {
  const progress = useScrollProgress();

  const title = (meta?.title as string) || slug;
  const description = (meta?.description as string) || "";
  const date = (meta?.date as string) || "";
  const tags = (meta?.tags as string[]) || [];
  const readingTime = (meta?.readingTime as string) || "";

  return (
    <>
      <CustomCursor />
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-[2px]"
        style={{
          width: `${progress * 100}%`,
          background: "var(--text-muted)",
        }}
      />

      <div
        className="min-h-screen px-6 pt-24 pb-16"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="text-sm transition-colors hover:text-text-primary"
              style={{ color: "var(--text-secondary)" }}
            >
              ← 블로그로 돌아가기
            </Link>
          </motion.div>

          <div className="flex gap-10 lg:gap-14">
            {/* ── Main content ── */}
            <div className="min-w-0 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <div className="mb-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="accent">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h1>

                <div
                  className="flex items-center gap-4 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  {date && <span>{date}</span>}
                  {readingTime && <span>· {readingTime}</span>}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                {mdxElement ? (
                  mdxElement
                ) : (
                  <div className="glass rounded-xl p-8 text-center">
                    <p style={{ color: "var(--text-secondary)" }}>
                      이 포스트는 곧 업데이트 됩니다.
                    </p>
                    <p
                      className="mt-2 text-sm"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {description}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3
                    className="mb-5 text-sm font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    관련 글
                  </h3>

                  <div className="space-y-4">
                    {relatedPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group block"
                        data-cursor-hover
                      >
                        <div
                          className="rounded-xl p-3.5 transition-colors"
                          style={{ border: "1px solid var(--overlay-6)" }}
                        >
                          <h4
                            className="mb-1.5 text-[13px] font-medium leading-snug transition-colors line-clamp-2"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[11px]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {post.tags[0]}
                            </span>
                            {post.date && (
                              <>
                                <span style={{ color: "var(--overlay-20)" }}>·</span>
                                <span
                                  className="text-[11px]"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  {post.date}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
