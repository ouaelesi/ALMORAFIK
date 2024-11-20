export const displayDate = (date) => {
  const dateOnly = new Date(date).toISOString().split("T")[0];

  return dateOnly;
};
