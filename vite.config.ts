import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          // FIX: `process.cwd()` was causing a TypeScript type error because the DOM 'Process' type was conflicting with the Node.js 'process' object.
          // `path.resolve('.')` achieves the same goal of setting an alias for the project root when running Vite from the root directory.
          '@': path.resolve('.'),
        }
      }
    };
});