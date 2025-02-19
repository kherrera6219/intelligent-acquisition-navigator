
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
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
