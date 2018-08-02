  // Sometimes flickr API doesn't have available medium size,
  // this function returns a small size as a fallback.
  // if everything fails, in order to not worsen UX,
  // it returns a random picture, rather than an error message.
export const getAvailableSize = (picture) => {
  try {
    return picture.sizes.size[5].source ? picture.sizes.size[5].source : picture.sizes.size[0].source
  } catch (e) {
    return 'https://picsum.photos/300/?random'
  }
}
