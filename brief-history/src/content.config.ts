import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Coerce messy OCR front matter into a stable string.
 * - arrays (some `source_file` values) -> comma-joined
 * - numbers (some `course_code` values) -> string
 * - null/undefined/empty -> empty string
 */
function stringify(v: unknown): string {
  if (v == null) return '';
  if (Array.isArray(v)) return v.map(String).join(', ');
  return String(v);
}

/**
 * Normalize a course code so empty, null, or explicitly "unknown" values all
 * collapse to the literal string "unknown". This keeps the course directory
 * explicit (per the spec: unknown values remain explicitly unknown) and
 * guarantees every route parameter is non-empty.
 */
function normalizeCode(v: unknown): string {
  const s = stringify(v).trim().toLowerCase();
  return s && s !== 'unknown' ? s : 'unknown';
}

const questions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/questions' }),
  schema: z.object({
    source_id: z.string(),
    source_file: z.any().optional().transform(stringify),
    pages: z.array(z.number()).default([]),
    university: z.string().optional().default(''),
    department: z.string().optional().default(''),
    course: z.string(),
    course_code: z.any().transform(normalizeCode),
    year_semester: z.string().optional().default(''),
    exam: z.string(),
    session: z.string(),
    time: z.string().optional().default(''),
    full_marks: z.any().optional().transform(stringify),
    instructions: z.string().optional().default(''),
    choice: z.string().optional().default(''),
    ocr_confidence: z.string().optional().default(''),
    notes: z.string().optional().default(''),
  }),
});

export const collections = { questions };
