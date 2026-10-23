export const BLOGS = [
  {
    id: 'blog-001',
    title: 'How to use this archive',
    excerpt: 'A quick guide to finding past questions, filtering by course, and tracking your progress across semesters.',
    date: '2026-10-20',
    tags: ['guide', 'how-to'],
    pinned: true,
    url: '/brief-history/blog/how-to-use/',
  },
  {
    id: 'blog-002',
    title: 'How to study with past questions',
    excerpt: 'Strategies for using previous exam papers effectively — spotting repeated topics, timing practice, and self-grading.',
    date: '2026-10-15',
    tags: ['study-tips', 'preparation'],
    pinned: false,
    url: '/brief-history/blog/study-with-past-questions/',
  },
  {
    id: 'blog-003',
    title: 'AIS 3204 Organizational Behavior — recurring themes',
    excerpt: 'Analysis of question patterns across batches: leadership, motivation, and organizational culture appear most frequently.',
    date: '2026-10-10',
    tags: ['ais 3204', 'organizational-behavior'],
    pinned: false,
    url: '/brief-history/blog/ais-3204-themes/',
  },
  {
    id: 'blog-004',
    title: 'Semester-wise question distribution',
    excerpt: 'Which semesters have the most papers, and which courses are the most frequently examined.',
    date: '2026-10-05',
    tags: ['analytics', 'distribution'],
    pinned: false,
    url: '/brief-history/blog/semester-distribution/',
  },
];

export function pinnedBlogs() {
  return BLOGS.filter(b => b.pinned);
}

export function latestBlogs(limit = 3) {
  return [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}
