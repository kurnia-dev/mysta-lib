import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    cssMinify: true,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    outDir: 'dist',
    lib: {
      entry: ['index.js'],
      formats: ['system'],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
