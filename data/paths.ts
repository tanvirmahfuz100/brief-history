export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number; // index of correct option
}

export interface Path {
  slug: string;
  courseCode: string;
  courseTitle: string;
  videoId: string;
  videoTitle: string;
  quiz: QuizQuestion[];
}

export const PATHS: Path[] = [
  {
    slug: "ais-1101",
    courseCode: "ais 1101",
    courseTitle: "Principles of Accounting",
    videoId: "d7w8F6yKZvQ",
    videoTitle: "Accounting Equation & Double-Entry System",
    quiz: [
      {
        id: "pq-1",
        question:
          "Which side of the ledger records an increase in an asset account?",
        options: ["Debit", "Credit", "Neither", "Both"],
        answer: 0,
      },
      {
        id: "pq-2",
        question:
          "The accounting equation is Assets = Liabilities + ?",
        options: ["Revenue", "Expense", "Owner's Equity", "Drawings"],
        answer: 2,
      },
    ],
  },
  {
    slug: "ais-2104",
    courseCode: "ais 2104",
    courseTitle: "Cost Accounting",
    videoId: "mXq2Pb8Lr1s",
    videoTitle: "Straight-Line Depreciation Method",
    quiz: [
      {
        id: "pq-3",
        question:
          "Under the straight-line method, depreciation expense is the same each year.",
        options: ["True", "False"],
        answer: 0,
      },
      {
        id: "pq-4",
        question:
          "Residual value is subtracted from cost before dividing by useful life.",
        options: ["True", "False"],
        answer: 0,
      },
    ],
  },
];
