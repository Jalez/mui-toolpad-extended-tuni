/** @format */

import React, { ReactNode } from "react";
import { UserManager } from "./UserManager";
import UserEventPublisher from "./UserEventPublisher";

interface UserMicroserviceProps {
  children?: ReactNode;
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
 * Other modules can subscribe to UserBus to react to user changes.
 * Direct useUserStore access is still allowed for simple lookups.
 *
 * This component should be used in App.tsx, not LMSProvider.tsx, to maintain
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
const UserMicroservice: React.FC<UserMicroserviceProps> = ({ children }) => {
  return (
    <>
      <UserManager />
      <UserEventPublisher />
      {children}
    </>
  );
};

export default UserMicroservice;
