import { describe, expect, it } from "vitest";
import { llmsTxt, indexMd } from "@/lib/markdown";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const sections = (md: string) => [...md.matchAll(/^## (.+)$/gm)].map((m) => m[1]);

describe("llms.txt (llmstxt.org format)", () => {
  const txt = llmsTxt();
  const lines = txt.split("\n");

  it("starts with the H1 name and a blockquote summary", () => {
    expect(lines[0]).toBe(`# ${profile.name}`);
    expect(lines.find((l) => l.startsWith(">"))).toContain(profile.headline);
    expect(txt.match(/^# /gm)).toHaveLength(1);
  });

  it("lists file links as '- [name](url): notes'", () => {
    const items = lines.filter((l) => l.startsWith("- "));
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) expect(item).toMatch(/^- \[[^\]]+\]\([^)\s]+\)(: .+)?$/);
  });

  it("points to the Markdown copy of the page", () => {
    expect(txt).toContain("](/index.md)");
  });

  it("lists every project", () => {
    for (const p of projects) expect(txt).toContain(`- [${p.name}](`);
  });

  it("puts skippable links in a final Optional section", () => {
    expect(sections(txt).at(-1)).toBe("Optional");
  });
});

describe("index.md", () => {
  const md = indexMd();

  it("has the whole About section", () => {
    for (const paragraph of profile.work) expect(md).toContain(paragraph);
    expect(md).toContain(profile.outside);
    expect(md).toContain(profile.skills.join(", "));
  });

  it("has every project with its links and tags", () => {
    for (const p of projects) {
      expect(md).toContain(`### ${p.name}`);
      expect(md).toContain(p.description);
      for (const l of p.links) expect(md).toContain(`[${l.label}](${l.href})`);
      expect(md).toContain(p.tags.join(", "));
    }
  });

  it("is ordered About, Projects, Elsewhere", () => {
    expect(sections(md)).toEqual(["About", "Projects", "Elsewhere"]);
  });
});
