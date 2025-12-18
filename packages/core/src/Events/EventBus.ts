/** @format */

import { Event } from "./types";

/**
 * Event Bus for decoupling event producers from consumers.
 * Modules can publish events and other modules can subscribe to them.
 * This is a generic event system that any module can use.
 */
export class EventBus {
  private static instance: EventBus;
  private subscribers: Set<(events: Event[]) => void> = new Set();
  private events: Map<string, Event> = new Map();

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Subscribe to event updates
   */
  subscribe(callback: (events: Event[]) => void): () => void {
    this.subscribers.add(callback);

    // Send current events immediately
    callback(Array.from(this.events.values()));

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
    };
  }

  /**
   * Publish events to the bus
   */
  publish(sourceId: string, events: Event[]): void {
    // Remove old events from this source
    Array.from(this.events.keys())
      .filter(key => key.startsWith(`${sourceId}:`))
      .forEach(key => this.events.delete(key));

    // Add new events with source prefix
    events.forEach(event => {
      this.events.set(`${sourceId}:${event.id}`, event);
    });

    // Notify subscribers
    const allEvents = Array.from(this.events.values());
    this.subscribers.forEach(callback => callback(allEvents));
  }

  /**
   * Remove all events from a specific source
   */
  removeSource(sourceId: string): void {
    const keysToRemove = Array.from(this.events.keys())
      .filter(key => key.startsWith(`${sourceId}:`));

    keysToRemove.forEach(key => this.events.delete(key));

    // Notify subscribers
    const allEvents = Array.from(this.events.values());
    this.subscribers.forEach(callback => callback(allEvents));
  }

  /**
   * Get all current events
   */
  getAllEvents(): Event[] {
    return Array.from(this.events.values());
  }

  /**
   * Clear all events
   */
  clear(): void {
    this.events.clear();
    this.subscribers.forEach(callback => callback([]));
  }
}

// Export singleton instance
export const eventBus = EventBus.getInstance();
