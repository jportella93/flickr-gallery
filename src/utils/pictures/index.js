  // Sometimes flickr doesn't have medium size, this function returns a small size as a fallback,
  // if everything fails, return a random picture
export const getAvailableSize = (picture) => {
  try {
    return picture.sizes.size[5].source ? picture.sizes.size[5].source : picture.sizes.size[0].source
  } catch (e) {
    return 'https://picsum.photos/300/?random'
  }
}
