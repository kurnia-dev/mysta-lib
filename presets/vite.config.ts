import { resolve } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';

const projectRoot = resolve(fileURLToPath(new URL('.', import.meta.url)));

export default defineConfig({
  plugins: [],
  build: {
    cssMinify: true,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    outDir: 'dist',
    lib: {
      entry: {
        'index': resolve(projectRoot, 'index.ts'),
        'kitsune/index': resolve(projectRoot, 'kitsune/index.ts'),
        'yurei/index': resolve(projectRoot, 'yurei/index.ts'),
        'raijin/index': resolve(projectRoot, 'raijin/index.ts'),
        'inari/index': resolve(projectRoot, 'inari/index.ts'),
        'yuki/index': resolve(projectRoot, 'yuki/index.ts'),
        'sakuragi/index': resolve(projectRoot, 'sakuragi/index.ts'),
      },
      formats: ['system'],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        /^@mystaline\/mysta-commons/,
      ],
    },
  },
});
