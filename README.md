# Haifan Yin — MCSP Lab Site

Academic research group website for Prof. Haifan Yin (尹海帆), Mobile Communications and Signal Processing Laboratory, School of Electronic Information and Communications, Huazhong University of Science and Technology.

The site is a static Next.js application. Its content is maintained as TypeScript data and local public assets; no database or server-side API is required.

## Tech stack

- Next.js 16 with the App Router
- React 19 and strict TypeScript
- Tailwind CSS v4
- shadcn/ui and Radix UI primitives
- Framer Motion for animations
- Sharp for image processing
- System font stacks for sans-serif and monospace text; builds do not depend on Google Fonts
- Static export for deployment to a static host

## Requirements

- Node.js 20.9.0 or newer
- npm

The repository includes `package-lock.json`, so use npm for dependency installation.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Windows development-server note

The current `dev` script pipes output through `tee` so that it can also write `dev.log`. Plain Windows PowerShell does not provide `tee` as a command, so use one of these alternatives if `npm run dev` reports that `tee` cannot be found:

```bash
# Start the server without writing a log file
npx next dev -p 3000
```

```powershell
# PowerShell equivalent that also writes dev.log
npx next dev -p 3000 2>&1 | Tee-Object dev.log
```

## Available commands

| Command | Description |
| --- | --- |
| `npm install` | Install the locked dependencies. |
| `npm run dev` | Start the Next.js development server on port 3000. See the Windows note above if `tee` is unavailable. |
| `npm run lint` | Run ESLint across the project. |
| `npm run build` | Build the static export into `out/`. |
| `npm run start` | Serve the built `out/` directory locally. Run `npm run build` first. |

There is currently no automated test runner or coverage threshold. Before submitting a change, run:

```bash
npm run lint
npm run build
```

For UI changes, smoke-test `/`, `/research`, `/publications`, `/team`, and `/gallery` in both responsive and dark-mode states when relevant.

## Site routes

| Route | Purpose |
| --- | --- |
| `/` | Professor profile, lab introduction, and external links. |
| `/research` | Research areas and topics. |
| `/publications` | Publications and related publication statistics/details. |
| `/team` | Faculty members, current students, and alumni. |
| `/gallery` | Lab and research gallery. |

## Project structure

```text
src/
├── app/                         # App Router routes and global app files
│   ├── page.tsx                 # Home page
│   ├── research/                # Research route
│   ├── publications/            # Publications route
│   ├── team/                    # Team route
│   ├── gallery/                 # Gallery route
│   ├── layout.tsx               # Root layout and metadata
│   ├── globals.css              # Global styles and Tailwind layers
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Route error UI
│   └── not-found.tsx            # Not-found UI
├── components/
│   ├── home/                    # Home-page components
│   ├── research/                # Research components
│   ├── publications/            # Publication components
│   ├── team/                    # Team components
│   ├── gallery/                 # Gallery components
│   ├── layout/                  # App shell, navigation, footer, and page chrome
│   └── ui/                      # Shared UI primitives
├── lib/
│   ├── data/                    # Static content and data helpers
│   ├── constants.ts             # Shared page and animation configuration
│   └── utils.ts                 # Generic helpers, including cn()
├── hooks/                       # Reusable React hooks
└── types/                       # Shared TypeScript types
public/
├── avatars/                     # Team portraits
├── documents/                   # Downloadable documents
├── gallery/                     # Gallery media
├── research/                    # Research-related media
└── logos and profile assets     # Site and professor images
scripts/                         # Image-maintenance utilities
```

### Import conventions

- Static data and data helpers: `@/lib/data`
- Generic helpers: `@/lib/utils`
- Constants and page configuration: `@/lib/constants`
- Shared types: `@/types`

## Editing content

All editable site content lives in `src/lib/data/`:

- `professor.ts` — professor profile, biography, contact details, and links
- `publications.ts` — journal papers, conference papers, patents, and related records
- `research-topics.ts` — research areas and topic descriptions
- `team.ts` — faculty, current students, and alumni
- `gallery.ts` — gallery entries and image references
- `helpers.ts` — shared data queries
- `bibtex.ts`, `citation-stats.ts`, `pub-stats.ts`, `highlight-badge.ts`, and `venue-badge.ts` — publication display and statistics helpers

When adding or changing a media asset:

1. Place it in the appropriate `public/` subdirectory.
2. Reference it with a site-relative path such as `/avatars/example-name.jpg`.
3. Update the corresponding TypeScript data entry.
4. Verify the asset loads on the relevant route and remains reasonably small.

For team avatars, use kebab-case filenames matching the `avatar` path in `src/lib/data/team.ts`. Prefer optimized JPEGs no larger than 896×1194 pixels and 200 KB when practical.

## Static export and deployment

`next.config.ts` sets `output: 'export'`, so `npm run build` generates a standalone static site in `out/`. Next.js image optimization is disabled because the site is intended for static hosting.

To preview the generated site locally:

```bash
npm run build
npm run start
```

For a static hosting provider, use `npm run build` as the build command and publish the generated `out/` directory. Do not add server-only APIs, database dependencies, or other runtime features that require a Node.js server.

## Maintenance scripts

The `scripts/` directory contains Sharp-based gallery compression utilities:

- `scripts/compress.cjs`
- `scripts/compress-gallery.cjs`

These scripts are not exposed as npm commands and currently use the local project path in their configuration. Review the configured gallery path before running them in another environment, and inspect the resulting images before committing them.

## Contributing checklist

Before handing off a change:

```bash
npm run lint
npm run build
```

Also check the affected route at desktop and mobile widths, verify dark mode when applicable, and review new external links and media files before committing.
