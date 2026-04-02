import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export function getContentBySlug(type: "projects" | "blog", slug: string) {
  const fullPath = path.join(contentDirectory, type, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: data,
    content,
    slug,
  };
}

export function getAllContent(type: "projects" | "blog") {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(dir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    })
    .sort((a, b) => {
      const dateA = (a as Record<string, string>).date || "";
      const dateB = (b as Record<string, string>).date || "";
      return dateB.localeCompare(dateA);
    });
}
