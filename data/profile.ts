// Who's on the page. The About tab, /llms.txt, /index.md and the JSON-LD
// all read from here, so they can't drift apart.
export const profile = {
  name: "Trista Mueller",
  headline: "Senior software engineer specializing in billing, payments and monetization.",
  jobTitle: "Senior Software Engineer",
  employer: "Handshake",
  location: "San Francisco",
  work: [
    "I'm a senior software engineer with over ten years of experience, and these days I specialize in billing, payments and monetization. At Handshake I own billing for the employer business. I led the move from slot-based subscriptions to per-job pricing, and cut billing incidents by 80% along the way.",
    "Before that I built a design system at Patch and led onboarding work at Wealthsimple that brought in CAD$600M in deposits. I'm at home across the stack, from Rails and Postgres to TypeScript and React.",
    "I use AI throughout my workday. I have it turn long threads into decision logs and ticket updates, so the source of truth stays current without hours of manual upkeep. I'm careful with tokens: I give models only the context they need, which keeps results focused and costs down. I also treat code health as agent-readiness: clear data models and less dead code make a codebase easier for both people and AI agents to work in. On my own time I build for AI too, like an MCP server for Splitwise and this site, which agents can read and query directly.",
  ],
  skills: ["Billing & payments", "Rails", "TypeScript", "React", "Design systems"],
  outside:
    "I live in San Francisco. Before that, I lived in Toronto. I enjoy kayaking, fiber crafts, hiking, traveling, and low-stakes board games like Taboo and Telestrations.",
  links: {
    github: "https://github.com/tbmueller",
    linkedin: "https://www.linkedin.com/in/tristamueller",
  },
};
