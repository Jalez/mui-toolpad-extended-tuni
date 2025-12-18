/** @format */

import { createWithEqualityFn } from "zustand/traditional";
import { devtools } from "zustand/middleware";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    courseCode?: string;
    courseTitle?: string;
    type?: string;
    description?: string;
    location?: string;
    [key: string]: any;
  };
}


interface CalendarState {
  events: CalendarEvent[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setEvents: (events: CalendarEvent[]) => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (eventId: string, updates: Partial<CalendarEvent>) => void;
  removeEvent: (eventId: string) => void;
  clearEvents: () => void;

  // Loading and error states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Utility functions
  getEventsForDateRange: (start: Date, end: Date) => CalendarEvent[];
}

export const useCalendarStore = createWithEqualityFn<CalendarState>()(
  devtools(
    (set, get) => ({
      events: [],
      isLoading: false,
      error: null,

      setEvents: (events) => set({ events }),

      addEvent: (event) => set((state) => ({
        events: [...state.events, event]
      })),

      updateEvent: (eventId, updates) => set((state) => ({
        events: state.events.map(event =>
          event.id === eventId ? { ...event, ...updates } : event
        )
      })),

      removeEvent: (eventId) => set((state) => ({
        events: state.events.filter(event => event.id !== eventId)
      })),

      clearEvents: () => set({ events: [] }),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      getEventsForDateRange: (start, end) => {
        const { events } = get();
        return events.filter(event => {
          const eventStart = new Date(event.start);
          const eventEnd = event.end ? new Date(event.end) : eventStart;
          return eventStart <= end && eventEnd >= start;
        });
      },
    }),
    {
      name: 'calendar-store',
    }
  )
);

// Helper functions for event creation (can be used by adapters)
export const getContrastColor = (hexColor: string): string => {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
};

export const createCalendarEvent = (
  id: string,
  title: string,
  start: Date | string,
  end?: Date | string,
  options?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    extendedProps?: Record<string, any>;
  }
): CalendarEvent => ({
  id,
  title,
  start,
  end: end || start,
  backgroundColor: options?.backgroundColor || '#2196f3',
  borderColor: options?.borderColor || '#1976d2',
  textColor: options?.textColor || getContrastColor(options?.backgroundColor || '#2196f3'),
  extendedProps: options?.extendedProps || {},
});
