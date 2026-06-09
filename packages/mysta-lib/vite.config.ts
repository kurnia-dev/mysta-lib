import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    cssMinify: true,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    outDir: 'dist',
    lib: {
      entry: 'build-entry.ts',
      formats: ['system', 'es'],
      fileName: (format) => `mysta-lib.${format}.js`,
    },
    rollupOptions: {
      /*
       * Make sure to externalize deps that should not be bundled
       * into your library
       */
      external: [
        'react',
        'axios',
        'react-dom',
        'react-router-dom',
        'single-spa',
      ],
      output: {
        assetFileNames: (assetInfo): string => {
          if (assetInfo.name === 'build-entry.css') return 'style.css';
          return assetInfo.name ?? '';
        },
        exports: 'named',
        globals: {
          react: 'React',
        },
      },
    },
  },
  server: {
    port: 8888,
    hmr: {
      overlay: false,
    },
  },

  optimizeDeps: {
    include: ['radix-ui'],
  },
});
