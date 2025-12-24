// Format date as M/YYYY from either:
// - a unix epoch (seconds)
// - an ISO date string
// - a Date instance
export const getMonthYear = (value) => {
  let date;
  if (value instanceof Date) date = value;
  else if (typeof value === 'number') date = new Date(value * 1000);
  else if (typeof value === 'string' && value.trim()) date = new Date(value);
  else return '';

  if (Number.isNaN(date.getTime())) return '';
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${month}/${year}`;
};