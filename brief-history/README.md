# Brief History — past questions archive

Static Astro site for the Department of Accounting & Information Systems, University of Barishal. Deployed under the `/brief-history` base path on GitHub Pages.

## Run locally

Use Node >= 22.23.4 (Node 24 works).

```sh
npm install
npm run dev        # http://localhost:4321/brief-history/
npm run build      # static output in dist/
npm run preview    # preview the build
```

## Verify

```sh
npm run build
npm run check:links     # checks every internal href/src in dist/
npm run check:videos    # verifies the generated video data is current
```

## Content workflow

```sh
npm run normalize:content   # normalize paper front matter and de-duplicate
npm run normalize:syllabi   # normalize first-year syllabi
npm run import:videos       # regenerate src/data/videos.generated.ts from sources/ais_bba_youtube_course_guide.md
```

Normalizers are idempotent and support `--dry-run`.

## Structure

- `src/content/questions/` — 117 normalized paper Markdown files
- `src/content/syllabi/` — 11 first-year syllabi
- `src/data/courses.ts` — canonical course catalog (plus legacy banking 2204)
- `src/lib/catalog.ts` — titles, codes, semesters, hrefs, normalization
- `src/data/videos.generated.ts` — 650 YouTube lessons across 45 courses
- `src/pages/` — Home, Browse, Courses, paper pages, Videos, Blog, Tools, Report
- `scripts/` — content/syllabus normalizers, video importer, link checker
