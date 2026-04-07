import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Support for the requested environment variable name
      'process.env.NEXT_PUBLIC_GEMINI_API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY || env.NEXT_PUBLIC_GEMINI_API_KEY || env.GEMINI_API_KEY),
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    }
  };
});
