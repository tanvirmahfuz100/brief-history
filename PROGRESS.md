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
2. `[x]` Content import & validation — OCR papers normalized in `src/content/questions/`; schema coerces messy front matter and collapses empty/unknown course codes to `unknown`.
3. `[x]` Syllabus content — `src/content/syllabi/` with 11 syllabi (1101–1206) parsed from `sources/syllabus_catalog.md`; rendered on course pages where available, empty state otherwise.
4. `[x]` Responsive editorial UI — `src/styles/global.css` bundled via shared `src/layouts/BaseLayout.astro` (skip link, nav, breadcrumbs, footer); hardcoded `/brief-history/styles.css` links removed.
5. `[x]` Client-side filtering — search input on the course directory filtering by course code, title, and department.
6. `[x]` GitHub Pages deployment workflow — `.github/workflows/gh-pages.yml` at repo root (GitHub Actions only reads workflows from root; `brief-history/` subdirectory path would not run).
7. `[x]` Validation — build passes (162 pages: 1 home + 1 courses index + 27 course pages + 133 paper pages), CSS bundled at `/brief-history/_astro/*.css`, route coverage complete.

## Notes
- Course codes are stored normalized (lowercase); page headings render in normalized form (e.g. `ais 2104`). Original casing is lost at the content-collection level.
- Syllabus coverage is partial: only first-year courses 1101–1206 have outlines; higher courses show "Syllabus not available yet" — expected per spec.
- Personal files at the repo root are ignored by `.gitignore` and are not part of this project.

## Design — newsprint/book aesthetic
- Redesigned `src/styles/global.css` to a printed-book look: warm newsprint paper (`#efe6d0`) on a desk background (`#b9ad92`), SVG paper-grain, soft black ink with text-shadow, Georgia serif throughout, justified/hyphenated text, double-rule headings, dotted-leader TOCs, running headers, page numbers, colophon, ornamental dividers, halftone dots, print styles, and `prefers-reduced-motion` support.
- `src/layouts/BaseLayout.astro` wraps content in `.page` + colophon; removed sticky header/nav in favor of in-page navigation (TOC links + back links).
- `src/pages/index.astro` — title page + Table of Contents + Preface + Index/search.
- `src/pages/courses/index.astro` — Index page with search + dotted-leader course list.
- `src/pages/courses/[course]/index.astro` — chapter-style course page with running header, session TOC, syllabus, paper entries.
- `src/pages/courses/[course]/[paper].astro` — paper page with running header, provenance, confidence notice, rendered Markdown questions.
