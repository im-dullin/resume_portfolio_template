import { getContentBySlug, getAllContent } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import BlogPostClient from "./BlogPostClient";

export function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getContentBySlug("blog", slug);

  const mdxElement = post?.content ? (
    <MDXRemote source={post.content} components={mdxComponents} />
  ) : null;

  // Get all posts for related articles sidebar
  const allPosts = getAllContent("blog");
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({
      slug: p.slug,
      title: (p as Record<string, string>).title || p.slug,
      date: (p as Record<string, string>).date || "",
      tags: ((p as Record<string, unknown>).tags as string[]) || [],
    }));

  return (
    <BlogPostClient
      slug={slug}
      mdxElement={mdxElement}
      meta={post?.meta || null}
      relatedPosts={relatedPosts}
    />
  );
}
