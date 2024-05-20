export const convertDateInSeconds = (date: Date) => {
  const tempDate = new Date(date).getTime();

  return Math.floor(tempDate / 1000);
};
