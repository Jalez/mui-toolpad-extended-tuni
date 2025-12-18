/** @format */

import { useEffect } from "react";
import { useCalendarStore, CalendarEvent, getContrastColor } from "./store/useCalendarStore";
import { eventBus, Event } from "mui-toolpad-extended-tuni";

// Course-specific color configuration (defined at the aggregation level)
const courseSubjectConfig: Record<string, { baseColor: string; levelShades: Record<string, string> }> = {
  "COMP.CS": {
    baseColor: "#2196f3", // Blue
    levelShades: {
      basic: "#90caf9", // Light blue
      intermediate: "#2196f3", // Medium blue
      advanced: "#1565c0", // Dark blue
    },
  },
  MATH: {
    baseColor: "#4caf50", // Green
    levelShades: {
      basic: "#a5d6a7",
      intermediate: "#4caf50",
      advanced: "#2e7d32",
    },
  },
  PHYS: {
    baseColor: "#f44336", // Red
    levelShades: {
      basic: "#ef9a9a",
      intermediate: "#f44336",
      advanced: "#c62828",
    },
  },
  BIO: {
    baseColor: "#9c27b0", // Purple
    levelShades: {
      basic: "#ce93d8",
      intermediate: "#9c27b0",
      advanced: "#6a1b9a",
    },
  },
  CHEM: {
    baseColor: "#ff9800", // Orange
    levelShades: {
      basic: "#ffb74d",
      intermediate: "#ff9800",
      advanced: "#ef6c00",
    },
  },
  LANG: {
    baseColor: "#795548", // Brown
    levelShades: {
      basic: "#a1887f",
      intermediate: "#795548",
      advanced: "#4e342e",
    },
  },
};

/**
 * CalendarEventAggregator coordinates between the EventBus and the Calendar store.
 * This component subscribes to generic events from the EventBus and converts them
 * to CalendarEvent format for the calendar display.
 * It's placed at the application level to maintain proper separation of concerns.
 */
const CalendarEventAggregator: React.FC = () => {
  const { setEvents, clearEvents } = useCalendarStore();

  // Subscribe to EventBus events
  useEffect(() => {
    const unsubscribe = eventBus.subscribe((events: Event[]) => {
      if (events.length > 0) {
        // Convert generic Events to CalendarEvents
        const calendarEvents: CalendarEvent[] = events.map(event => {
          const metadata = event.metadata || {};

          // Determine colors based on event metadata
          let backgroundColor = '#2196f3'; // Default blue
          let borderColor = '#1976d2';

          if (metadata.source === 'courses' && metadata.subject && metadata.courseLevel) {
            const config = courseSubjectConfig[metadata.subject] || courseSubjectConfig['COMP.CS'];
            backgroundColor = config.levelShades[metadata.courseLevel] || config.levelShades.basic;
            borderColor = config.baseColor;
          }

          return {
            id: event.id,
            title: event.title,
            start: event.start,
            end: event.end,
            backgroundColor,
            borderColor,
            textColor: getContrastColor(backgroundColor),
            extendedProps: metadata,
          };
        });

        setEvents(calendarEvents);
      } else {
        clearEvents();
      }
    });

    return unsubscribe;
  }, [setEvents, clearEvents]);

  return null; // This component doesn't render anything
};

export default CalendarEventAggregator;
