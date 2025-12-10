/** @format */

import React, { createContext, useContext, ReactNode } from "react";
import {
  NavigationPageStoreItem,
} from "../Navigation/store/useNavigationStore";
import { useCourseNavigationStore } from "./store/useCourseNavigationStore";

/**
 * Context for course microservices to register themselves
 */
interface CourseMicroserviceContextValue {
  registerCourseMicroservice: (navigation: NavigationPageStoreItem) => void;
  unregisterCourseMicroservice: (segment: string) => void;
  isInsideCourseMicroservice: boolean;
}

// Default context value that signals we're NOT inside CourseMicroservice
const defaultContextValue: CourseMicroserviceContextValue = {
  registerCourseMicroservice: () => {
    console.warn("registerCourseMicroservice called outside CourseMicroservice context");
  },
  unregisterCourseMicroservice: () => {
    console.warn("unregisterCourseMicroservice called outside CourseMicroservice context");
  },
  isInsideCourseMicroservice: false,
};

const CourseMicroserviceContext = createContext<CourseMicroserviceContextValue>(defaultContextValue);

/**
 * Hook for course microservices to register themselves.
 * Returns isInsideCourseMicroservice=false if used outside CourseMicroservice provider.
 */
export const useCourseMicroserviceRegistration = () => {
  return useContext(CourseMicroserviceContext);
};

interface CourseMicroserviceProps {
  children?: ReactNode;
}

/**
 * CourseMicroservice Component
 *
 * @version 1.0.0
 *
 * Self-contained microservice that handles all course-related functionality:
 * - Course code and instance routing (/:code, /:code/:instance)
 * - Course tools display
 * - Course microservice registration and routing (/:code/:instance/:microservice)
 *
 * Course microservices (like EduTest) are passed as children and register
 * themselves through the CourseMicroserviceContext.
 *
 * Routes handled:
 * - /:code - Course code selection (CourseCodeLoader + CourseInstanceSelector)
 * - /:code/:instance - Course instance (CourseInstanceLoader + CourseTools)
 * - /:code/:instance/:microservice/* - Course microservice routes
 *
 * @example
 * ```tsx
 * <CourseMicroservice>
 *   <EduTest />
 *   <EduTest2 />
 * </CourseMicroservice>
 * ```
 */
const CourseMicroservice: React.FC<CourseMicroserviceProps> = ({ children }) => {
  const {
    addCourseMicroserviceNavigation,
    removeCourseMicroserviceNavigation,
  } = useCourseNavigationStore();

  // Registration functions for course microservices
  const registerCourseMicroservice = (navigation: NavigationPageStoreItem) => {
    addCourseMicroserviceNavigation(navigation);
  };

  const unregisterCourseMicroservice = (segment: string) => {
    removeCourseMicroserviceNavigation(segment);
  };

  const contextValue: CourseMicroserviceContextValue = {
    registerCourseMicroservice,
    unregisterCourseMicroservice,
    isInsideCourseMicroservice: true,
  };

  return (
    <CourseMicroserviceContext.Provider value={contextValue}>
      {/* Render children (course microservices like EduTest) so they can register */}
      {children}
    </CourseMicroserviceContext.Provider>
  );
};

export default CourseMicroservice;
