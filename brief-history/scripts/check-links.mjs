#!/usr/bin/env node
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const BASE = '/brief-history';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

const files = await walk(DIST);
const htmlFiles = files.filter((f) => extname(f) === '.html');
const broken = new Map();

function targetFor(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean.startsWith(BASE)) return null;
  let path = clean.slice(BASE.length) || '/';
  if (path.endsWith('/')) path += 'index.html';
  if (!extname(path)) path += '/index.html';
  return join(DIST, path.replace(/^\//, ''));
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const urls = new Set();
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (!url.startsWith(BASE)) continue;
    urls.add(url);
  }
  for (const url of urls) {
    const target = targetFor(url);
    if (!target) continue;
    try {
      await stat(target);
    } catch {
      const page = `/${relative(DIST, file)}`;
      if (!broken.has(url)) broken.set(url, new Set());
      broken.get(url).add(page);
    }
  }
}

if (broken.size) {
  console.error(`Broken internal links: ${broken.size}`);
  for (const [url, pages] of broken) {
    console.error(`  ${url}`);
    for (const page of pages) console.error(`    from ${page}`);
  }
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files: no broken internal links.`);
