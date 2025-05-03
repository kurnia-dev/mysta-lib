import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mysta-lib',
  plugins: [react()],
  resolve: {
    alias: {
      lib: resolve(__dirname, 'library'),
      packages: resolve(__dirname, 'packages'),
    },
  },
  server: {
    watch: {
      ignored: ['**/dist/**'],
    },
  },
});
