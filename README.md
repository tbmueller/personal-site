# personal-site

Trista Mueller's personal site, live at [tristamueller.com](https://tristamueller.com): an About tab and a Projects tab.

Built with Next.js 16 and Radix Themes.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
npm test        # unit tests (Vitest); npm run test:watch to keep them running
```

CI (`.github/workflows/ci.yml`) runs lint, type-check, tests and build on every push to `main`.

- **Projects** live in `data/projects.ts`. Each project has a name, a description, links and tags.
- **About** text is in `components/Hero.tsx`.
- **Travel photos** live in Vercel Blob and are listed in `data/photos.ts`. The carousel on the About tab only appears once that list has photos. To add one:

  ```bash
  BLOB_READ_WRITE_TOKEN=... npm run photos:upload -- path/to/photo.jpg
  ```

  The script rotates the photo upright, fits it within 2400px and re-encodes it as JPEG. That strips GPS location, camera details and timestamps; it checks they're gone and refuses to upload if not. Then it uploads the photo and prints the entry to paste into `data/photos.ts`, where you fill in the alt text and caption.
- **Light/dark mode** follows the system until you use the toggle in the header, then remembers your choice ([next-themes](https://github.com/pacocoursey/next-themes)). The accent is teal in light mode and violet in dark mode.
- **Icons and link preview:** `app/icon.svg` is the favicon: a "T" drawn with two bars, teal, and violet in dark mode. `app/apple-icon.tsx` and `app/opengraph-image.tsx` generate the iOS home-screen icon and the 1200×630 link-preview image at build time, from `lib/brand.ts` and `data/profile.ts`.
- **Photo:** `public/me.jpg` (path in `data/profile.ts`), with its metadata stripped. It's also the `image` in the JSON-LD.

## How it works

All the content lives in `data/`. The page, the files for AI agents and the link-preview image are built from it, so they can't drift apart. Travel photos live in Vercel Blob and only appear once `data/photos.ts` lists some.

```mermaid
flowchart LR
  Data["data/<br/>profile.ts, projects.ts, photos.ts<br/>(the only place content lives)"]
  Page["/<br/>About and Projects tabs"]
  Agents["/llms.txt, /index.md,<br/>Person JSON-LD"]
  MCP["/api/mcp<br/>MCP server, read-only tools"]
  OG["/opengraph-image<br/>link preview"]
  Upload["npm run photos:upload<br/>strips GPS and camera data"]
  Blob[("Vercel Blob<br/>travel photos")]
  Robots["public/robots.txt<br/>AI preferences"]

  Data -- "build time" --> Page
  Data -- "build time" --> Agents
  Data -- "build time" --> OG
  Data -- "per request" --> MCP
  Upload --> Blob
  Blob -- "carousel images" --> Page
  Robots ~~~ Agents

  classDef std fill:#56B4E9,stroke:#0072B2,color:#1a1a1a
  classDef agent fill:#009E73,stroke:#006B4E,color:#1a1a1a
  classDef hi fill:#E69F00,stroke:#a37100,color:#1a1a1a
  class Data,Page std
  class Agents,Robots,MCP agent
  class Upload,Blob,OG hi
```

## For AI agents

The site describes itself to AI agents as well as to people:

- **`/llms.txt`**: a Markdown index of the site, following [llmstxt.org](https://llmstxt.org/).
- **`/index.md`**: the whole page as clean Markdown. The HTML page links to it with `rel="alternate" type="text/markdown"`, and points to `/llms.txt` with `rel="describedby"`.
- **`/robots.txt`**: says search and live AI answers are welcome but model training isn't. It uses both Cloudflare's [Content Signals](https://contentsignals.org/) (`Content-Signal: search=yes, ai-input=yes, ai-train=no`) and the IETF AI Preferences draft (`Content-Usage: train-ai=n`).
- **schema.org `Person` JSON-LD** on the page.
- **`/api/mcp`**: the site as an [MCP](https://modelcontextprotocol.io) server, over Streamable HTTP. It has three read-only tools (`get_about`, `list_projects`, `get_project`) and the whole site as the resource `site://index.md`. It's stateless, and it serves the 2026-07-28 spec plus the 2025-era fallback, via Vercel's [mcp-handler](https://github.com/vercel/mcp-handler). To connect from Claude Code:

  ```bash
  claude mcp add --transport http trista https://tristamueller.com/api/mcp
  ```


About and Projects text lives once, in `data/profile.ts` and `data/projects.ts`. The page, the Markdown files and the JSON-LD are all built from those two files, so they can't drift apart. Links in `/llms.txt` are relative to the site; metadata, the canonical URL and the JSON-LD use `lib/site.ts`.
