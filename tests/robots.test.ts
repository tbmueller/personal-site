import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The rules that apply to every crawler: the "User-Agent: *" group.
const robots = readFileSync(join(__dirname, "..", "public", "robots.txt"), "utf8");
const rules = robots
  .split("\n")
  .map((l) => l.replace(/#.*/, "").trim())
  .filter(Boolean);

describe("robots.txt", () => {
  it("has one group, for every crawler", () => {
    expect(rules[0]).toBe("User-Agent: *");
    expect(rules.filter((r) => /^user-agent:/i.test(r))).toHaveLength(1);
  });

  it("allows search and live AI answers but not training (Cloudflare Content Signals)", () => {
    expect(rules).toContain("Content-Signal: search=yes, ai-input=yes, ai-train=no");
  });

  it("says the same in the IETF AI Preferences syntax", () => {
    expect(rules).toContain("Content-Usage: train-ai=n");
  });

  it("doesn't block anything", () => {
    expect(rules).toContain("Allow: /");
    expect(rules.some((r) => /^disallow:/i.test(r))).toBe(false);
  });
});
