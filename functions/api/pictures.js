export async function onRequestGet() {
  const upstreamUrl =
    'https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';

  const upstream = await fetch(upstreamUrl, {
    // Keep it cache-friendly; this is demo/portfolio traffic.
    cf: { cacheTtl: 300, cacheEverything: true },
    headers: {
      'user-agent': 'flickr-gallery-demo (Cloudflare Pages Function)',
    },
  });

  const body = await upstream.text();

  return new Response(body, {
    status: upstream.status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Allow the browser app to call this endpoint.
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=300',
    },
  });
}

