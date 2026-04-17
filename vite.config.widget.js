/**
 * Widget build — produces dist-widget/ which mirrors dist/ but with the
 * widget-entry.jsx as the entry so WidgetShell mounts automatically.
 *
 * Recommended embed: elmoney-launcher.js (iframe-based, ~2KB).
 * This build is an ALTERNATIVE for teams who want a self-contained
 * React-driven embed (no iframe) and can accept the larger bundle.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    lib: {
      entry: 'src/widget-entry.jsx',
      name: 'ElmoneyWidget',
      formats: ['es'],
      fileName: () => 'elmoney-widget.js',
    },
    outDir: 'dist-widget',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
})
