import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin === self.location.origin,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin !== self.location.origin,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'dynamic-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Toca al Topo',
        short_name: 'Topo',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4DBA87',
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  server: {
    port: 3000,
  },
});
