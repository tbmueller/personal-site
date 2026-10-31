# personal-site

Trista Mueller's personal site: an About tab and a Projects tab.

Built with Next.js 16 and Radix Themes.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

- **Projects** live in `data/projects.ts`. Each project has a name, a description, links and tags.
- **About** text is in `components/Hero.tsx`.
- **Photo:** the header has a placeholder circle. Put the image in `public/` and uncomment the `<Image>` in `app/page.tsx`.

## For AI agents

The site describes itself to AI agents as well as to people:

- **`/llms.txt`**: a Markdown index of the site, following [llmstxt.org](https://llmstxt.org/).
- **`/index.md`**: the whole page as clean Markdown. The HTML page links to it with `rel="alternate" type="text/markdown"`, and points to `/llms.txt` with `rel="describedby"`.
- **`/robots.txt`**: says search and live AI answers are welcome but model training isn't. It uses both Cloudflare's [Content Signals](https://contentsignals.org/) (`Content-Signal: search=yes, ai-input=yes, ai-train=no`) and the IETF AI Preferences draft (`Content-Usage: train-ai=n`).
- **schema.org `Person` JSON-LD** on the page.

About and Projects text lives once, in `data/profile.ts` and `data/projects.ts`. The page, the Markdown files and the JSON-LD are all built from those two files, so they can't drift apart. Links are relative until the site has a domain.
