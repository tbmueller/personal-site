import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { Theme } from "@radix-ui/themes";
import axe from "axe-core";
import Home from "@/app/page";
import { Projects } from "@/components/Projects";
import { PhotoCarousel } from "@/components/PhotoCarousel";

afterEach(cleanup);

// What app/layout.tsx provides around every page.
beforeAll(async () => {
  const { metadata } = await import("@/app/layout");
  document.documentElement.lang = "en";
  document.title = String(metadata.title);
});

// axe in jsdom checks structure (landmarks, names, alt text, nesting, ARIA).
// Colour contrast needs real rendering, so it's checked in a browser instead.
// It runs on the whole document so page-level rules (one <main>, everything
// inside a landmark) apply too.
async function violations() {
  const result = await axe.run(document, { rules: { "color-contrast": { enabled: false } } });
  return result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
}

describe("accessibility (axe)", () => {
  it("home page has no violations", async () => {
    render(<Theme><Home /></Theme>);
    expect(await violations()).toEqual([]);
  });

  it("Projects tab has no violations", async () => {
    render(<Theme><main><h1>Projects</h1><Projects /></main></Theme>);
    expect(await violations()).toEqual([]);
  });

  it("travel carousel with photos has no violations", async () => {
    const host = "https://abc123.public.blob.vercel-storage.com/travel";
    render(
      <Theme>
        <main>
          <h1>About</h1>
          <PhotoCarousel
            photos={[
              { src: `${host}/a.jpg`, width: 2400, height: 1600, alt: "Tram on a steep street", caption: "Lisbon" },
              { src: `${host}/b.jpg`, width: 2400, height: 1600, alt: "Kayak on a fjord" },
            ]}
          />
        </main>
      </Theme>,
    );
    expect(await violations()).toEqual([]);
  });
});
