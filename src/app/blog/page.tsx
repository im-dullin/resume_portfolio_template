import { getAllContent } from "@/lib/mdx";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllContent("blog").map((post) => ({
    slug: post.slug,
    title: (post as Record<string, string>).title || post.slug,
    description: (post as Record<string, string>).description || "",
    date: (post as Record<string, string>).date || "",
    tags: ((post as Record<string, unknown>).tags as string[]) || [],
    readingTime: (post as Record<string, string>).readingTime || "",
  }));

  return <BlogListClient posts={posts} />;
}
