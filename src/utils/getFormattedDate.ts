import { formatDate } from "date-fns";

export const getFormattedDate = (date: string) => {
  if (!date) return "";

  return formatDate(date, "dd MMM yyyy");
};
