/** @format */

import type { UserData } from "../Users/store/useUserStore";

export type { UserData };

/**
 * User event types for UserBus communication.
 * These events are published when user state changes occur.
 */
export type UserEventType =
  | "user:loggedIn"
  | "user:updated"
  | "user:preferencesChanged"
  | "user:loggedOut";

export interface UserEvent {
  type: UserEventType;
  user: UserData | null;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface UserLoggedInEvent extends UserEvent {
  type: "user:loggedIn";
  user: UserData;
}

export interface UserUpdatedEvent extends UserEvent {
  type: "user:updated";
  user: UserData;
  previousUser?: UserData;
}

export interface UserPreferencesChangedEvent extends UserEvent {
  type: "user:preferencesChanged";
  user: UserData;
  changedPreferences?: string[];
}

export interface UserLoggedOutEvent extends UserEvent {
  type: "user:loggedOut";
  user: null;
}
