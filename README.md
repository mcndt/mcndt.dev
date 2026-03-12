# mcndt.dev

[![statichost.eu status](https://builder.statichost.eu/mcndt/status.svg)](https://builder.statichost.eu/mcndt/)

Personal blog and website at [mcndt.dev](https://www.mcndt.dev/).

Built with SvelteKit, Tailwind CSS, and mdsvex for markdown content rendering.

## Development

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

## Building

Create a production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Hosting

The site is statically generated using `@sveltejs/adapter-static` and hosted on [statichost.eu](https://www.statichost.eu/), an EU-sovereign hosting provider based in Sweden.

Deployment is automated: pushing to `main` triggers a build and deploy via a GitHub webhook. The build configuration is defined in `statichost.yml`.

DNS is managed through Cloudflare, pointing `mcndt.dev` and `www.mcndt.dev` to statichost. SSL certificates are auto-provisioned.
