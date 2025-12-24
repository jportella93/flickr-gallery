// In production (Cloudflare Pages), `/api/pictures` is served by a Pages Function
// in `functions/api/pictures.js` to avoid Flickr feed CORS restrictions.
//
// In development, Vite proxies `/api/pictures` to Flickr (see `vite.config.js`).
export const PICTURES_API_URL = import.meta.env.VITE_PICTURES_API_URL || '/api/pictures';