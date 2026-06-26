import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Keep the WebGL stack in its own chunk so it can be lazy-loaded
        // independently of the main bundle (perf budget, 01-TECH-SETUP §6).
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
          d3: [
            'd3-scale',
            'd3-shape',
            'd3-array',
            'd3-interpolate',
            'd3-format',
          ],
        },
      },
    },
  },
})
