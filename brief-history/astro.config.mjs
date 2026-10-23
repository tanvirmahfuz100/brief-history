import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const srcDir = path.resolve(fileURLToPath(new URL('./src/', import.meta.url)));

export default defineConfig({
  site: 'https://example.com',
  base: '/brief-history',
  output: 'static',
  vite: {
    resolve: {
      alias: {
        '@': srcDir,
      },
    },
  },
});