# OCR transcription specification

You are transcribing scanned university exam papers into Markdown. Accuracy matters more
than speed. Work page by page, in order. Never summarize, paraphrase, or "fix" the English.
Reproduce exactly what is printed.

## Images and request limits

- Read ONE image per tool call, at most 2 images per assistant message.
- Never re-read an image you have already transcribed. Do not attach a PDF.
- Images live under `/media/tanvir/Knowledge1/Questions/.work/ocr/<source_id>/page-NN.jpg`.

## Output location

Write files ONLY under `/media/tanvir/Knowledge1/Questions/ocr/incoming/`.
Do not modify any other file.

File name:
- Single-paper source: `<source_id>.md`
- Multi-paper source: `<source_id>-p<first>-<last>__<course-slug>__<session>__<exam>.md`
  (e.g. `...-p07-12__cost-accounting__2019-20__mid.md`)

`course-slug`: lowercase, hyphens. `session`: `2019-20` or `unknown`. `exam`: `mid`,
`final`, `mid-term`, `quiz`, `unknown`.

## Front matter (exact keys, in this order)

```
---
source_id: pdf-ais-10-accounting-principles
source_file: "AIS-10 (Accounting Principles).pdf"
pages: [1, 2, 3, 4]
university: University of Barishal
department: Department of Accounting & Information Systems
course: Principles of Accounting
course_code: AIS 1102
year_semester: 1st Year 1st Semester
exam: Semester Final
session: 2021-2022
time: "3 Hours"
full_marks: 60
instructions: "Answer any four of the following questions."
choice: "4 of 6"
examiner_marks: ""
faculty_source: ""
ocr_confidence: high
notes: ""
---
```

- `full_marks`: integer or null. `choice`: e.g. `"4 of 6"` or `""`.
- Never guess session, code, or marks. Use `unknown` / null / `""`.
- `ocr_confidence`: high (all legible), medium (a few uncertain words/numbers or
  low-res), low (significant uncertainty/cropping).
- `notes`: scan quirks, missing pages, duplicates, marks inconsistencies.

## Body

```
# <Course> — <Exam> (<Session>)

<!-- page 1 -->
## Question 1 — [3+3+6+3]
**a)** How will you define ...? [3]
**b)** What is ...? [3]
```

- Keep the paper's numbering (`## Question 1`).
- Keep original sub-labels (`**a)**`, `**(i)**`, `**i.**`) and per-part marks `[05]`.
- Question heading carries the printed total or bracket, e.g. `— [15]`, `— [3+3+6+3]`.
- Keep "Answer any four" as a blockquote exactly as printed and in front matter.
- Preserve "Set: A/B", page numbers only if part of question text.
- Ignore CamScanner logos, watermarks, ticks, circles, underlines, roll numbers, and
  handwriting that is not a question. Capture examiner initials/name in `examiner_marks`.

Math:
- LaTeX for all formulas/equations: `$C = 100 + 0.75Y$`, `$$\text{GNP}=C+I+G+(X-M)$$`.
- Currency escaped: `\$220 billion`. Percentages/subscripts/Greek: LaTeX.
- Plain arithmetic may stay plain.

Tables:
- Reproduce every table/ledger/trial balance/statement/data grid as GitHub Markdown.
- All columns, headers, units, totals; empty cells allowed.
- If split across pages, transcribe once and add `<!-- table continued from page N -->`.
- Never drop wide columns.

Figures:
- `> **Figure (page N):** <factual description of axes, curves, labels, values>.`
- No invented values.

Illegible:
- `[illegible]`; if a numeral: `[illegible numeral]`. Set confidence medium/low.
- Never fill in a plausible value.

Multi-paper sources:
- A new paper begins at a fresh header (course name/code + exam title, Time/Full Marks).
- One MD file per paper, with its own `pages`.
- Mid-term and final are separate. If a page ends paper A and starts paper B, split and
  note it. If two logical pages are side by side in one scan, transcribe both in order
  and add `<!-- two-up scan: left/right -->`.

## Integrity checks (mandatory)

1. Count questions against the highest printed number.
2. If full marks and per-question marks are visible, check the sum for the required
   number of answers; note inconsistencies, never alter marks.
3. Ensure every sub-part (a, b, c, i, ii) is present.
4. Ensure each table has the right number of columns.
5. Re-read once for `[illegible]` spots.
6. Set `ocr_confidence`.

## Final report

Return concisely: files written (path, paper identity, pages); papers discovered with page
ranges; obvious duplicates; unresolved illegible items; missing pages/anomalies.
