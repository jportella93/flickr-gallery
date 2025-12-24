import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Dev-only: avoid Flickr feed CORS by proxying through Vite.
      '/api/pictures': {
        target: 'https://www.flickr.com',
        changeOrigin: true,
        rewrite: () => '/services/feeds/photos_public.gne?format=json&nojsoncallback=1',
      },
    },
  },
});

