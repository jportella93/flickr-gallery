// Format date from unix epoch
export const getDateFromUnix = (unix) => {
  const fullDate = new Date(Number(`${unix}000`))
  const month = fullDate.getMonth() + 1
  const year = fullDate.getFullYear()

  return `${month}/${year}`
}