// If str goes over character limit, slice it and add '...' at the end
export const sliceExtra = (str, limit) => str.length < limit ? str : str.slice(0, limit) + '...'