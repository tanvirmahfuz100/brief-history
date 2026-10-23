/**
 * Brief History Website — shared slug utilities.
 *
 * All internal routes are derived from these slugs so that links, content
 * collection metadata, and `getStaticPaths` stay in sync. Empty, null, or
 * explicitly "unknown" values collapse to the safe `unknown` slug instead of
 * producing an empty route parameter (which breaks Astro prerendering).
 */

export const UNKNOWN_SLUG = 'unknown';

/** Lowercase, strip non-alphanumerics, collapse dashes, trim edges. */
export function slug(value: unknown): string {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Course slug: empty / unknown codes map to `unknown` so routes always resolve. */
export function courseSlug(code: unknown): string {
  const s = slug(code);
  if (!s || s === 'unknown') return UNKNOWN_SLUG;
  return s;
}

/** Paper slug: the content entry `id` is already route-safe, but normalize anyway. */
export function paperSlug(value: unknown): string {
  return slug(value) || UNKNOWN_SLUG;
}