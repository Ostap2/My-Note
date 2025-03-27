import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../dist', // Кидаємо білд у корінь проєкту
    emptyOutDir: true,
  },
});
