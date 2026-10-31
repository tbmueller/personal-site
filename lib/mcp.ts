// The site as an MCP server: read-only tools an AI assistant can call to
// learn about Trista and her projects. Served at /api/mcp (app/api/mcp/route.ts).
// Everything comes from data/, the same source as the page and /llms.txt.
import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/server";
import { profile } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { indexMd } from "@/lib/markdown";

export const SERVER_INFO = { name: "trista-mueller", version: "1.0.0" };

export const INSTRUCTIONS =
  `Read-only information about ${profile.name}: ${profile.headline} ` +
  "Use get_about for her background, list_projects for her side projects, and get_project for one project's details. " +
  "The site://index.md resource is the whole site as Markdown.";

const readOnly = { readOnlyHint: true, idempotentHint: true, openWorldHint: false };

const linkSchema = z.object({ label: z.string(), href: z.string() });
const projectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  links: z.array(linkSchema),
});
const aboutSchema = z.object({
  name: z.string(),
  headline: z.string(),
  location: z.string(),
  work: z.array(z.string()),
  outside: z.string(),
  skills: z.array(z.string()),
  links: z.object({ github: z.string(), linkedin: z.string() }),
});

const toProject = (p: Project) => ({ name: p.name, description: p.description, tags: p.tags, links: p.links });
const projectText = (p: Project) =>
  `${p.name}: ${p.description}\nLinks: ${p.links.map((l) => `${l.label} ${l.href}`).join(", ")}\nTags: ${p.tags.join(", ")}`;

// Matches "Drill Room", "drill room", "drill-room" or "drill_room".
const key = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
export const findProject = (name: string) => projects.find((p) => key(p.name) === key(name));

export function registerSiteTools(server: McpServer) {
  server.registerTool(
    "get_about",
    {
      title: `About ${profile.name}`,
      description: `${profile.name}'s background: what she does at work, life outside work, skills, and where to find her.`,
      outputSchema: aboutSchema,
      annotations: readOnly,
    },
    async () => {
      const about = {
        name: profile.name,
        headline: profile.headline,
        location: profile.location,
        work: profile.work,
        outside: profile.outside,
        skills: profile.skills,
        links: profile.links,
      };
      const text = [
        `${profile.name}: ${profile.headline}`,
        "",
        ...profile.work,
        "",
        `Outside work: ${profile.outside}`,
        `Skills: ${profile.skills.join(", ")}`,
        `GitHub: ${profile.links.github} | LinkedIn: ${profile.links.linkedin}`,
      ].join("\n");
      return { content: [{ type: "text", text }], structuredContent: about };
    },
  );

  server.registerTool(
    "list_projects",
    {
      title: "List projects",
      description: `${profile.name}'s side projects, with descriptions, tags and links.`,
      outputSchema: z.object({ projects: z.array(projectSchema) }),
      annotations: readOnly,
    },
    async () => ({
      content: [{ type: "text", text: projects.map(projectText).join("\n\n") }],
      structuredContent: { projects: projects.map(toProject) },
    }),
  );

  server.registerTool(
    "get_project",
    {
      title: "Get a project",
      description: "One project's details, by name (case and punctuation don't matter).",
      inputSchema: z.object({ name: z.string().min(1).describe(`One of: ${projects.map((p) => p.name).join(", ")}`) }),
      outputSchema: projectSchema,
      annotations: readOnly,
    },
    async ({ name }) => {
      const project = findProject(name);
      if (!project) {
        return {
          isError: true,
          content: [{ type: "text", text: `No project called "${name}". Try one of: ${projects.map((p) => p.name).join(", ")}.` }],
        };
      }
      return { content: [{ type: "text", text: projectText(project) }], structuredContent: toProject(project) };
    },
  );

  server.registerResource(
    "site",
    "site://index.md",
    { title: `${profile.name}'s site`, description: "The whole site (About and Projects) as Markdown.", mimeType: "text/markdown" },
    async (uri) => ({ contents: [{ uri: uri.href, mimeType: "text/markdown", text: indexMd() }] }),
  );
}
