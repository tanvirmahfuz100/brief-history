export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-read-a-past-question-paper",
    title: "How to read a past question paper",
    date: "2026-10-20",
    excerpt:
      "A short guide on approaching past exam questions: what to look for, how to spot repeated topics, and how to use the verification tick.",
    body:
      "# How to read a past question paper\n\nPast questions are one of the most reliable ways to prepare for an exam. They reveal the examiner’s style, the weight given to each topic, and the kinds of answers that score full marks.\n\n## Start with the marking scheme\n\nBefore you attempt a question, check how many marks it carries. A 5-mark theory question needs a concise definition plus one or two points; a 15-mark numerical question needs full working and a clearly stated final answer.\n\n## Spot repeated topics\n\nCertain topics appear year after year—depreciation, bank reconciliation, trial balance, and final accounts in Cost and Financial Accounting. Prioritise these, but do not ignore the rest.\n\n## Use the verification tick\n\nQuestions marked with a tick have been cross-checked against the course syllabus. Start with verified questions, then work through the rest.\n\n## Simulate exam conditions\n\nSet a timer, put away your notes, and attempt the paper under exam conditions. Then review your answers against the marking points.\n\n## Keep a reading log\n\nMark each question you have read. The archive tracks your progress locally in your browser, so you can see at a glance how much of a course you have covered.",
  },
];
