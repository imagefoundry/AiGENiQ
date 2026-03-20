import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,webp,png,woff2}'],
        navigateFallback: '/AiGENiQ/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [],
      },
      manifest: {
        name: 'AiGENiQ',
        short_name: 'AiGENiQ',
        theme_color: '#A7F432',
        background_color: '#FAFAF8',
        display: 'browser',
        icons: [],
      },
    }),
  ],
  base: '/AiGENiQ/',
  build: {
    target: 'es2020',
    cssMinify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
        },
      },
    },
  },
})
