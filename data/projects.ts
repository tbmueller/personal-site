export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  name: string;
  description: string;
  links: ProjectLink[];
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Welcome Mat",
    description:
      "For when friends and family fly in to visit: it follows their flights and tells you when to leave for the airport.",
    links: [
      { label: "Live site", href: "https://www.welcome-mat.app" },
      { label: "Code", href: "https://github.com/tbmueller/welcome-mat" },
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Upstash"],
  },
  {
    name: "splitwise-mcp",
    description:
      "An MCP server that lets Claude and other AI assistants read and manage Splitwise expenses, groups and friends. It runs locally, so nothing leaves your machine except calls to Splitwise.",
    links: [{ label: "Code", href: "https://github.com/tbmueller/splitwise-mcp" }],
    tags: ["TypeScript", "MCP", "Node.js"],
  },
  {
    name: "Drill Room",
    description:
      "A local judge for timed coding practice: problem on the left, editor on the right, Run against samples and Submit against hidden tests, in TypeScript, Python or Ruby. Problems come from packs you write.",
    links: [{ label: "Code", href: "https://github.com/tbmueller/drill-room" }],
    tags: ["JavaScript", "Node.js", "Python", "Ruby"],
  },
  {
    name: "This site",
    description:
      "You're looking at it. Yes, the personal site is listed under its own Projects tab. It needed a fourth card.",
    links: [{ label: "Code", href: "https://github.com/tbmueller/personal-site" }],
    tags: ["Next.js", "TypeScript", "Radix Themes"],
  },
];
