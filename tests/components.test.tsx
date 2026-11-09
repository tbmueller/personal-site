import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import Home from "@/app/page";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { personJsonLd } from "@/lib/jsonLd";

const renderThemed = (ui: ReactNode) => render(<Theme>{ui}</Theme>);
afterEach(cleanup);

describe("Hero (About tab)", () => {
  it("shows the At work and Outside work sections", () => {
    renderThemed(<Hero />);
    expect(screen.getByRole("heading", { name: "At work" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Outside work" })).toBeTruthy();
    for (const paragraph of profile.work) expect(screen.getByText(paragraph)).toBeTruthy();
    expect(screen.getByText(profile.outside)).toBeTruthy();
    for (const skill of profile.skills) expect(screen.getByText(skill)).toBeTruthy();
  });
});

describe("Projects tab", () => {
  it("shows a card per project, with links that open in a new tab", () => {
    renderThemed(<Projects />);
    for (const p of projects) {
      const heading = screen.getByRole("heading", { name: p.name });
      const card = heading.closest(".rt-Card") as HTMLElement;
      expect(within(card).getByText(p.description)).toBeTruthy();
      for (const l of p.links) {
        const link = within(card).getByRole("link", { name: l.label });
        expect(link.getAttribute("href")).toBe(l.href);
        expect(link.getAttribute("target")).toBe("_blank");
        expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      }
    }
  });

  it("doesn't repeat its own name as a heading", () => {
    renderThemed(<Projects />);
    expect(screen.queryByRole("heading", { name: "Projects" })).toBeNull();
  });
});

describe("Footer", () => {
  it("links to GitHub and LinkedIn", () => {
    renderThemed(<Footer />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([profile.links.github, profile.links.linkedin]);
  });
});

describe("Home page", () => {
  it("has the name, both tabs, and the Person JSON-LD", () => {
    const { container } = renderThemed(<Home />);
    expect(screen.getByRole("heading", { name: profile.name, level: 1 })).toBeTruthy();
    expect(screen.getByAltText(profile.name).getAttribute("src")).toContain("me.jpg");
    // Radix renders each tab label twice (one copy reserves the bold width), so match the start.
    expect(screen.getByRole("tab", { name: /^About/ }).getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("tab", { name: /^Projects/ })).toBeTruthy();
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(JSON.parse(script!.textContent!)).toEqual(personJsonLd);
  });
});
