import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/', // Ensure the base path is correct for your deployment
  build: {
    outDir: 'dist', // Ensure the output directory is 'dist'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Example alias for your project
    },
  },
});