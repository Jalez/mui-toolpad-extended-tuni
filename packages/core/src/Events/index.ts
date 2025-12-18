/** @format */

export { EventBus, eventBus } from './EventBus';
export type { Event, EventSource } from './types';

// UserBus exports - class only, instance configured in users package
export { UserBus } from './UserBus';
export type { UserBusStoreConfig } from './UserBus';
export type { UserData, UserEvent, UserEventType, PlatformRole, navigationTypes, gender, userId } from './userTypes';

// UserBus hooks
export { useCurrentUser } from './hooks/useCurrentUser';
export { useUserPreferences } from './hooks/useUserPreferences';
export { useUserActions } from './hooks/useUserActions';
export type { UserPreferences } from './hooks/useUserPreferences';
