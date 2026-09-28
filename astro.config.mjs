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
            src: '/prototipo-hilariom/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/prototipo-hilariom/logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/prototipo-hilariom/logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        // Sem navigateFallback de proposito. Ele e feito para SPA, em que um
        // unico HTML atende todas as rotas. Aqui cada pagina tem seu proprio
        // HTML em cache, entao o fallback so entrava quando a URL nao batia
        // exatamente com o cache, e sempre servia a home no lugar da pagina
        // pedida: o retorno do login do painel (/admin/?state=&code=), o
        // filtro de obras (/obras/?segment=) e cliques de anuncio (?gclid=).
        //
        // Precisa ser null explicito: se a chave for omitida, o @vite-pwa/astro
        // injeta navigateFallback = base por conta propria.
        navigateFallback: null,

        // Parametros que nao mudam o conteudo da pagina: a versao em cache
        // continua valendo, inclusive offline.
        ignoreURLParametersMatching: [
          /^utm_/, /^fbclid$/,                      // padrao do Workbox
          /^gclid$/, /^gbraid$/, /^wbraid$/,        // Google Ads
          /^msclkid$/,                              // Microsoft Ads
          /^segment$/,                              // filtro de obras
        ],
        globPatterns: ['**/*.{css,js,html,svg,png,webp,avif,ico,txt}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/www\.galleon\.com\.br\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'galleon-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 dias
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
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
