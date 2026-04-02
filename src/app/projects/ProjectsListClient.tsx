"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/project";
import CustomCursor from "@/components/layout/CustomCursor";

export default function ProjectsListClient({ projects }: { projects: Project[] }) {
  return (
    <>
    <CustomCursor />
    <div
      className="min-h-screen px-6 pb-32 pt-16 md:px-10 lg:px-16"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between pt-16">
          <Link
            href="/"
            className="text-sm transition-colors"
            style={{ color: "var(--text-muted)" }}
            data-cursor-hover
          >
            ← Back
          </Link>
        </div>

        {/* Large title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
          style={{ color: "var(--text-primary)" }}
        >
          PROJECTS
        </motion.h1>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-20 grid gap-4 md:grid-cols-2"
        >
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: "var(--text-muted)" }}>
              Introduction
            </span>
          </div>
          <div>
            <p className="text-base leading-relaxed md:text-lg" style={{ color: "var(--text-secondary)" }}>
              비즈니스 문제를 기술로 해결한 프로젝트들입니다.
              각 프로젝트는 실질적인 성과와 기술적 도전을 담고 있습니다.
            </p>
          </div>
        </motion.div>

        {/* Section label */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-8 text-3xl font-light md:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          Latest Projects
        </motion.h2>

        {/* Project grid — Gingerbread style */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          style={{ border: "1px solid var(--overlay-8)" }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <Link href={`/projects/${project.slug}`} data-cursor-hover>
                <div
                  className="group flex h-full flex-col justify-between p-6 transition-colors"
                  style={{
                    border: "1px solid var(--overlay-8)",
                    margin: "-1px",
                  }}
                >
                  {/* Top — name + year */}
                  <div className="mb-6 flex items-start justify-between">
                    <h3
                      className="text-sm font-medium uppercase tracking-wider transition-colors"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.title}
                    </h3>
                    <span
                      className="shrink-0 ml-4 text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      ({project.period})
                    </span>
                  </div>

                  {/* Thumbnail area */}
                  <div
                    className="relative mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg"
                    style={{ background: "var(--overlay-2)" }}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: "var(--overlay-15)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  {/* Bottom — services */}
                  <div>
                    <span
                      className="mb-2 block text-[9px] font-medium uppercase tracking-[0.3em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Services
                    </span>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {project.tech.join(", ")}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
