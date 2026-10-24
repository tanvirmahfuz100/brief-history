#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = fileURLToPath(new URL('../src/content/syllabi/', import.meta.url));
const dryRun = process.argv.includes('--dry-run');

const SEMESTERS = {
  '11': 'First Year First Semester',
  '12': 'First Year Second Semester',
  '21': 'Second Year First Semester',
  '22': 'Second Year Second Semester',
  '31': 'Third Year First Semester',
  '32': 'Third Year Second Semester',
  '41': 'Fourth Year First Semester',
  '42': 'Fourth Year Second Semester',
};

const fixes = [
  [/compreh7end/g, 'comprehend'],
  [/differentstakeholders/g, 'different stakeholders'],
  [/[‘’]s/g, "'s"],
  [/777\b/g, ''],
  [/[ \t]+$/gm, ''],
];

let changed = 0;
for (const file of (await readdir(DIR)).filter((f) => f.endsWith('.md'))) {
  const path = join(DIR, file);
  const raw = await readFile(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Missing front matter: ${file}`);
  const fields = new Map();
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (m) fields.set(m[1], m[2].replace(/^["']|["']$/g, ''));
  }
  const code = fields.get('code') || file.replace(/\.md$/, '');
  const semester = SEMESTERS[code.slice(0, 2)] || fields.get('semester') || '';
  let body = match[2];
  body = body.replace(/^\s*#\s+.*\n+/, '');
  body = body.replace(/^\*\*Semester\.\*\*.*\n+/m, '');
  for (const [pattern, replacement] of fixes) body = body.replace(pattern, replacement);
  body = body.replace(/\n{3,}/g, '\n\n').trim() + '\n';

  const frontmatter = [
    '---',
    `code: ${JSON.stringify(code)}`,
    `title: ${JSON.stringify(fields.get('title') || '')}`,
    `credits: ${fields.get('credits') || 0}`,
    `semester: ${JSON.stringify(semester)}`,
    '---',
    '',
  ].join('\n');
  const text = frontmatter + body;
  if (text !== raw) {
    changed++;
    if (!dryRun) await writeFile(path, text, 'utf8');
  }
}
console.log(`${dryRun ? 'Would normalize' : 'Normalized'} ${changed} syllabus files.`);
