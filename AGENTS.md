# Brief History Project — Root Context & Path Guidance

## Two distinct halves of this repo

### 1. Source / research material (repo root)
These are the raw inputs — past-question PDFs, OCR extractions, source CSVs, scripts, and the syllabus PDF. They are NOT the website.

| Path | Purpose |
|------|---------|
| `sources/syllabus_catalog.md` | Extracted AIS BBA curriculum (1101–1206 detailed outlines + full course map). Only first-year syllabi exist here; higher courses have no syllabus content. |
| `sources/extracted_pages.csv` | Page-level extraction inventory from `scripts/extract_sources.py`. |
| `sources/allocations.csv` | Question-to-topic allocation data. |
| `sources/group_posts.md` | Group-post derived notes. |
| `faculty/faculty.md` | Partial faculty registry — treat as incomplete/unresolved (e.g. AIS 3205 is `ND`). Not authoritative. |
| `scripts/extract_sources.py` | PDF/JPG/HTML image extraction pipeline → `sources/extracted_pages.csv`. |
| `scripts/extract_syllabus.py` | Syllabus PDF text extraction → `sources/syllabus_catalog.md`. |
| `*.pdf`, `*.zip` | Raw question-paper sources (do not commit; ignored by `.gitignore`). |
| `WHAT USER DREAMS FOR/`, `AGENT.md`, `OUR_GOAL.md`, `HELP_ME_CROSSCHECK.md`, `DEEPSEEK-SUGGESTED.txt` | Personal working notes — ignored by `.gitignore`, not part of the website. |
| `analysis/` | Charts + data for question/teacher analysis (future feature per DREAMS.md). |
| `.work/` | Scratch OCR working directory. Ignored. |

### 2. The website (`brief-history/`)
Self-contained Astro static site, deployed to GitHub Pages at `base: '/brief-history'`.

| Path | Purpose |
|------|---------|
| `brief-history/src/content/questions/` | 133 normalized question-paper Markdown files (the website content). |
| `brief-history/src/content/syllabi/` | 11 syllabi (1101–1206) parsed from `sources/syllabus_catalog.md`. |
| `brief-history/src/content.config.ts` | Content collections schema (`questions`, `syllabi`). |
| `brief-history/src/lib/slug.ts` | Shared slug utilities (`courseSlug`, `paperSlug`, `UNKNOWN_SLUG`). |
| `brief-history/src/styles/global.css` | Bundled editorial CSS (paper surface, dark ink, accent). |
| `brief-history/src/layouts/BaseLayout.astro` | Shared layout importing `global.css` once; skip link, nav, footer. |
| `brief-history/src/pages/` | `index.astro`, `courses/index.astro`, `courses/[course]/index.astro`, `courses/[course]/[paper].astro`. |
| `brief-history/astro.config.mjs` | `base: '/brief-history'`, static output, `@` → `src/` alias. |
| `brief-history/package.json` | `dev`/`build`/`preview` scripts; Astro dependency. |
| `brief-history/dist/` | Build output (162 pages). Ignored by `brief-history/.gitignore`. |
| `.github/workflows/gh-pages.yml` | Build + deploy to GitHub Pages (root repo). |

## Conventions for future agents

- **Never edit files in `brief-history/dist/`** — it is generated output. Run `npm run build` inside `brief-history/` to regenerate.
- **Never commit personal root files** (`AGENT.md`, `OUR_GOAL.md`, PDFs, zips, `WHAT USER DREAMS FOR/`) — `.gitignore` covers them.
- **Course codes in content are normalized lowercase** (`ais 2104`). Original casing is lost at the collection level; headings render normalized.
- **Syllabus coverage is partial** — only 1101–1206. Other courses intentionally show "Syllabus not available yet."
- **Build/verify:** `cd brief-history && npm run build` → expect 162 pages. Dev: `astro dev --background` at `http://localhost:4321/brief-history/`.
- **Commit discipline:** one logical change per commit; create root `.gitignore` before any root commit.
- **Status tracking:** `PROGRESS.md` (root) + `brief-history/AGENTS.md` (dev notes). Keep `PROGRESS.md` in sync with slices.

## Quick commands

```
cd brief-history            # enter website
npm run build               # static build → dist/
astro dev --background      # dev server at /brief-history/
npm run preview             # preview production build
```
