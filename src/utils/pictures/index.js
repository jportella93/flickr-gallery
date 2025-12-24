// Derive a stable id from a Flickr photo URL like:
// https://www.flickr.com/photos/{owner}/{photoId}/
const parseFlickrPhotoIdFromLink = (link) => {
  if (!link) return null;
  const match = String(link).match(/\/photos\/[^/]+\/(\d+)\//);
  return match?.[1] || null;
};

const parseFlickrAuthorName = (author) => {
  // Feed format: 'nobody@flickr.com ("Some Name")'
  if (!author) return 'Unknown';
  const match = String(author).match(/\("(.+)"\)/);
  return match?.[1] || String(author);
};

const toLargeImageUrl = (mediaUrl) => {
  // Feed provides ..._m.jpg. Replace with a larger rendition if possible.
  if (!mediaUrl) return null;
  return String(mediaUrl).replace(/_m(\.[a-zA-Z0-9]+)$/, '_b$1');
};

// Normalize Flickr public feed JSON into the shape this app uses.
export const normalizeFlickrPublicFeed = (feedJson) => {
  const items = feedJson?.items || [];
  return items.map((item) => {
    const link = item?.link || '';
    const id = parseFlickrPhotoIdFromLink(link) || link || `${Math.random()}`;
    const authorId = item?.author_id || '';
    const authorName = parseFlickrAuthorName(item?.author);

    const imageUrl = item?.media?.m || '';
    const imageUrlLarge = toLargeImageUrl(imageUrl) || imageUrl;

    return {
      id,
      title: item?.title || '',
      link,
      imageUrl,
      imageUrlLarge,
      authorId,
      authorName,
      authorUrl: authorId ? `https://www.flickr.com/people/${authorId}/` : 'https://www.flickr.com/',
      published: item?.published || '',
      tags: String(item?.tags || '')
        .split(' ')
        .map((t) => t.trim())
        .filter(Boolean),
      description: item?.description || '',
    };
  });
};

// For this demo app, pictures already have a usable URL. Keep a safe fallback.
export const getAvailableSize = (picture) => {
  return picture?.imageUrl || 'https://picsum.photos/400/300?random=1';
};
