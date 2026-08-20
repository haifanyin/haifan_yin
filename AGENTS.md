# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` contains the App Router routes for home, research, publications, team, and gallery, plus the root layout, loading, error, and not-found UI.
- `src/components/` contains feature components plus shared `layout` and `ui` components.
- `src/lib/data/` contains static content and data helpers; `src/lib/constants.ts` and `src/lib/utils.ts` contain shared configuration and generic helpers.
- `src/hooks/` and `src/types/` contain reusable hooks and shared TypeScript types.
- `public/` stores avatars, gallery and research media, downloadable documents, and site branding assets; maintenance scripts live in `scripts/`.

## Build, Test, and Development Commands

```bash
npm install       # Install locked dependencies; Node.js >= 20.9.0 is required
npm run dev       # Start the site at http://localhost:3000
npm run lint      # Run ESLint with Next.js and TypeScript rules
npm run build     # Create the static export in ./out
npm run start     # Serve the built ./out directory locally
```

The `dev` npm script pipes output through `tee` to create `dev.log`. If the command fails on Windows because `tee` is unavailable, use `npx next dev -p 3000` directly, or use PowerShell's `Tee-Object` when a log file is needed:

```powershell
npx next dev -p 3000 2>&1 | Tee-Object dev.log
```

Run `npm run lint` and `npm run build` before submitting; use the development server to inspect UI changes. The site uses system font stacks, so builds do not require Google Fonts network access.

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, and the existing quote conventions. Name React components in PascalCase, hooks with the `use` prefix, and data/constants in camelCase. Use the `@/*` alias for `src/*`, keep route directories lowercase, and follow the existing Tailwind CSS v4 and shadcn/ui patterns. ESLint is the quality check.

## Testing Guidelines

No test runner or coverage threshold is configured. For UI or content changes, smoke-test `/`, `/research`, `/publications`, `/team`, and `/gallery`, including responsive and dark-mode states when relevant.

## Content, Assets, and Architecture

Update content in the corresponding files under `src/lib/data/`:

- `professor.ts` — professor profile and contact details
- `publications.ts` — publication records
- `research-topics.ts` — research topics
- `team.ts` — faculty, students, and alumni
- `gallery.ts` — gallery entries

Publication display and statistics helpers include `bibtex.ts`, `citation-stats.ts`, `pub-stats.ts`, `highlight-badge.ts`, and `venue-badge.ts`. Place media in the appropriate `public/` subdirectory and reference it with site-relative paths such as `/avatars/example-name.jpg`.

`next.config.ts` sets `output: 'export'`, so the site builds to `out/` and must remain compatible with static hosting. Images use `unoptimized: true`. Avoid server-only APIs, database dependencies, and other runtime features that require a Node.js server.

## Image Asset Processing

For new avatars, place source files in `public/avatars/` and use kebab-case names matching `src/lib/data/team.ts` (for example, `chulin-sheng.jpg`). Convert `.png` or `.jpeg` inputs to JPEG with the installed `sharp` package, preserve the portrait aspect ratio, and target a maximum of 896×1194 pixels at quality 88. Verify each output is below 200 KB, visually inspect it on the Team page, update the `avatar` path, and remove the original source only after the JPG loads correctly.

Gallery compression follows separate limits from the avatar workflow: `scripts/compress.cjs` and `scripts/compress-gallery.cjs` target a maximum width of 1920 pixels and 500 KB. These scripts are not npm commands and currently contain the local project path; inspect and update that path before running them in another environment.

## Commit & Pull Request Guidelines

Recent commits use concise prefixes such as `feat:`, `fix:`, and `refactor:`. Keep subjects specific and action-oriented. Pull requests should explain the change, list validation commands, link issues when applicable, include screenshots for visual changes, and call out asset updates.

## Security & Configuration Tips

Do not commit secrets, credentials, or private data. Review external links and large media additions before committing.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
