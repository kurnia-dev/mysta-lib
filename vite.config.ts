import { resolve } from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mysta-lib',
  plugins: [react()],
  resolve: {
    alias: {
      '@mystaline/mysta-commons': resolve(__dirname, 'library'),
      '@mystaline/mysta-lib': resolve(__dirname, 'packages/mysta-lib'),
      packages: resolve(__dirname, 'packages'),
    },
  },
  server: {
    watch: {
      ignored: ['**/dist/**'],
    },
  },
});
