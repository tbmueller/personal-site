import { indexMd } from "@/lib/markdown";

// Built once at build time: the content only changes when the code does.
export const dynamic = "force-static";

// The whole page as clean Markdown (llms.txt's per-page Markdown convention).
export function GET() {
  return new Response(indexMd(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: '</llms.txt>; rel="describedby"; type="text/markdown"',
    },
  });
}
