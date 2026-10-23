export type QuestionType = "Theory" | "Numerical" | "MCQ" | "Short";

export interface Question {
  id: string;
  text: string;
  tags: string[];
  exam: string;
  batch: string;
  teacher: string;
  verified?: boolean;
  similarIds?: string[];
  courseCode: string;
  courseTitle: string;
  questionType: QuestionType;
}

export const QUESTIONS: Question[] = [
  {
    id: "q-101",
    text:
      "Define 'depreciation' and explain the straight-line method of depreciation with a suitable example.",
    tags: ["Theory", "5 marks"],
    exam: "Midterm 2023",
    batch: "15th Batch",
    teacher: "Prof. R. Islam",
    verified: true,
    similarIds: ["q-103"],
    courseCode: "ais 2104",
    courseTitle: "Cost Accounting",
    questionType: "Theory",
  },
  {
    id: "q-102",
    text:
      "A company purchased machinery for BDT 500,000 with an estimated useful life of 5 years and a residual value of BDT 50,000. Calculate the annual depreciation charge under the straight-line method.",
    tags: ["Numerical", "10 marks"],
    exam: "Semester Final 2022",
    batch: "14th Batch",
    teacher: "Prof. S. Chowdhury",
    courseCode: "ais 2104",
    courseTitle: "Cost Accounting",
    questionType: "Numerical",
  },
  {
    id: "q-103",
    text:
      "Distinguish between financial accounting and management accounting with reference to their objectives, users, and reports.",
    tags: ["Theory", "7 marks"],
    exam: "Midterm 2023",
    batch: "15th Batch",
    teacher: "Prof. R. Islam",
    courseCode: "ais 1101",
    courseTitle: "Principles of Accounting",
    questionType: "Theory",
  },
  {
    id: "q-104",
    text:
      "What is a trial balance? Explain its objectives and limitations.",
    tags: ["Theory", "5 marks"],
    exam: "Midterm 2022",
    batch: "16th Batch",
    teacher: "Prof. K. Rahman",
    courseCode: "ais 1101",
    courseTitle: "Principles of Accounting",
    questionType: "Theory",
  },
  {
    id: "q-105",
    text:
      "Prepare a bank reconciliation statement as on 31 December 2023 from the following particulars.",
    tags: ["Numerical", "10 marks"],
    exam: "Semester Final 2023",
    batch: "15th Batch",
    teacher: "Prof. S. Chowdhury",
    verified: true,
    courseCode: "ais 1102",
    courseTitle: "Financial Accounting",
    questionType: "Numerical",
  },
  {
    id: "q-106",
    text:
      "Explain the accounting equation and illustrate its effect with five business transactions.",
    tags: ["Theory", "5 marks"],
    exam: "Midterm 2023",
    batch: "16th Batch",
    teacher: "Prof. K. Rahman",
    courseCode: "ais 1101",
    courseTitle: "Principles of Accounting",
    questionType: "Theory",
  },
  {
    id: "q-107",
    text:
      "What are the qualitative characteristics of useful financial information according to the conceptual framework?",
    tags: ["Theory", "7 marks"],
    exam: "Semester Final 2022",
    batch: "14th Batch",
    teacher: "Prof. S. Chowdhury",
    courseCode: "ais 1102",
    courseTitle: "Financial Accounting",
    questionType: "Theory",
  },
  {
    id: "q-108",
    text:
      "From the following trial balance, prepare the Trading and Profit & Loss Account for the year ended 31 March 2024.",
    tags: ["Numerical", "15 marks"],
    exam: "Semester Final 2023",
    batch: "15th Batch",
    teacher: "Prof. R. Islam",
    similarIds: ["q-105"],
    courseCode: "ais 1102",
    courseTitle: "Financial Accounting",
    questionType: "Numerical",
  },
  {
    id: "q-109",
    text:
      "Define internal control. State its objectives and limitations in an auditing context.",
    tags: ["Theory", "7 marks"],
    exam: "Midterm 2022",
    batch: "16th Batch",
    teacher: "Prof. K. Rahman",
    courseCode: "ais 3205",
    courseTitle: "Auditing",
    questionType: "Theory",
  },
  {
    id: "q-110",
    text:
      "Explain the vouching process for cash sales and cash purchases.",
    tags: ["Theory", "5 marks"],
    exam: "Midterm 2023",
    batch: "15th Batch",
    teacher: "Prof. R. Islam",
    verified: true,
    courseCode: "ais 3205",
    courseTitle: "Auditing",
    questionType: "Theory",
  },
] as const;

export const FILTER_OPTIONS = {
  courses: Array.from(
    new Set(QUESTIONS.map((q) => `${q.courseCode} — ${q.courseTitle}`))
  ),
  exams: Array.from(new Set(QUESTIONS.map((q) => q.exam))),
  batches: Array.from(new Set(QUESTIONS.map((q) => q.batch))),
  teachers: Array.from(new Set(QUESTIONS.map((q) => q.teacher))),
};

export const SYLLABI: Record<string, { title: string; topics: string[] }> = {
  "ais 1101": {
    title: "Principles of Accounting",
    topics: [
      "Accounting equation and double-entry system",
      "Journal, ledger, and trial balance",
      "Bank reconciliation",
      "Depreciation methods",
      "Final accounts of sole proprietorship",
    ],
  },
  "ais 1102": {
    title: "Financial Accounting",
    topics: [
      "Qualitative characteristics of financial information",
      "Preparation of financial statements",
      "Company accounts and share capital",
      "Debentures and bonds",
      "Cash flow statement",
    ],
  },
  "ais 2104": {
    title: "Cost Accounting",
    topics: [
      "Cost classification and cost sheet",
      "Material, labour, and overhead costing",
      "Job costing and batch costing",
      "Process costing",
      "Operating costing",
    ],
  },
  "ais 3205": {
    title: "Auditing",
    topics: [
      "Audit planning and audit programme",
      "Internal control and internal check",
      "Vouching and verification",
      "Company audit and auditor's report",
      "Audit of banking companies",
    ],
  },
} as const;
