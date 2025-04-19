import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mysta-lib',
  plugins: [react()],
  resolve: {
    alias: {
      lib: resolve(__dirname, 'library'),
    },
  },
  server: {
    watch: {
      ignored: ['**/dist/**'],
    },
  },
});
