# Project notes for Claude Code

## What this is
Centralized VitePress site aggregating docs from multiple Unopim extension repos.
Deployed to GitHub Pages at docs-extensions.unopim.com.

## Architecture
- This repo holds the VitePress shell + theme + nav config.
- Each `docs/{project}/` folder is *populated at build time* by the GitHub Action
  pulling from a separate repo. Don't commit real content into those folders —
  only `index.md` and `sidebar.json` placeholders.
- Source of truth for project content = the project's own repo (`docs/` folder there).

## Conventions
- VitePress config in TypeScript (`docs/.vitepress/config.ts`).
- `package.json` has `"type": "module"` — VitePress is ESM-only.
- `base: '/'` because we're on a custom subdomain, not a project page.
- Internal markdown links inside a project use relative paths (`./installation`),
  never absolute (`/installation`), so they survive being nested under `/shopify/` etc.
- Per-project sidebar lives in `{project}/sidebar.json` in the *source* repo.
- Pin dependency versions, no `^` ranges in `package.json`.
- CNAME lives at `docs/public/CNAME` — VitePress copies `public/*` to `dist/` root.

## Don't
- Don't commit anything in `docs/{project}/` other than placeholders.
- Don't run git commands — the user manages git.
- Don't add a router, framework, or theme beyond default VitePress.
- Don't introduce a dead link in placeholder pages — VitePress fails the build.

## Pre-push checklist
- `npm run docs:dev` → all three project routes load.
- `npm run docs:build` → no errors; `dist/{shopify,magento2,odoo-erp}/index.html` exist.
- `dist/CNAME` present.
- Workflow YAML lints clean (actionlint or GitHub web editor).
