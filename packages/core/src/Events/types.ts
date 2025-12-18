/** @format */

/**
 * Generic Event interface that can be used by any module.
 * This is the base event type for the Events API.
 */
export interface Event {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  metadata?: Record<string, any>;
}

/**
 * Event source identifier type for tracking which module published the event
 */
export type EventSource = string;
