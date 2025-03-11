
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'Procurity Intelligent Acquisition Navigator',
        short_name: 'Procurity',
        description: 'AI-powered acquisition management and compliance platform for federal, state, and local government procurement.',
        theme_color: '#0066CC',
        background_color: '#1a1a1a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon'
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['@azure/openai'],
    exclude: ['express-rate-limit']
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: ['crypto', 'net', 'buffer', 'express-rate-limit'],
      output: {
        globals: {
          crypto: 'globalThis.crypto',
          net: 'globalThis.net',
          buffer: 'globalThis.buffer',
          'express-rate-limit': 'expressRateLimit'
        }
      }
    }
  }
}));
