#!/usr/bin/env node
import { readdir, readFile, writeFile, unlink } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const CONTENT_DIR = fileURLToPath(new URL('../src/content/questions/', import.meta.url));
const dryRun = process.argv.includes('--dry-run');

const CATALOG_PATH = fileURLToPath(new URL('../../sources/syllabus_catalog.md', import.meta.url));
const CATALOG_TEXT = await readFile(CATALOG_PATH, 'utf8');
const COURSE_TITLES = {};
for (const line of CATALOG_TEXT.split(/\r?\n/)) {
  const match = line.match(/^####\s+(\d{4})\s+[—-]\s+(.+?)\s+\(\d+\s+credits?\)\s*$/);
  if (match) COURSE_TITLES[match[1]] = match[2].trim();
}
COURSE_TITLES['5105'] = 'Organizations, Strategy and Control';

const TITLE_TO_CODE = {};
for (const [code, title] of Object.entries(COURSE_TITLES)) {
  TITLE_TO_CODE[title.toLowerCase().replace(/\s+/g, ' ').trim()] = code;
}
Object.assign(TITLE_TO_CODE, {
  'principles of accounting': '1101',
  'principles and practices of taxation i': '2205',
  'principles and practices of taxation-i': '2205',
  'organization behaviour': '3204',
  'organizations behavior': '3204',
  'organization behavior': '3204',
  'organization strategy and control': '5105',
  'organizations, strategy and control': '5105',
});

const SEMESTER = {
  '11': 'BBA 1st Year 1st Semester',
  '12': 'BBA 1st Year 2nd Semester',
  '21': 'BBA 2nd Year 1st Semester',
  '22': 'BBA 2nd Year 2nd Semester',
  '31': 'BBA 3rd Year 1st Semester',
  '32': 'BBA 3rd Year 2nd Semester',
  '41': 'BBA 4th Year 1st Semester',
  '42': 'BBA 4th Year 2nd Semester',
  '51': 'MBA 1st Semester',
};

const MANUAL_DUPLICATES = new Set([
  'jpg-2201-advanced-financial-accounting-ii-2017-18-2.md',
  'jpg-2201-advanced-financial-accounting-ii-2017-18-3.md',
  'jpg-3102-financial-management-2017-18-2.md',
  'jpg-2203-applied-business-statistics-2018-19-p01-02__applied-business-statistics__2018-19__final.md',
  'jpg-2205-tax-i-2017-18-p01-02__principles-and-practices-of-taxation-i__2018-19__final.md',
  'jpg-3101-cost-accounting-2017-18-p01-02__cost-accounting__2019-20__final.md',
  'jpg-3101-cost-accounting-2017-18-p01-03__cost-accounting__2019-20__final.md',
  'jpg-5105-organization-stategy-and-control-2018-19-2.md',
  'jpg-5105-organization-stategy-and-control-2018-19-p01-02__organizations-strategy-and-control__2018-19__final.md',
]);

const FIELD_ORDER = [
  'source_id', 'source_file', 'pages', 'university', 'department', 'course',
  'course_code', 'course_slug', 'year_semester', 'exam', 'session', 'time',
  'full_marks', 'instructions', 'choice', 'ocr_confidence', 'notes',
];

function parse(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error('Missing front matter');
  const lines = match[1].split(/\r?\n/);
  const fields = new Map();
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (m) fields.set(m[1], m[2]);
  }
  return { fields, body: match[2] };
}

function unquote(value) {
  const v = String(value ?? '').trim();
  let text = v;
  if (v.startsWith('"') && v.endsWith('"')) {
    try {
      text = JSON.parse(v);
    } catch {
      text = v.slice(1, -1).replace(/\\"/g, '"');
    }
  } else if (v.startsWith("'") && v.endsWith("'")) {
    text = v.slice(1, -1).replace(/\\'/g, "'");
  }
  return String(text).replace(/\\+(?:n|r)/g, (match) => (match.endsWith('n') ? '\n' : '')).replace(/\r/g, '');
}

function quote(value) {
  const v = String(value ?? '').trim();
  return v ? JSON.stringify(v) : '""';
}

function normalizeSession(value) {
  const v = unquote(value);
  const m = v.match(/(\d{4})\s*[-–—]\s*(\d{2,4})/);
  if (!m) return v;
  const start = m[1];
  const end = m[2].length === 4 ? m[2].slice(2) : m[2];
  return `${start}-${end}`;
}

function normalizeExam(value) {
  const v = unquote(value).toLowerCase();
  if (!v || v === 'unknown') return 'Final';
  if (/class\s*test/.test(v)) {
    if (/1st|first/.test(v)) return '1st Class Test';
    if (/2nd|second/.test(v)) return '2nd Class Test';
    return 'Class Test';
  }
  if (/quiz/.test(v)) {
    if (/1st|first/.test(v)) return '1st Quiz';
    if (/2nd|second/.test(v)) return '2nd Quiz';
    return 'Quiz';
  }
  if (/mid/.test(v)) {
    if (/1st|first|midterm[- ]?1|mid[- ]?1/.test(v)) return '1st Midterm';
    if (/2nd|second|midterm[- ]?2|mid[- ]?2/.test(v)) return '2nd Midterm';
    return 'Midterm';
  }
  return 'Final';
}

function normalizeDepartment(value) {
  const v = unquote(value);
  if (!v || /unknown/i.test(v)) return '';
  if (/accounting|information systems/i.test(v)) {
    return 'Department of Accounting & Information Systems';
  }
  return v;
}

function cleanCourseTitle(value) {
  return unquote(value).replace(/\s+/g, ' ').trim();
}

function cleanPaperBody(body) {
  let lines = body.split(/\r?\n/);

  const firstContent = lines.findIndex((line) => line.trim() !== '');
  if (firstContent !== -1 && /^#\s+/.test(lines[firstContent])) {
    lines.splice(firstContent, 1);
    while (firstContent < lines.length && lines[firstContent].trim() === '') lines.splice(firstContent, 1);
  }

  let lastHeadingMarks = false;
  lines = lines.filter((line) => {
    if (/^#{2,4}\s+Question\b/i.test(line)) {
      lastHeadingMarks = /\[[^\]]*\d[^\]]*\]/.test(line);
      return true;
    }
    if (lastHeadingMarks && /^\s*\*{0,2}\[?\s*(Marks?|Marks\s*=|\d+\s*marks?)/i.test(line) && /\]|\*{2}$/.test(line.trim())) {
      return false;
    }
    return true;
  });

  lines = mergeTables(lines);

  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  return lines.join('\n') + '\n';
}

function isTableLine(line) {
  return /^\s*\|.*\|\s*$/.test(line);
}

function mergeTables(lines) {
  const out = [];
  let i = 0;
  while (i < lines.length) {
    if (!isTableLine(lines[i])) {
      out.push(lines[i]);
      i++;
      continue;
    }
    const start = i;
    while (i < lines.length && isTableLine(lines[i])) i++;
    const block = lines.slice(start, i);
    let j = i;
    while (j < lines.length && (lines[j].trim() === '' || /^<!--.*-->\s*$/.test(lines[j].trim()))) j++;
    if (j < lines.length && isTableLine(lines[j])) {
      const nextStart = j;
      while (j < lines.length && isTableLine(lines[j])) j++;
      const next = lines.slice(nextStart, j);
      const header = block[0].replace(/\s+/g, '');
      const nextHeader = next[0].replace(/\s+/g, '');
      if (header === nextHeader && block.length >= 2 && next.length >= 2) {
        out.push(...block, ...next.slice(2));
        i = j;
        continue;
      }
    }
    out.push(...block);
  }
  return out;
}

function rewrite(raw, file) {
  const { fields, body } = parse(raw);
  const sourceId = unquote(fields.get('source_id'));
  const sourceFile = unquote(fields.get('source_file'));
  const oldCode = unquote(fields.get('course_code')).toLowerCase().replace(/[^0-9]/g, '');
  const oldTitle = cleanCourseTitle(fields.get('course'));
  const isLegacyBanking = /laws-and-theories-of-banking/i.test(sourceId);
  const isOrgBehaviour = /organization-behavio/.test(sourceId);
  const titleKey = oldTitle.toLowerCase().replace(/\s+/g, ' ').trim();
  const mappedCode = TITLE_TO_CODE[titleKey];
  const code = isLegacyBanking
    ? '2204'
    : isOrgBehaviour
      ? '3204'
      : (COURSE_TITLES[oldCode] ? oldCode : mappedCode || '');
  const title = isLegacyBanking
    ? 'Laws and Theories of Banking and Bank Accounts'
    : (code ? COURSE_TITLES[code] : (/^unknown/i.test(oldTitle) || !oldTitle ? 'Unidentified paper' : oldTitle));

  const values = new Map(fields);
  values.set('university', quote('University of Barishal'));
  values.set('department', quote(normalizeDepartment(fields.get('department'))));
  values.set('course', quote(title));
  values.set('course_code', quote(code ? `ais ${code}` : 'unknown'));
  if (isLegacyBanking) values.set('course_slug', quote('legacy-banking-2204'));
  else values.delete('course_slug');
  values.set('year_semester', quote(code ? SEMESTER[code.slice(0, 2)] ?? '' : unquote(fields.get('year_semester'))));
  values.set('exam', quote(normalizeExam(fields.get('exam'))));
  values.set('session', quote(normalizeSession(fields.get('session'))));
  for (const key of ['examiner_marks', 'faculty_source']) values.delete(key);

  const out = ['---'];
  for (const key of FIELD_ORDER) {
    if (!values.has(key)) continue;
    let value = values.get(key);
    if (key === 'full_marks' || key === 'time' || key === 'instructions' || key === 'choice' || key === 'notes') {
      const plain = unquote(value);
      if (!plain || /^null$/i.test(plain)) value = '""';
      else if (key === 'full_marks' && /^\d+$/.test(plain)) value = plain;
      else if (key !== 'full_marks') value = quote(plain);
    }
    out.push(`${key}: ${value}`);
  }
  out.push('---', '');
  const cleanBody = cleanPaperBody(body).replace(/^\n+/, '');
  return { text: out.join('\n') + cleanBody, code, title, sourceId, sourceFile };
}

const entries = (await readdir(CONTENT_DIR)).filter((f) => f.endsWith('.md'));
const parsed = [];
for (const file of entries) {
  const raw = await readFile(join(CONTENT_DIR, file), 'utf8');
  const { fields, body } = parse(raw);
  parsed.push({
    file,
    raw,
    sourceId: unquote(fields.get('source_id')),
    session: normalizeSession(fields.get('session')),
    exam: normalizeExam(fields.get('exam')),
    titleKey: cleanCourseTitle(fields.get('course')).toLowerCase(),
    pages: (fields.get('pages') || '').replace(/[\[\]\s]/g, '').split(',').filter(Boolean).map(Number),
    words: body.split(/\s+/).filter(Boolean).length,
  });
}

const removed = [];
for (const item of parsed) {
  if (MANUAL_DUPLICATES.has(item.file)) removed.push({ file: item.file, reason: 'known duplicate' });
}

const groups = new Map();
for (const item of parsed) {
  if (removed.some((r) => r.file === item.file)) continue;
  const key = `${item.sourceId}|${item.session}|${item.exam}|${item.titleKey}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(item);
}

for (const items of groups.values()) {
  if (items.length < 2) continue;
  for (const candidate of items) {
    if (removed.some((r) => r.file === candidate.file)) continue;
    const better = items.find((other) => {
      if (other === candidate || removed.some((r) => r.file === other.file)) return false;
      const covers = candidate.pages.every((p) => other.pages.includes(p));
      const strict = other.pages.length > candidate.pages.length || (other.pages.length === candidate.pages.length && other.words > candidate.words);
      return covers && strict;
    });
    if (better) removed.push({ file: candidate.file, reason: `subset of ${better.file}` });
  }
}

console.log(`Duplicates: ${removed.length}`);
for (const { file, reason } of removed) console.log(`  - ${file} (${reason})`);

if (!dryRun) {
  for (const { file } of removed) await unlink(join(CONTENT_DIR, file));
}

let changed = 0;
const changedFiles = [];
for (const item of parsed) {
  if (removed.some((r) => r.file === item.file)) continue;
  const { text } = rewrite(item.raw, item.file);
  if (text !== item.raw) {
    changed++;
    changedFiles.push(item.file);
    if (!dryRun) await writeFile(join(CONTENT_DIR, item.file), text, 'utf8');
  }
}
if (dryRun && changedFiles.length) console.log(`Changed files:\n  ${changedFiles.join('\n  ')}`);
console.log(`${dryRun ? 'Would normalize' : 'Normalized'} ${changed} of ${parsed.length - removed.length} files.`);
