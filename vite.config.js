import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('react') || id.includes('scheduler')) return 'react-vendor';
          if (id.includes('framer-motion')) return 'motion-vendor';
          if (id.includes('react-router')) return 'router-vendor';
          if (id.includes('react-icons')) return 'icons-vendor';
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
