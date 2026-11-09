import { describe, expect, it } from "vitest";
import { GET as llmsRoute } from "@/app/llms.txt/route";
import { GET as indexMdRoute } from "@/app/index.md/route";
import { llmsTxt, indexMd } from "@/lib/markdown";

describe("agent routes", () => {
  it("/llms.txt serves the index as Markdown", async () => {
    const res = llmsRoute();
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await res.text()).toBe(llmsTxt());
  });

  it("/index.md serves the page and points back to /llms.txt", async () => {
    const res = indexMdRoute();
    expect(res.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(res.headers.get("link")).toBe('</llms.txt>; rel="describedby"; type="text/markdown"');
    expect(await res.text()).toBe(indexMd());
  });
});

describe("site metadata", () => {
  it("uses tristamueller.com for absolute URLs and the canonical link", async () => {
    const { metadata } = await import("@/app/layout");
    expect(String(metadata.metadataBase)).toBe("https://tristamueller.com/");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.openGraph).toMatchObject({ type: "website", url: "/", siteName: "Trista Mueller", title: "Trista Mueller" });
  });
});
