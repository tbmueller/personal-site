// The site as Markdown, for AI agents: /llms.txt (the index, per llmstxt.org)
// and /index.md (the whole page as clean Markdown).
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { photos } from "@/data/photos";

const linkList = (links: { label: string; href: string }[]) =>
  links.map((l) => `[${l.label}](${l.href})`).join(", ");

export function llmsTxt(): string {
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.headline} Based in ${profile.location}.`,
    "",
    "Personal site: an About section (work and life outside it) and a list of side projects.",
    "",
    "## Pages",
    "",
    "- [Full page as Markdown](/index.md): About and Projects in one file",
    "- [MCP server](/api/mcp): Streamable HTTP, read-only tools get_about, list_projects and get_project, plus this site as a resource",
    "",
    "## Projects",
    "",
    ...projects.map((p) => `- [${p.name}](${p.links[p.links.length - 1].href}): ${p.description}`),
    "",
    "## Optional",
    "",
    `- [GitHub](${profile.links.github})`,
    `- [LinkedIn](${profile.links.linkedin})`,
    "",
  ].join("\n");
}

export function indexMd(): string {
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.headline}`,
    "",
    "## About",
    "",
    "### At work",
    "",
    ...profile.work.flatMap((p) => [p, ""]),
    `Skills: ${profile.skills.join(", ")}.`,
    "",
    "### Outside work",
    "",
    profile.outside,
    "",
    ...(photos.length
      ? ["Travel photos:", "", ...photos.map((p) => `- [${p.caption ?? p.alt}](${p.src})`), ""]
      : []),
    "## Projects",
    "",
    ...projects.flatMap((p) => [
      `### ${p.name}`,
      "",
      p.description,
      "",
      `Links: ${linkList(p.links)}. Tags: ${p.tags.join(", ")}.`,
      "",
    ]),
    "## Elsewhere",
    "",
    `- [GitHub](${profile.links.github})`,
    `- [LinkedIn](${profile.links.linkedin})`,
    "",
  ].join("\n");
}
