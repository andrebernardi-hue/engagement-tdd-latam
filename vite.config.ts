import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Split the heavier vendor libraries into their own chunks.
        manualChunks: {
          gsap: ['gsap'],
          d3: ['d3-scale', 'd3-shape', 'd3-array', 'd3-interpolate', 'd3-format'],
        },
      },
    },
  },
})
