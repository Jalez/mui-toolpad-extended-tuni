/** @format */

import { DateTime } from 'luxon';

export const parseDate = (dateString: string | null | undefined) => {
  return dateString ? DateTime.fromISO(dateString) : null;
};
