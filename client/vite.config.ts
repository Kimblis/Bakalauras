import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import { compression } from 'vite-plugin-compression2';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      ViteEjsPlugin((viteConfig) => ({
        env: viteConfig.env,
      })),
      ViteImageOptimizer(),
      compression(),
    ],
    publicDir: '../common/assets',
    resolve: {
      alias: {
        '#backend': path.resolve(__dirname, '../../backend'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: false,
        },
      },
    },
  };
});
