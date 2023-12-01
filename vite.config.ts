import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [react(),
    VitePWA({
      manifest: {
        name: 'OG',
        short_name: 'OG',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/icons/image.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith('/');
            },
            handler: 'NetworkFirst' as const,
            options: {
              cacheName: 'home-cache',
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
