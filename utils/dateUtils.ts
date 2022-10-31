import { formatDistanceToNow } from "date-fns";

/** Returns how long ago the provided date was. */
export const timeAgo = (
  dateString: string,
): string => {
  if (!dateString) return "";
  return formatDistanceToNow(new Date(dateString), {
    addSuffix: true,
  });
};
