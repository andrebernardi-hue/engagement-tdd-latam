import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

/**
 * Single-file build: inlines ALL JS, CSS, and fonts into one self-contained
 * `dist-singlefile/index.html` that runs from the file:// protocol (just open
 * it in a browser, no server). `viteSingleFile` inlines the bundle and disables
 * code-splitting; `assetsInlineLimit: Infinity` base64-inlines the fonts; the
 * favicon is already a data URI in index.html. Used via:
 *   npx vite build --config vite.config.singlefile.ts
 */
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2020',
    outDir: 'dist-singlefile',
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    cssCodeSplit: false,
    chunkSizeWarningLimit: 100000,
    rollupOptions: {
      output: {
        // One inlined bundle: no manual chunks (incompatible with inlining).
        inlineDynamicImports: true,
      },
    },
  },
})
