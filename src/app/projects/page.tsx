import { projects } from "@/data/projects";
import ProjectsListClient from "./ProjectsListClient";

export const dynamic = "force-static";

export default function ProjectsPage() {
  return <ProjectsListClient projects={projects} />;
}
