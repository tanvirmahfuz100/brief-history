# A Brief History of Past Questions

Public, login-free archive of past exam questions for the Department of
Accounting & Information Systems, University of Barishal.

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- shadcn/ui primitives (restyled to the paper palette)
- Mock data only (`/data/*.ts`); no auth, database, or analytics
- `localStorage` for reading progress only

## Design

Printed reference-book aesthetic (spirit of "Sapiens"): warm off-white
background (`#FAF7F2`), near-black ink (`#1C1A17`), serif for reading
surfaces (Source Serif 4), sans-serif for UI chrome (Inter), low-saturation
palette with a single accent (`#8A5A2B`), no drop shadows or carousels.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000/
npm run build      # static production build
npm run start      # serve the production build
npm run lint       # ESLint
```

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home — giant search + filters |
| `/browse` | Archive list with BrowseFilters (course, exam, batch, teacher) |
| `/course/[slug]` | Course detail: syllabus topics + question list |
| `/question/[id]` | Single question: text, tags, similar questions, tick, report, progress |
| `/path/[courseSlug]` | Learning path: lazy YouTube embed + transcript quiz + Skip |
| `/insights` | Simple HTML tables: course × type, teacher × type |
| `/tools` | Global search, Markdown/PDF download, progress reset |
| `/blog` | Blog index + post |
| `/report` | Form → WhatsApp deep link |

## Data

Mock data lives in `/data/*.ts` (`questions.ts`, `paths.ts`, `blog.ts`).
No backend endpoints are used in this phase.

## Notes

- `brief-history/` (the older Astro site) is a separate project and is not touched by this frontend.
- `/_demo` was removed before final.
- All downloads are watermarked with the site name.

## License

Public repository. No secrets in code.
