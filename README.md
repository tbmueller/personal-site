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
