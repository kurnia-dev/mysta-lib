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
    rollupOptions: {
      input: resolve(__dirname, 'build-entry.ts'),
      external: ['react'],
      output: {
        assetFileNames: (assetInfo): string => {
          if (assetInfo.name === 'build-entry.css') return 'style.css';
          return assetInfo.name ?? '';
        },
        globals: {
          react: 'React',
        },
      },
    },
  },
  resolve: {
    alias: {
      lib: resolve(__dirname),
    },
  },
  assetsInclude: ['**/*.lottie'],
});
