// If str goes over character limit, slice it and add '...' at the end
export const sliceExtra = (str, limit) => {
  const safe = str == null ? '' : String(str);
  return safe.length < limit ? safe : safe.slice(0, limit) + '...';
};