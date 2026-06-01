export interface Project {
  name: string;
  description: string;
  url?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    name: "Project Alpha",
    description: "A short description of what this project does and why it matters.",
    url: "https://github.com",
    tags: ["TypeScript", "React"],
  },
  {
    name: "Project Beta",
    description: "Another thing you built — keep it punchy, one or two sentences.",
    tags: ["Python", "API"],
  },
  {
    name: "Project Gamma",
    description: "Something interesting you shipped or contributed to.",
    url: "https://github.com",
    tags: ["Go", "CLI"],
  },
];
