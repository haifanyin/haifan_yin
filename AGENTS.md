# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` contains App Router routes for home, research, publications, team, and gallery.
- `src/components/` contains feature components plus shared `layout` and `ui` components.
- `src/lib/data/`, `src/hooks/`, and `src/types/` contain static content/helpers, hooks, and shared types.
- `public/` stores media and documents; maintenance scripts live in `scripts/`.

## Build, Test, and Development Commands

```bash
npm install       # Install locked dependencies
npm run dev       # Start the site at http://localhost:3000
npm run lint      # Run ESLint with Next.js and TypeScript rules
npm run build     # Create the static export in ./out
npm run start     # Serve the built ./out directory locally
```

Run `npm run lint` and `npm run build` before submitting; use `npm run dev` to inspect UI changes.

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, and the existing quote conventions. Name React components in PascalCase, hooks with the `use` prefix, and data/constants in camelCase. Use the `@/*` alias for `src/*`, keep route directories lowercase, and follow the existing Tailwind CSS v4 and shadcn/ui patterns. ESLint is the quality check.

## Testing Guidelines

No test runner or coverage threshold is configured. For UI or content changes, smoke-test `/`, `/research`, `/publications`, `/team`, and `/gallery`, including responsive and dark-mode states when relevant.

## Content, Assets, and Architecture

Update publications, team members, research topics, and professor details in `src/lib/data/`. Place media in the appropriate `public/` subdirectory and reference it with site-relative paths. The site is a static export; avoid server-only APIs and database dependencies.

## Image Asset Processing

For new avatars, place source files in `public/avatars/` and use kebab-case names matching `src/lib/data/team.ts` (for example, `chulin-sheng.jpg`). Convert `.png` or `.jpeg` inputs to JPEG with the installed `sharp` package, preserve the portrait aspect ratio, and target a maximum of 896×1194 pixels at quality 88. Verify each output is below 200 KB, visually inspect it on the Team page, update the `avatar` path, and remove the original source only after the JPG loads correctly.

## Commit & Pull Request Guidelines

Recent commits use concise prefixes such as `feat:`, `fix:`, and `refactor:`. Keep subjects specific and action-oriented. Pull requests should explain the change, list validation commands, link issues when applicable, include screenshots for visual changes, and call out asset updates.

## Security & Configuration Tips

Do not commit secrets, credentials, or private data. Review external links and large media additions before committing.
