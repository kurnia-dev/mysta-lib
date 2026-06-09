import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      outDir: 'dist/types',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'build-entry.ts'),
      name: 'mysta-commons',
      formats: ['es'],
      fileName: (format) => `mysta-commons.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion'],
      output: {
        assetFileNames: (assetInfo): string => {
          if (assetInfo.name === 'style.css') return 'style.css';
          return assetInfo.name ?? '';
        },
      },
    },
  },

});
