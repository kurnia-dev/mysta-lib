import { resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';

const projectRoot = resolve(fileURLToPath(new URL('.', import.meta.url)));

export default defineConfig({
  resolve: {
    alias: {
      lib: resolve(projectRoot, '../library'),
    },
  },
  plugins: [],
  build: {
    cssMinify: true,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    outDir: 'dist',
    lib: {
      entry: ['index.ts'],
      formats: ['system'],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
