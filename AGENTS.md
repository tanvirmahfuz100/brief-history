# Brief History Project — Root Context & Path Guidance

## Two distinct halves of this repo

### 1. Source / research material (repo root)
These are the raw inputs — past-question PDFs, OCR extractions, source CSVs, scripts, and the syllabus PDF. They are NOT the website.

| Path | Purpose |
|------|---------|
| `sources/` | All source / research material — raw PDFs, zips, course image folders, OCR pipeline, scripts, extracted CSVs, personal notes. NOT the website. |
| `sources/raw/` | Raw question-paper PDFs and zips (do not commit; ignored by `.gitignore`). |
| `sources/syllabus_catalog.md` | Extracted AIS BBA curriculum (1101–1206 detailed outlines + full course map). Only first-year syllabi exist here; higher courses have no syllabus content. |
| `sources/extracted_pages.csv` | Page-level extraction inventory from `scripts/extract_sources.py`. |
| `sources/allocations.csv` | Question-to-topic allocation data. |
| `sources/group_posts.md` | Group-post derived notes. |
| `sources/faculty/faculty.md` | Partial faculty registry — treat as incomplete/unresolved (e.g. AIS 3205 is `ND`). Not authoritative. |
| `sources/scripts/extract_sources.py` | PDF/JPG/HTML image extraction pipeline → `sources/extracted_pages.csv`. |
| `sources/scripts/extract_syllabus.py` | Syllabus PDF text extraction → `sources/syllabus_catalog.md`. |
| `sources/WHAT USER DREAMS FOR/`, `sources/AGENT.md`, `sources/OUR_GOAL.md`, `sources/HELP_ME_CROSSCHECK.md`, `sources/DEEPSEEK-SUGGESTED.txt` | Personal working notes — ignored by `.gitignore`, not part of the website. |
| `sources/analysis/` | Charts + data for question/teacher analysis (future feature per DREAMS.md). |
| `sources/.work/` | Scratch OCR working directory. Ignored. |
| `sources/ocr/` | OCR transcriptions: `incoming/` (canonical), `by-course/` (symlinks by course code), `deepseek/`. |

### 2. The website (`brief-history/`)
Self-contained Astro static site, deployed to GitHub Pages at `base: '/brief-history'`.

| Path | Purpose |
|------|---------|
| `brief-history/src/content/questions/` | 117 normalized, de-duplicated question-paper Markdown files (the website content). |
| `brief-history/src/content/syllabi/` | 11 syllabi (1101–1206) parsed from `sources/syllabus_catalog.md`. |
| `brief-history/src/content.config.ts` | Content collections schema (`questions`, `syllabi`); optional `course_slug` for legacy codes. |
| `brief-history/src/lib/slug.ts` | Shared slug utilities (`courseSlug`, `paperSlug`, `UNKNOWN_SLUG`). |
| `brief-history/src/data/courses.ts` | Canonical 45-course catalog plus legacy banking and MBA 5105. |
| `brief-history/src/lib/catalog.ts` | Canonical lookups, normalization, titles, paper/course hrefs, semester groups. |
| `brief-history/src/data/videos.generated.ts` | 650 YouTube lessons across 45 courses, generated from the course guide. |
| `brief-history/scripts/` | Content/syllabus normalizers, video importer, and built-link checker. |
| `brief-history/src/styles/global.css` | Bundled editorial CSS (paper surface, dark ink, accent). |
| `brief-history/src/layouts/BaseLayout.astro` | Shared layout importing `global.css` once; skip link, nav, footer. |
| `brief-history/src/pages/` | Home, Browse, Courses, paper pages, Videos, Blog, Tools, Report. |
| `brief-history/astro.config.mjs` | `base: '/brief-history'`, static output, `@` → `src/` alias. |
| `brief-history/package.json` | `dev`/`build`/`preview` scripts; Astro dependency. |
| `brief-history/dist/` | Build output (193 pages). Ignored by `brief-history/.gitignore`. |
| `.github/workflows/gh-pages.yml` | Build + deploy to GitHub Pages (root repo). |

## Conventions for future agents

- **Never edit files in `brief-history/dist/`** — it is generated output. Run `npm run build` inside `brief-history/` to regenerate.
- **Never commit personal root files** (`sources/AGENT.md`, `sources/OUR_GOAL.md`, PDFs, zips, `sources/WHAT USER DREAMS FOR/`) — `.gitignore` covers them.
- **Course codes in content are normalized lowercase** (`ais 2104`). Original casing is lost at the collection level; headings render normalized.
- **Syllabus coverage is partial** — only 1101–1206. Other courses intentionally show "Syllabus not available yet."
- **Build/verify:** `cd brief-history && npm run build` → expect 193 pages, then `npm run check:links`. Use Node >= 22.23.4 (Node 24 works). Dev: `astro dev --background` at `http://localhost:4321/brief-history/`.
- **Commit discipline:** one logical change per commit; create root `.gitignore` before any root commit.
- **Status tracking:** `PROGRESS.md` (root) + `brief-history/AGENTS.md` (dev notes). Keep `PROGRESS.md` in sync with slices.

## Quick commands

```
cd brief-history            # enter website
npm run build               # static build → dist/ (193 pages)
npm run check:links         # verify internal links in dist/
astro dev --background      # dev server at /brief-history/
npm run preview             # preview production build
```
