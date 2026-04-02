"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import CustomCursor from "@/components/layout/CustomCursor";
import { Project } from "@/types/project";

interface AdjacentProject {
  slug: string;
  title: string;
  period: string;
}

interface RelatedProject {
  slug: string;
  title: string;
  period: string;
  tech: string[];
}

interface Props {
  slug: string;
  mdxElement: ReactNode | null;
  meta: Record<string, unknown> | null;
  projectData: Project | null;
  prevProject: AdjacentProject | null;
  nextProject: AdjacentProject | null;
  relatedProjects: RelatedProject[];
}

export default function ProjectDetailClient({
  slug,
  mdxElement,
  meta,
  projectData,
  prevProject,
  nextProject,
  relatedProjects,
}: Props) {
  const title = (meta?.title as string) || projectData?.title || slug;
  const description =
    (meta?.description as string) || projectData?.description || "";
  const tech =
    (meta?.tech as string[]) || projectData?.tech || [];
  const role = (meta?.role as string) || projectData?.role || "";
  const period = (meta?.period as string) || projectData?.period || "";

  return (
    <>
      <CustomCursor />
      <div
        className="min-h-screen px-6 pt-24 pb-16"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="text-sm transition-colors"
              style={{ color: "var(--text-secondary)" }}
              data-cursor-hover
            >
              ← 프로젝트 목록으로
            </Link>
          </motion.div>

          <div className="flex gap-10 lg:gap-14">
            {/* ── Main content ── */}
            <div className="min-w-0 flex-1">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-12"
              >
                <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p
                  className="mb-6 text-lg"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {role && <Badge variant="accent">{role}</Badge>}
                  {period && <Badge variant="outline">{period}</Badge>}
                </div>

                {tech.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tech.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* MDX Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-invert max-w-none"
              >
                {mdxElement ? (
                  mdxElement
                ) : (
                  <div
                    className="rounded-xl p-8 text-center"
                    style={{ background: "var(--overlay-2)", border: "1px solid var(--overlay-6)" }}
                  >
                    <p style={{ color: "var(--text-secondary)" }}>
                      상세 케이스 스터디가 곧 업데이트 됩니다.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Prev / Next navigation */}
              {(prevProject || nextProject) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-20"
                  style={{ borderTop: "1px solid var(--overlay-8)" }}
                >
                  <div className="grid grid-cols-2 gap-4 pt-8">
                    {/* Prev */}
                    <div>
                      {prevProject && (
                        <Link
                          href={`/projects/${prevProject.slug}`}
                          className="group block"
                          data-cursor-hover
                        >
                          <div
                            className="flex h-full flex-col justify-between rounded-xl p-5 transition-colors"
                            style={{ border: "1px solid var(--overlay-6)" }}
                          >
                            <span className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                              ← Prev
                            </span>
                            <div>
                              <h4
                                className="text-base font-semibold transition-colors md:text-lg"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {prevProject.title}
                              </h4>
                              <span className="mt-1 block text-xs" style={{ color: "var(--text-muted)" }}>
                                {prevProject.period}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Next */}
                    <div>
                      {nextProject && (
                        <Link
                          href={`/projects/${nextProject.slug}`}
                          className="group block"
                          data-cursor-hover
                        >
                          <div
                            className="flex h-full flex-col items-end justify-between rounded-xl p-5 text-right transition-colors"
                            style={{ border: "1px solid var(--overlay-6)" }}
                          >
                            <span className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
                              Next →
                            </span>
                            <div>
                              <h4
                                className="text-base font-semibold transition-colors md:text-lg"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {nextProject.title}
                              </h4>
                              <span className="mt-1 block text-xs" style={{ color: "var(--text-muted)" }}>
                                {nextProject.period}
                              </span>
                            </div>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
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
                    다른 프로젝트
                  </h3>

                  <div className="space-y-4">
                    {relatedProjects.map((project) => (
                      <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
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
                            {project.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[11px]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {project.tech.join(", ")}
                            </span>
                            <span style={{ color: "var(--overlay-20)" }}>·</span>
                            <span
                              className="text-[11px]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {project.period}
                            </span>
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
