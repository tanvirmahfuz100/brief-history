import { COURSES, LEGACY_COURSES, SEMESTER_ORDER, type CourseInfo } from '@/data/courses';
import { courseSlug, slug } from '@/lib/slug';

const byCode = new Map(COURSES.map((course) => [course.code, course]));
const byKey = new Map(COURSES.map((course) => [courseSlug(course.code), course]));

export const LEGACY_BANKING_KEY = 'legacy-banking-2204';
byKey.set(
  LEGACY_BANKING_KEY,
  LEGACY_COURSES[0],
);

export const COURSE_BY_CODE = byCode;
export const COURSE_BY_SLUG = byKey;
export const ALL_COURSES = [...COURSES, ...LEGACY_COURSES];

const SEMESTER_LOGO_CODES: Record<string, string> = {
  '1st Year 1st Semester': '11',
  '1st Year 2nd Semester': '12',
  '2nd Year 1st Semester': '21',
  '2nd Year 2nd Semester': '22',
  '3rd Year 1st Semester': '31',
  '3rd Year 2nd Semester': '32',
  '4th Year 1st Semester': '41',
  '4th Year 2nd Semester': '42',
  'MBA 1st Semester': '51',
};

const UNKNOWN_VALUES = new Set(['', 'unknown', 'null', 'undefined', 'n/a', 'none', 'unknown course']);

export function isUnknown(value: unknown): boolean {
  return UNKNOWN_VALUES.has(String(value ?? '').trim().toLowerCase());
}

export function formatCode(code: unknown): string {
  const value = String(code ?? '').trim();
  if (isUnknown(value)) return 'Unknown';
  return value.toUpperCase();
}

export function canonicalCourse(code: unknown, fallback = ''): string {
  const value = String(code ?? '').trim().toLowerCase();
  return byCode.get(value)?.title ?? (isUnknown(fallback) ? '' : fallback);
}

export function courseSemester(code: unknown): string {
  const value = String(code ?? '').trim().toLowerCase();
  return byCode.get(value)?.semester ?? '';
}

export function courseInfoForKey(key: string): CourseInfo | undefined {
  return byKey.get(key);
}

export function courseKey(data: { course_code?: unknown; course_slug?: unknown }): string {
  const override = String(data.course_slug ?? '').trim();
  if (override) return slug(override);
  return courseSlug(data.course_code);
}

export function courseHref(data: { course_code?: unknown; course_slug?: unknown }): string {
  return `/brief-history/courses/${courseKey(data)}/`;
}

export function paperHref(data: { id?: string; course_code?: unknown; course_slug?: unknown }): string {
  return `${courseHref(data)}${data.id ?? ''}/`;
}

export function normalizeSession(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (isUnknown(raw)) return '';
  const full = raw.match(/^(\d{4})-(\d{4})$/);
  if (full) return `${full[1]}-${full[2].slice(-2)}`;
  const short = raw.match(/^(\d{4})-(\d{2})$/);
  if (short) return raw;
  return raw;
}

export function normalizeExam(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (isUnknown(raw)) return '';
  const s = raw.toLowerCase();
  const first = /(^|\D)(1st|first|midterm\s*-?\s*1)(\D|$)/.test(s);
  const second = /(^|\D)(2nd|second|midterm\s*-?\s*2)(\D|$)/.test(s);

  if (/class\s*test/.test(s)) return first ? '1st Class Test' : second ? '2nd Class Test' : 'Class Test';
  if (/quiz/.test(s)) return first ? '1st Quiz' : second ? '2nd Quiz' : 'Quiz';
  if (/mid/.test(s)) return first ? '1st Mid-term' : second ? '2nd Mid-term' : 'Mid-term';
  if (/final/.test(s)) return 'Final';
  return raw;
}

export function examType(exam: string): string {
  if (/final/i.test(exam)) return 'Final';
  if (/mid/i.test(exam)) return 'Midterm';
  if (/class\s*test/i.test(exam)) return 'Class Test';
  if (/quiz/i.test(exam)) return 'Quiz';
  return exam || 'Unspecified';
}

export function normalizeDepartment(value: unknown): string {
  const raw = String(value ?? '').trim();
  if (isUnknown(raw)) return '';
  return 'Department of Accounting & Information Systems';
}

export function normalizeYearSemester(value: unknown, code?: unknown): string {
  const fromCode = courseSemester(code);
  if (fromCode) return fromCode;
  const raw = String(value ?? '').trim();
  if (isUnknown(raw)) return '';
  return raw;
}

export function clean(value: unknown): string {
  const raw = String(value ?? '').trim();
  return isUnknown(raw) ? '' : raw;
}

export function metaParts(parts: Array<unknown>): string[] {
  return parts.map(clean).filter(Boolean);
}

export function titleForPaper(data: {
  course?: unknown;
  course_code?: unknown;
  course_slug?: unknown;
  session?: unknown;
  exam?: unknown;
}): string {
  const info = courseInfoForKey(courseKey(data));
  const course = info?.title ?? canonicalCourse(data.course_code, String(data.course ?? ''));
  const code = formatCode(info?.code ?? data.course_code);
  const session = normalizeSession(data.session);
  const exam = normalizeExam(data.exam);
  const when = [session, exam].filter(Boolean).join(' ');
  const name = course || (isUnknown(data.course) ? 'Unidentified paper' : String(data.course ?? ''));
  return [code, name, when].filter(Boolean).join(' — ');
}

export function semesterGroups<T extends { semester: string }>(items: T[]): Array<{ semester: string; items: T[] }> {
  return SEMESTER_ORDER.map((semester) => ({
    semester,
    items: items.filter((item) => item.semester === semester),
  })).filter((group) => group.items.length > 0);
}

export function semesterLogoPath(semester: string): string | undefined {
  const code = SEMESTER_LOGO_CODES[semester];
  return code ? `/brief-history/semesters/${code}.svg` : undefined;
}

export { SEMESTER_ORDER };
