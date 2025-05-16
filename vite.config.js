import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Since import.meta is an object that can be changed by Vite, destructuring
// gives different results.
// eslint-disable-next-line prefer-destructuring
const dirname = import.meta.dirname;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(dirname, 'src/index.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test-setup.js',
  },
});
