import path from 'node:path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/admin',
  server: {
    port: 4201,
    host: 'localhost',
    fs: { allow: [path.resolve(__dirname, '../../libs')] },
    proxy: {
      '/api': { target: 'http://localhost:4000', changeOrigin: true },
    },
  },
  plugins: [react(), nxViteTsPaths()],
  build: {
    outDir: '../../dist/apps/admin',
    emptyOutDir: true,
    reportCompressedSize: true,
  },
});
