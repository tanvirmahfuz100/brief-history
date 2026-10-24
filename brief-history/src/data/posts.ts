export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: 'how-to-use-the-archive',
    title: 'How to use the archive',
    date: '2026-10-24',
    excerpt:
      'Search by topic, filter by course and session, and read each paper with its provenance attached.',
    tags: ['Guide', 'Browse'],
    body: `
<p>The archive is built for one job: getting you to a past paper quickly, without a login and without a feed.</p>
<h2>Start with Browse</h2>
<p><a href="/brief-history/browse/">Browse</a> lists every paper. The filters run in your browser, so typing a topic such as “depreciation” or “bank reconciliation” narrows the list immediately. You can also filter by course, exam, session, and semester.</p>
<h2>Open a course page</h2>
<p>Each course page groups papers by session and exam. The course title comes from the 2022–23 syllabus where a match exists. If a paper was printed under an older title or code, the paper page keeps the printed title and explains the discrepancy in its provenance note.</p>
<h2>Read the paper page</h2>
<p>The paper page shows the questions first. Instructions, choice rules, OCR confidence, and source-file details sit inside a collapsed “Paper details and provenance” panel, so they do not interrupt reading.</p>
<h2>Use video lessons as a supplement</h2>
<p><a href="/brief-history/videos/">Video lessons</a> maps third-party YouTube lessons to syllabus topics. These are not university lectures. Coverage is partial and page-level; always check the lesson against your class materials.</p>
`,
  },
  {
    slug: 'what-the-archive-covers',
    title: 'What the archive covers',
    date: '2026-10-24',
    excerpt:
      'A quick map of the collection: which courses have papers, where the gaps are, and why some papers are marked unknown.',
    tags: ['Archive', 'Coverage'],
    body: `
<p>The collection is strongest in the first two years. First-year courses include multiple midterms, class tests, and finals; second-year coverage is thinner but growing. Third- and fourth-year courses have only a few papers each.</p>
<h2>Courses and codes</h2>
<p>Course titles and semesters follow the 2022–23 AIS BBA curriculum. Some papers were printed before a course was renamed or before a code changed. In those cases the archive keeps the printed paper but files it under the closest current code.</p>
<h2>The 2204 collision</h2>
<p>AIS 2204 is Marketing in the current syllabus. Older papers titled “Laws and Theories of Banking and Bank Accounts” also carry the printed code 2204. They are kept on a separate <a href="/brief-history/courses/legacy-banking-2204/">legacy course page</a> so that Marketing papers are not mixed with them.</p>
<h2>Unknown papers</h2>
<p>A small number of pages have no readable course title or code. They remain in the archive under “Unidentified paper” rather than being guessed into a course. If you recognise one, use the <a href="/brief-history/report/">report page</a>.</p>
`,
  },
  {
    slug: 'ocr-and-provenance',
    title: 'How OCR and provenance work',
    date: '2026-10-24',
    excerpt:
      'Every paper records where it came from, how confident the transcription is, and what was uncertain.',
    tags: ['OCR', 'Method'],
    body: `
<p>Most papers were transcribed from photographed or scanned question papers. The archive stores the source file, page numbers, and an OCR confidence level with each paper.</p>
<h2>What the confidence level means</h2>
<ul>
  <li><strong>High</strong> — the text is clear; marks and question numbers are readable.</li>
  <li><strong>Medium</strong> — the structure is usable, but some marks or table cells may be inferred.</li>
  <li><strong>Low</strong> — the page is damaged or partly unreadable; check the original before relying on details.</li>
</ul>
<p>Transcription notes record specific problems: split tables, uncertain question numbers, missing marks, or text that could be read two ways. These notes are visible on the paper page inside the provenance panel.</p>
<h2>Corrections</h2>
<p>If a question, mark, or course code is wrong, send the paper title and the correction through the <a href="/brief-history/report/">report page</a>. Include the source file name if you have it.</p>
`,
  },
];

export const latestPosts = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
export const postBySlug = (slug: string) => POSTS.find((post) => post.slug === slug);
