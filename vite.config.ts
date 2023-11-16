import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
=======
>>>>>>> 820b07a (new git)
  // base: '/hedSpace/',
  // root: './src'
});
