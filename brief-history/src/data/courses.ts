export interface CourseInfo {
  code: string;
  title: string;
  semester: string;
}

export const COURSES: CourseInfo[] = [
  { code: 'ais 1101', title: 'Introduction to Financial Accounting', semester: '1st Year 1st Semester' },
  { code: 'ais 1102', title: 'Introduction to Business', semester: '1st Year 1st Semester' },
  { code: 'ais 1103', title: 'Business Communication and Report Writing', semester: '1st Year 1st Semester' },
  { code: 'ais 1104', title: 'Mathematics for Business Decisions-I', semester: '1st Year 1st Semester' },
  { code: 'ais 1105', title: 'History of the Emergence of Bangladesh', semester: '1st Year 1st Semester' },
  { code: 'ais 1201', title: 'Intermediate Accounting', semester: '1st Year 2nd Semester' },
  { code: 'ais 1202', title: 'Microeconomics', semester: '1st Year 2nd Semester' },
  { code: 'ais 1203', title: 'Management', semester: '1st Year 2nd Semester' },
  { code: 'ais 1204', title: 'Mathematics for Business Decisions-II', semester: '1st Year 2nd Semester' },
  { code: 'ais 1205', title: 'Computer Concepts and Application', semester: '1st Year 2nd Semester' },
  { code: 'ais 1206', title: 'Lab: Office Application', semester: '1st Year 2nd Semester' },
  { code: 'ais 2101', title: 'Advanced Financial Accounting-I', semester: '2nd Year 1st Semester' },
  { code: 'ais 2102', title: 'Macroeconomics', semester: '2nd Year 1st Semester' },
  { code: 'ais 2103', title: 'Business Statistics-I', semester: '2nd Year 1st Semester' },
  { code: 'ais 2104', title: 'Business Laws', semester: '2nd Year 1st Semester' },
  { code: 'ais 2105', title: 'Financial Management', semester: '2nd Year 1st Semester' },
  { code: 'ais 2201', title: 'Advanced Financial Accounting-II', semester: '2nd Year 2nd Semester' },
  { code: 'ais 2202', title: 'Corporate Laws and Secretarial Practices', semester: '2nd Year 2nd Semester' },
  { code: 'ais 2203', title: 'Business Statistics-II', semester: '2nd Year 2nd Semester' },
  { code: 'ais 2204', title: 'Marketing', semester: '2nd Year 2nd Semester' },
  { code: 'ais 2205', title: 'Income Tax: Laws and Practice', semester: '2nd Year 2nd Semester' },
  { code: 'ais 2206', title: 'Lab: Programming and Database Management', semester: '2nd Year 2nd Semester' },
  { code: 'ais 3101', title: 'Cost Accounting', semester: '3rd Year 1st Semester' },
  { code: 'ais 3102', title: 'Corporate Finance', semester: '3rd Year 1st Semester' },
  { code: 'ais 3103', title: 'Audit and Assurance', semester: '3rd Year 1st Semester' },
  { code: 'ais 3104', title: 'Banking and Insurance', semester: '3rd Year 1st Semester' },
  { code: 'ais 3105', title: 'VAT and Cross-Border Taxation', semester: '3rd Year 1st Semester' },
  { code: 'ais 3106', title: 'Entrepreneurship and Business Development', semester: '3rd Year 1st Semester' },
  { code: 'ais 3201', title: 'Management Accounting', semester: '3rd Year 2nd Semester' },
  { code: 'ais 3202', title: 'Corporate Reporting', semester: '3rd Year 2nd Semester' },
  { code: 'ais 3203', title: 'Forensic Accounting', semester: '3rd Year 2nd Semester' },
  { code: 'ais 3204', title: 'Organizational Behavior', semester: '3rd Year 2nd Semester' },
  { code: 'ais 3205', title: 'Accounting Information Systems', semester: '3rd Year 2nd Semester' },
  { code: 'ais 3206', title: 'Lab: Enterprise Resource Planning', semester: '3rd Year 2nd Semester' },
  { code: 'ais 4101', title: 'Advanced Management Accounting', semester: '4th Year 1st Semester' },
  { code: 'ais 4102', title: 'Financial Market and Investment Analysis', semester: '4th Year 1st Semester' },
  { code: 'ais 4103', title: 'Public Sector and NGO Accounting', semester: '4th Year 1st Semester' },
  { code: 'ais 4104', title: 'Supply Chain and Operation Management', semester: '4th Year 1st Semester' },
  { code: 'ais 4105', title: 'IT Governance and Information System Audit', semester: '4th Year 1st Semester' },
  { code: 'ais 4201', title: 'Accounting Theory', semester: '4th Year 2nd Semester' },
  { code: 'ais 4202', title: 'Business Analysis and Valuation', semester: '4th Year 2nd Semester' },
  { code: 'ais 4203', title: 'Research Methodology', semester: '4th Year 2nd Semester' },
  { code: 'ais 4204', title: 'Strategic Management', semester: '4th Year 2nd Semester' },
  { code: 'ais 4205', title: 'Data Analytics', semester: '4th Year 2nd Semester' },
  { code: 'ais 4206', title: 'Lab: Application of Data Analytic Tools', semester: '4th Year 2nd Semester' },
  { code: 'ais 5105', title: 'Organizations, Strategy and Control', semester: 'MBA 1st Semester' },
];

export const LEGACY_COURSES: CourseInfo[] = [
  {
    code: 'ais 2204',
    title: 'Laws and Theories of Banking and Bank Accounts',
    semester: '2nd Year 2nd Semester',
  },
];

export const SEMESTER_ORDER = [
  '1st Year 1st Semester',
  '1st Year 2nd Semester',
  '2nd Year 1st Semester',
  '2nd Year 2nd Semester',
  '3rd Year 1st Semester',
  '3rd Year 2nd Semester',
  '4th Year 1st Semester',
  '4th Year 2nd Semester',
  'MBA 1st Semester',
];
