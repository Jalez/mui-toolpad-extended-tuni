/** @format */

export { default as CalendarMicroservice } from './CalendarMicroservice';
export { default as Calendar } from './Calendar';
export { default as CalendarManager } from './CalendarManager';
export { default as CalendarEventAggregator } from './CalendarEventAggregator';
export type { CalendarEventType } from './types';

// Export API configuration types
export type { CalendarApiEndpoints } from '@mui-toolpad-extended-tuni/core';

// Export CalendarMicroserviceProps type
export type { CalendarMicroserviceProps } from './CalendarMicroservice';

// Export API configuration hooks
export { useCalendarApiConfig } from './hooks/useCalendarApiConfig';

// Export calendar store and types
export { useCalendarStore, createCalendarEvent, getContrastColor } from './store/useCalendarStore';
export type { CalendarEvent } from './store/useCalendarStore';
