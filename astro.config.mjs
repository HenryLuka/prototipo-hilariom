import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://henryluka.github.io',
  base: '/prototipo-hilariom',
  trailingSlash: 'always',
  prefetch: true,
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false // Desativado para não quebrar o hot-reload
      },
      manifest: {
        name: 'Hilariom - Estruturas Pré-fabricadas',
        short_name: 'Hilariom',
        description: 'Catálogo de obras e produtos Hilariom - mobile first',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'https://via.placeholder.com/192/fce883/1a1a1a?text=Hilariom',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://via.placeholder.com/512/fce883/1a1a1a?text=Hilariom',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'https://via.placeholder.com/512/fce883/1a1a1a?text=Hilariom',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        navigateFallback: '/prototipo-hilariom/',
        globPatterns: ['**/*.{css,js,html,svg,png,webp,avif,ico,txt}'],
      },
    }),
    compress({
      CSS: true,
      HTML: {
        "removeAttributeQuotes": false,
      },
      Image: false,
      JavaScript: true,
      SVG: true,
      Logger: 1,
    }),
  ],
});
