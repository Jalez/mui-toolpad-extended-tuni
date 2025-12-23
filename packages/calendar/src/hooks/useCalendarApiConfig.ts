/** @format */

import { useServiceApiConfig } from '@mui-toolpad-extended-tuni/core';
import type { CalendarApiEndpoints } from '@mui-toolpad-extended-tuni/core';

/**
 * Hook to access calendar API configuration.
 * Returns the calendar endpoint configuration merged with defaults.
 * 
 * @returns Calendar API endpoints configuration, or undefined if not registered
 * @throws Error if used outside of ApiConfigProvider
 * 
 * @example
 * ```tsx
 * const calendarConfig = useCalendarApiConfig();
 * const endpoint = calendarConfig?.get; // "api/calendar/" or custom value
 * ```
 */
export const useCalendarApiConfig = (): CalendarApiEndpoints | undefined => {
  return useServiceApiConfig('calendar') as CalendarApiEndpoints | undefined;
};
