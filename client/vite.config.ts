import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'convex/_generated': path.resolve(__dirname, './convex/_generated'),
    },
  },
  optimizeDeps: {
    include: ['@floating-ui/dom'],
  },
});
