import { llmsTxt } from "@/lib/markdown";

// Built once at build time: the content only changes when the code does.
export const dynamic = "force-static";

// https://llmstxt.org/: a Markdown index of the site for AI agents.
export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
