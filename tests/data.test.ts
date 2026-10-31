import { describe, expect, it } from "vitest";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

describe("projects", () => {
  it("have unique names", () => {
    const names = projects.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it.each(projects.map((p) => [p.name, p]))("%s has a description, https links and tags", (_name, p) => {
    expect(p.description.trim().length).toBeGreaterThan(20);
    expect(p.links.length).toBeGreaterThan(0);
    for (const link of p.links) {
      expect(link.label.trim()).not.toBe("");
      expect(link.href).toMatch(/^https:\/\//);
    }
    expect(p.tags.length).toBeGreaterThan(0);
  });

  it("leaves out unfinished work", () => {
    expect(projects.some((p) => /trading/i.test(p.name) || p.links.some((l) => /trading-cards/.test(l.href)))).toBe(false);
  });

  it("include the site itself", () => {
    expect(projects.some((p) => p.links.some((l) => l.href.endsWith("/personal-site")))).toBe(true);
  });
});

describe("profile", () => {
  it("links to the right accounts", () => {
    expect(profile.links.github).toBe("https://github.com/tbmueller");
    expect(profile.links.linkedin).toBe("https://www.linkedin.com/in/tristamueller");
  });

  it("has both About sections", () => {
    expect(profile.work.length).toBeGreaterThan(0);
    expect(profile.outside).toMatch(/San Francisco/);
  });
});
