  // Sometimes flickr doesn't have medium size, this function returns a small size as a fallback
export const getAvailableSize = (picture) => {
  try {
    return picture.sizes.size[5] ? picture.sizes.size[5] : picture.sizes.size[0]
  } catch (e) {
    console.error(e)
  }
}
