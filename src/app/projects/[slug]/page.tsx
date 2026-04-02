import { getContentBySlug, getAllContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  const mdxProjects = getAllContent("projects");
  const dataProjects = projects.map((p) => ({ slug: p.slug }));

  const slugs = new Set([
    ...mdxProjects.map((p) => p.slug),
    ...dataProjects.map((p) => p.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const mdx = getContentBySlug("projects", slug);
  const projectData = projects.find((p) => p.slug === slug);

  if (!mdx && !projectData) {
    notFound();
  }

  // Render MDX on server, pass as ReactNode
  const mdxElement = mdx?.content ? (
    <MDXRemote source={mdx.content} components={mdxComponents} />
  ) : null;

  // Find prev/next projects
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  // Related projects (exclude current, take 5)
  const relatedProjects = projects
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      period: p.period,
      tech: p.tech.slice(0, 2),
    }));

  return (
    <ProjectDetailClient
      slug={slug}
      mdxElement={mdxElement}
      meta={mdx?.meta || null}
      projectData={projectData || null}
      prevProject={prevProject ? { slug: prevProject.slug, title: prevProject.title, period: prevProject.period } : null}
      nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title, period: nextProject.period } : null}
      relatedProjects={relatedProjects}
    />
  );
}
