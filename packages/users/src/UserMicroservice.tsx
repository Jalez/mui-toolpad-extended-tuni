/** @format */

import React, { ReactNode, useEffect } from "react";
import { UserManager } from "./UserManager";
import UserEventPublisher from "./UserEventPublisher";
import { configureUserBus } from "./configureUserBus";
import { registerApiEndpoints } from "@mui-toolpad-extended-tuni/core";
import type { UsersApiEndpoints } from "@mui-toolpad-extended-tuni/core";

export interface UserMicroserviceProps {
  children?: ReactNode;
  /** API endpoint configuration for the users microservice */
  apiEndpoints?: UsersApiEndpoints;
}

/**
 * UserMicroservice Component
 *
 * @version 1.0.0
 *
 * Self-contained microservice that handles all user-related functionality:
 * - User lifecycle management (via UserManager)
 * - User state change publishing to UserBus (via UserEventPublisher)
 * - User data synchronization with navigation filters
 *
 * Other modules should subscribe to UserBus (via hooks like useCurrentUser, useUserActions)
 * to react to user changes. Direct useUserStore access is only allowed within the Users
 * module itself, in Events/UserBus for delegation, and in DevTools components.
 *
 * This component should be used in App.tsx, not ToolpadProvider.tsx, to maintain
 * proper separation of concerns and avoid tight coupling.
 *
 * @example
 * ```tsx
 * <Microservices>
 *   <UserMicroservice />
 *   <CalendarMicroservice />
 *   <CourseMicroservice>
 *     <EduTest />
 *   </CourseMicroservice>
 * </Microservices>
 * ```
 */
const UserMicroservice: React.FC<UserMicroserviceProps> = ({ children, apiEndpoints }) => {
  // UserBus is already configured synchronously in index.ts, but ensure it's configured as a safety net
  useEffect(() => {
    configureUserBus();
  }, []);

  // Register API endpoints when component mounts or endpoints change
  // Always register (either user-provided or empty to get defaults)
  useEffect(() => {
    registerApiEndpoints('users', apiEndpoints || {});
  }, [apiEndpoints]);

  return (
    <>
      <UserManager />
      <UserEventPublisher />
      {children}
    </>
  );
};

export default UserMicroservice;
