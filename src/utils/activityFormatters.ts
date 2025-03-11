
import { formatDistanceToNow } from 'date-fns';

// Format relative time with tooltip showing exact time
export const formatActivityTime = (timestamp: string): { relative: string, exact: string } => {
  const date = new Date(timestamp);
  return {
    relative: formatDistanceToNow(date, { addSuffix: true }),
    exact: date.toLocaleString()
  };
};
