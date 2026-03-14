# mcndt.dev

Personal blog at [mcndt.dev](https://www.mcndt.dev/).

## Tech stack

- **Framework:** SvelteKit 1.x (Svelte 3, Vite 4)
- **Content:** Markdown processed by mdsvex (`.md`, `.svx`, `.svelte.md`)
- **Styling:** Tailwind CSS 3 + `@tailwindcss/typography` + SCSS
- **Adapter:** `@sveltejs/adapter-static` — fully prerendered static site
- **Hosting:** [statichost.eu](https://www.statichost.eu/) (EU-sovereign, Stockholm)
- **Package manager:** pnpm

## Project structure

```
content/posts/          — Blog post markdown files
content/posts/media/    — Post images (co-located by post)
content/posts/digest/   — Weekly digest posts (subfolder)
src/routes/             — SvelteKit pages and API routes
src/routes/posts/[slug] — Dynamic post pages
src/lib/components/     — Shared Svelte components
src/lib/types/          — TypeScript types
src/styles/             — Additional CSS
static/                 — Static assets (fonts, images, resume)
plans/                  — Gitignored implementation plans for multi-session work
```

## Content pipeline

- Posts live in `content/posts/` as markdown files with YAML frontmatter.
- The **filename** (without extension) becomes the URL slug via `slugFromPath()` in `src/lib/util.ts`.
- Posts are discovered at build time via `import.meta.glob('/content/posts/**/*.{md,svx,svelte.md}')`.
- mdsvex compiles markdown to Svelte components, with rehype-slug and rehype-autolink-headings.
- Relative images are handled by `mdsvex-relative-images`.
- Posts with `draft: true` are excluded from listings and return 404.

## Frontmatter schema (existing posts)

```yaml
title: string       # Display title
date: string        # YYYY-MM-DD
draft: boolean      # true = hidden
summary: string     # For RSS and post listings
tags: string[]      # e.g. ["Book Review", "Productivity"]
```

All fields are required. The `PostMetadata` type is in `src/lib/types/PostMetadata.ts`.

## Key files

- `svelte.config.js` — SvelteKit config, adapter-static, mdsvex preprocessor
- `mdsvex.config.js` — Markdown extensions, remark/rehype plugins
- `tailwind.config.cjs` — Theme colors, typography config
- `src/lib/util.ts` — `slugFromPath()` helper
- `src/routes/posts/[slug]/+page.ts` — Post loader (glob import + slug matching)
- `src/routes/posts/index.json/+server.ts` — JSON API listing all published posts
- `src/routes/rss.xml/+server.ts` — RSS feed generation
- `statichost.yml` — Build config for statichost.eu

## Deployment

Push to `main` triggers a build via GitHub webhook → statichost.eu. The build runs `pnpm install && pnpm build`, outputs to `build/`.

## Development

```bash
pnpm install
pnpm dev       # Dev server
pnpm build     # Production build
pnpm preview   # Preview production build
```

## Plans

Implementation plans for multi-session work are stored in `plans/` (gitignored). Read these files to rebuild context on ongoing work.
