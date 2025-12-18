/** @format */

/**
 * User data type definition.
 * This is defined here to avoid circular dependencies.
 */
export type userId = string;
export type navigationTypes = "direct" | "instances";
export type gender = "male" | "female" | "other";

export type PlatformRole =
  | "admin"
  | "developer"
  | "moderator"
  | "creator"
  | "user"
  | "guest";

export interface UserData {
  id: userId;
  name: string;
  email: string;
  gender?: gender;
  image?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  department?: string;
  platformRoles: PlatformRole[];
  privacySettings: {
    allowAnalytics: boolean;
    allowPersonalization: boolean;
    allowCommunications: boolean;
    allowThirdPartySharing: boolean;
  };
  gdprConsent: {
    accepted: boolean;
    acceptedDate?: string;
    lastUpdated: string;
  };
  dataRetention: {
    deleteAccountAfterInactivity?: number;
    deleteDataAfterAccountDeletion?: number;
  };
  preferences: {
    navigationType: navigationTypes;
    visibleCourseLists: {
      isStudent: boolean;
      isStudentOld: boolean;
      isTeacher: boolean;
      isTeacherOld: boolean;
      available: boolean;
    };
    lastVisitedCourses: string[];
    visibleNavigation: string[];
  };
}

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
