import { describe, expect, it } from "vitest";
import { personJsonLd, jsonLdScript } from "@/lib/jsonLd";
import { profile } from "@/data/profile";

describe("Person JSON-LD", () => {
  it("is a schema.org Person built from the profile", () => {
    expect(personJsonLd["@context"]).toBe("https://schema.org");
    expect(personJsonLd["@type"]).toBe("Person");
    expect(personJsonLd.name).toBe(profile.name);
    expect(personJsonLd.worksFor).toEqual({ "@type": "Organization", name: profile.employer });
    expect(personJsonLd.sameAs).toEqual([profile.links.github, profile.links.linkedin]);
  });

  it("serializes so it can't close its <script> tag early", () => {
    const out = jsonLdScript({ note: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out)).toEqual({ note: "</script><script>alert(1)</script>" });
  });
});
