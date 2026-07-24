# Haifan Yin — MCSP Lab Site

Academic research group site for Prof. Haifan Yin (尹海帆), Mobile Communications and
Signal Processing Laboratory, School of Electronic Information and Communications,
Huazhong University of Science and Technology.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Project structure

```
src/
├── app/                  # Routes (home, publications, research, team, gallery)
├── components/
│   ├── home/ team/ research/ publications/ gallery/   # Feature components
│   ├── layout/           # AppShell, Navigation, Footer, PageHero, etc.
│   └── ui/               # shadcn/ui primitives (only what's used)
├── lib/
│   ├── data/             # Static site content (publications, team, research topics)
│   │   ├── professor.ts  publications.ts  team.ts  research-topics.ts
│   │   ├── helpers.ts    # Cross-cutting data queries (papers by topic, etc.)
│   │   └── index.ts      # Barrel for data + helpers
│   ├── publication.ts    # Publication display helpers (BibTeX, venue badges, stats)
│   ├── constants.ts      # Animation variants, page metadata, gradient maps
│   └── utils.ts          # Generic helpers (cn only)
├── hooks/                # useAnimatedCounter, useTypewriter, use-mobile, use-toast
└── types/                # Type definitions (Publication, Student, Teacher, …)
```

### Import conventions

- **Data and data helpers** → `@/lib/data` (barrel)
- **Publication display helpers** → `@/lib/publication`
- **Generic utils** (`cn`) → `@/lib/utils`
- **Animation/page config** → `@/lib/constants`
- **Types** → `@/types`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to ./out
npm run lint
```

## Editing content

All site content is plain TypeScript data — no database.

- **Publications** — `src/lib/data/publications.ts` (journal/conference papers, patents)
- **Team members** — `src/lib/data/team.ts` (teachers, current and graduated students)
- **Research topics** — `src/lib/data/research-topics.ts`
- **Professor profile** — `src/lib/data/professor.ts`

Avatars and gallery images live under `public/avatars/` and `public/gallery/`.

## Notes

- This repository also contains unrelated scaffolding under `examples/`, `skills/`,
  `mini-services/`, and `.zscripts/`. These are not part of the site and are excluded
  from the TypeScript build (see `tsconfig.json`).
- The site is a static export; the previous Prisma/database layer has been removed.