// @vitest-environment node
// (Image rendering needs real Node buffers, which jsdom swaps out.)
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TEAL, VIOLET } from "@/lib/brand";
import { profile } from "@/data/profile";
import OpengraphImage, * as og from "@/app/opengraph-image";
import AppleIcon, * as apple from "@/app/apple-icon";

const pngSignature = [0x89, 0x50, 0x4e, 0x47];

describe("favicon", () => {
  const svg = readFileSync(join(__dirname, "..", "app", "icon.svg"), "utf8");

  it("is teal, and violet in dark mode, like the site's accent", () => {
    expect(svg).toContain(TEAL);
    expect(svg).toMatch(new RegExp(`@media \\(prefers-color-scheme: dark\\)\\{[^}]*\\{fill:${VIOLET}`));
  });

  it("draws the T with shapes, not text, so it doesn't depend on fonts", () => {
    expect(svg).not.toContain("<text");
  });
});

describe("link preview image", () => {
  it("is the standard 1200x630 PNG, with alt text from the profile", () => {
    expect(og.size).toEqual({ width: 1200, height: 630 });
    expect(og.contentType).toBe("image/png");
    expect(og.alt).toBe(`${profile.name}: ${profile.headline}`);
  });

  it("renders a PNG", async () => {
    const bytes = new Uint8Array(await OpengraphImage().arrayBuffer());
    expect([...bytes.slice(0, 4)]).toEqual(pngSignature);
  });
});

describe("iOS home-screen icon", () => {
  it("is a 180x180 PNG", async () => {
    expect(apple.size).toEqual({ width: 180, height: 180 });
    const bytes = new Uint8Array(await AppleIcon().arrayBuffer());
    expect([...bytes.slice(0, 4)]).toEqual(pngSignature);
  });
});
