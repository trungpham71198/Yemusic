import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const pathSrc = resolve(__dirname, './src').replace(/\\/g, '/');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          'assets/styles/_reset',
          'assets/styles/_variables',
          'assets/styles/_mixins',
          'assets/styles/_zIndex',
          'assets/styles/_fonts',
          'assets/styles/_functions',
          'assets/styles/_globals',
        ]
          .map(stylePathFile => `@import "${pathSrc}/${stylePathFile}";`)
          .join('\n'),
      },
    },
  },
});
