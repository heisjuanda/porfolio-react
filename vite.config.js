import { defineConfig } from 'vite';
import { comlink } from 'vite-plugin-comlink';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    comlink(),
  ],
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  },
  worker: {
    plugins: [
      comlink(),
    ],
  }
})
