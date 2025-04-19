import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

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
