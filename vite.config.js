import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  plugins: [react()],
  server: { port: 3001 },
});
