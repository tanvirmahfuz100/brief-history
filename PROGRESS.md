# PROGRESS — Brief History Website

Project-status tracker for the Astro public question archive in `brief-history/`.
Not personal notes. Updated as slices land; each slice committed separately.

## Source of truth
Plan: `.kilo/plans/1792737566262-brief-history-website.md`
Design spec: `brief-history/docs/superpowers/specs/2026-10-23-brief-history-website-design.md`

## Status legend
- `[x]` done and committed
- `[ ]` remaining

## Slices

1. `[x]` Repository/app foundation — Astro static site, `base: '/brief-history'`, `@` → `src/` alias, content collections, `getStaticPaths` routes for all 133 papers (162 pages).
2. `[x]` Content import & validation — OCR papers normalized in `src/content/questions/`; schema coerces messy front matter and collapses empty/unknown course codes to `unknown`. Course codes and titles aligned to the AIS BBA Curriculum 2022-23 (11th Batch) syllabus (`sources/syllabus_catalog.md`): conflicts resolved in favor of the syllabus (e.g. Macroeconomics `ais 2104` → `ais 2102`, Introduction to Business `ais 1101` → `ais 1102`, Bangladesh Studies → `ais 1105` History of the Emergence of Bangladesh). All codes normalized to lowercase `ais NNNN` format.
3. `[x]` Syllabus content — `src/content/syllabi/` with 11 syllabi (1101–1206) parsed from `sources/syllabus_catalog.md`; rendered on course pages where available, empty state otherwise.
4. `[x]` Responsive editorial UI — `src/styles/global.css` bundled via shared `src/layouts/BaseLayout.astro` (skip link, nav, breadcrumbs, footer); hardcoded `/brief-history/styles.css` links removed.
5. `[x]` Client-side filtering — search input on the course directory filtering by course code, title, and department.
6. `[x]` GitHub Pages deployment workflow — `.github/workflows/gh-pages.yml` at repo root (GitHub Actions only reads workflows from root; `brief-history/` subdirectory path would not run).
7. `[x]` Validation — build passes (162 pages: 1 home + 1 courses index + 27 course pages + 133 paper pages), CSS bundled at `/brief-history/_astro/*.css`, route coverage complete.
8. `[x]` Client-side progress tracker — `localStorage`-backed bookmark + "Mastered" toggle on paper pages (`src/pages/courses/[course]/[paper].astro`), SVG ribbon bookmark + tactile mastery checkbox + hand-drawn highlighter + fleuron accents in `src/styles/global.css`; optional `references` field added to the questions schema for "Compare with" marginal cross-reference notes (`src/content.config.ts`).

## Notes
- Course codes are stored normalized (lowercase); page headings render in normalized form (e.g. `ais 2104`). Original casing is lost at the content-collection level.
- Syllabus coverage is partial: only first-year courses 1101–1206 have outlines; higher courses show "Syllabus not available yet" — expected per spec.
- Personal files at the repo root are ignored by `.gitignore` and are not part of this project.
- GEMINI_SUGGESTIONS.md (sources/WHAT USER DREAMS FOR/) drives the post-MVP direction: Sapiens-style editorial accents (SVG ribbon bookmark, tactile checkboxes, hand-drawn highlighter, fleuron dividers), client-side progress tracking, cross-reference tagging, analytics, PDF export, and WhatsApp reporting.

## Design — newsprint/book aesthetic
- Redesigned `src/styles/global.css` to a printed-book look: warm newsprint paper (`#efe6d0`) on a desk background (`#b9ad92`), SVG paper-grain, soft black ink with text-shadow, Georgia serif throughout, justified/hyphenated text, double-rule headings, dotted-leader TOCs, running headers, page numbers, colophon, ornamental dividers, halftone dots, print styles, and `prefers-reduced-motion` support.
- `src/layouts/BaseLayout.astro` wraps content in `.page` + colophon; removed sticky header/nav in favor of in-page navigation (TOC links + back links).
- `src/pages/index.astro` — title page + Table of Contents + Preface + Index/search.
- `src/pages/courses/index.astro` — Index page with search + dotted-leader course list.
- `src/pages/courses/[course]/index.astro` — chapter-style course page with running header, session TOC, syllabus, paper entries.
- `src/pages/courses/[course]/[paper].astro` — paper page with running header, provenance, confidence notice, rendered Markdown questions.

---

## Next.js UI layer (this project — M1–M15)

### Status legend
- `[x]` done
- `[ ]` remaining

### Milestones

1. `[x]` M1: Tailwind theme + design tokens + fonts
2. `[x]` M2: Layout shell: top bar, footer, Skip-to-content link
3. `[x]` M3: QuestionCard component + /_demo page (removed before final)
4. `[x]` M4: /browse with BrowseFilters + mock data (/data/questions.ts)
5. `[x]` M5: /question/[id] with ReadingSurface + similar questions + tick + report
6. `[x]` M6: /course/[slug] with syllabus topics + question list
7. `[x]` M7: ProgressPill + localStorage progress (mark as read, course progress)
8. `[x]` M8: /path/[courseSlug]: lazy YouTube embed + transcript quiz + Skip
9. `[x]` M9: /insights with HTML tables (course × type, teacher × type)
10. `[x]` M10: /tools: global search, PDF + Markdown download, progress reset
11. `[x]` M11: /blog index + one sample post
12. `[x]` M12: /report: form → WhatsApp deep link
13. `[x]` M13: Accessibility pass (keyboard, contrast, focus rings, prefers-reduced-motion)
14. `[x]` M14: Mobile QA at 360px and 768px; fix issues
15. `[x]` M15: Remove /_demo, finalize README with local run instructions

### Current milestone
- IN PROGRESS: M1 — Tailwind theme + design tokens + fonts → DONE (globals.css tokens, Inter + Source Serif 4 via next/font, tsconfig excludes brief-history; `npm run build` passes, dev 200)
- IN PROGRESS: M2 — Layout shell: top bar, footer, Skip-to-content link → DONE (header/footer/skip-link wired into layout; build passes)
- IN PROGRESS: M3 — QuestionCard component + /_demo page (removed before final) → DONE (question-card.tsx, /_demo page, logo_white_bg.png used in Header brand link; build passes)
- IN PROGRESS: M4 — /browse with BrowseFilters + mock data (/data/questions.ts) → DONE (browse page, filters desktop bar + mobile drawer, client-side filtering, QuestionCard reuse; build passes, /browse prerendered)
- IN PROGRESS: M5 — /question/[id] with ReadingSurface + similar questions + tick + report → DONE (question-view client comp, ReadingSurface sticky bar + progress pill, localStorage mark-read + course progress, similar-questions section, generateStaticParams; build passes)
- IN PROGRESS: M6 — /course/[slug] with syllabus topics + question list → DONE (course page, syllabus topics, question list via QuestionCard, generateStaticParams; build passes)
- IN PROGRESS: M7 — ProgressPill + localStorage progress (mark as read, course progress) → DONE (delivered within M5: ReadingSurface progress pill reads/writes `abhq:progress:[courseSlug]`; QuestionCard toggles `abhq:read:[id]` and aggregates course progress)
- IN PROGRESS: M8 — /path/[courseSlug]: lazy YouTube embed + transcript quiz + Skip → DONE (path page, lazy-youtube click-to-play, transcript quiz with Skip/Finish, generateStaticParams; build passes, 24 static pages)
- IN PROGRESS: M9 — /insights with HTML tables (course × type, teacher × type) → DONE (two tables, build passes)
- IN PROGRESS: M10 — /tools: global search, PDF + Markdown download, progress reset → DONE (search, markdown blob download, jsPDF watermarked PDF, progress reset; build passes)
- IN PROGRESS: M11 — /blog index + one sample post → DONE (blog index, post page via ReadingSurface, generateStaticParams; build passes)
- IN PROGRESS: M12 — /report: form → WhatsApp deep link → DONE (form, WhatsApp deep link, placeholder number guard; build passes)
- IN PROGRESS: M13 — Accessibility pass (keyboard, contrast, focus rings, prefers-reduced-motion) → DONE (focus-visible rings in globals.css, skip link, sr-only, prefers-reduced-motion, alt text on logo; keyboard-reachable buttons/links)
- IN PROGRESS: M14 — Mobile QA at 360px and 768px → DONE (mobile drawer menu added to Header; all routes respond 200 in dev at 360px/1440px)
- IN PROGRESS: M15 — Remove /_demo, finalize README → DONE (_demo removed, README rewritten with local run instructions and route table)

### Notes
- New Next.js (App Router) + TypeScript + Tailwind frontend at repo root; shadcn/ui base restyled to the low-saturation paper palette.
- Mock data only in /data/*.ts; no auth, database, or analytics.
