# Repository Guidelines

## Project Structure & Module Organization

- `src/app/` contains App Router pages for the home page, research, publications, team, and gallery routes.
- `src/components/` is organized by feature (`home`, `research`, `publications`, `team`, `gallery`) plus shared `layout` and `ui` components.
- `src/lib/data/` holds the site’s static TypeScript content and query helpers; `src/hooks/` contains reusable hooks and `src/types/` shared types.
- `public/` stores avatars, research images, gallery media, and downloadable documents. Maintenance scripts live in `scripts/`.

## Build, Test, and Development Commands

```bash
npm install       # Install locked dependencies
npm run dev       # Start the site at http://localhost:3000
npm run lint      # Run ESLint with Next.js and TypeScript rules
npm run build     # Create the static export in ./out
npm run start     # Serve the built ./out directory locally
```

Run `npm run lint` and `npm run build` before submitting changes. Use `npm run dev` to inspect UI changes interactively.

## Coding Style & Naming Conventions

Use strict TypeScript with two-space indentation and the existing project’s quote/style conventions. Name React components in PascalCase, hooks with the `use` prefix, and data/constants in descriptive camelCase names. Use the `@/*` alias for imports from `src/*` (for example, `@/lib/data`). Keep route directories lowercase and group feature-specific components under the matching directory. Follow the existing Tailwind CSS v4 and shadcn/ui patterns; ESLint is the project’s formatting and quality check.

## Testing Guidelines

No test runner or coverage threshold is currently configured. For UI or content changes, manually smoke-test `/`, `/research`, `/publications`, `/team`, and `/gallery`, including responsive and dark-mode states when relevant. Confirm that `npm run lint` and `npm run build` pass.

## Content, Assets, and Architecture

Update publications, team members, research topics, and professor details in `src/lib/data/`. Place new media in the appropriate `public/` subdirectory and reference it with site-relative paths. The site uses `output: 'export'` for static hosting, so avoid server-only APIs and database dependencies.

## Commit & Pull Request Guidelines

Recent commits use concise Conventional Commit-style prefixes such as `feat:`, `fix:`, and `refactor:`. Keep subjects specific and action-oriented. Pull requests should explain the change, list validation commands, link related issues when applicable, and include screenshots for visual changes; call out any new or changed assets.

## Security & Configuration Tips

Do not commit secrets, credentials, or private data. Keep external profile and publication links intentional, and review large media additions before committing them.
