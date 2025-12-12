/** @format */

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useMemo } from "react";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import CourseRoutesProvider from "./CourseRoutesProvider";
import CourseManager from "./CourseManager";

/**
 * Context for course microservices to register themselves
 */
interface CourseMicroserviceContextValue {
  registerCourseMicroservice: (navigation: NavigationPageStoreItem) => void;
  unregisterCourseMicroservice: (segment: string) => void;
  allCourseMicroserviceNavigation: NavigationPageStoreItem[];
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
  allCourseMicroserviceNavigation: [],
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
 * @version 3.0.0
 *
 * Fully self-contained microservice that handles all course-related functionality:
 * - Course data fetching and management (via CourseManager)
 * - Course navigation building
 * - Course code and instance routing (/:code, /:code/:instance)
 * - Course tools display
 * - Course microservice registration and routing (/:code/:instance/:microservice)
 * - Route registration with NavigationRegistry (via CourseRoutesProvider)
 *
 * Course microservices (like EduTest) are passed as children and register
 * themselves through the CourseMicroserviceContext.
 *
 * Routes handled:
 * - /:code - Course code selection (CourseCodeLoader + CourseInstanceSelector)
 * - /:code/:instance - Course instance (CourseInstanceLoader + CourseTools)
 * - /:code/:instance/:microservice/* - Course microservice routes
 *
 * @breaking-changes
 * - v3.0.0: Now fully self-contained - includes CourseManager and CourseRoutesProvider
 * - v2.0.0: Uses local state instead of Zustand store
 * - Context provides allCourseMicroserviceNavigation array
 * - Integrates with useNavigationStore to notify about course microservices
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
  const [allCourseMicroserviceNavigation, setAllCourseMicroserviceNavigation] = useState<NavigationPageStoreItem[]>([]);

  // Sync with navigation store whenever local state changes
  // This decouples the registration from the store notification
  useEffect(() => {
    const navStore = useNavigationStore.getState();
    navStore.setExternalMicroservices(allCourseMicroserviceNavigation);
  }, [allCourseMicroserviceNavigation]);

  // Memoized registration functions to prevent infinite loops
  // These functions maintain stable references across renders
  const registerCourseMicroservice = useCallback((navigation: NavigationPageStoreItem) => {
    setAllCourseMicroserviceNavigation((prev) => {
      // Check if already exists
      if (prev.find((ms) => ms.segment === navigation.segment)) {
        return prev;
      }

      const updated = [...prev, navigation];

      return updated;
    });
  }, []);

  const unregisterCourseMicroservice = useCallback((segment: string) => {
    setAllCourseMicroserviceNavigation((prev) => {
      const updated = prev.filter((ms) => ms.segment !== segment);
      return updated;
    });
  }, []);

  // Memoize context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo<CourseMicroserviceContextValue>(() => ({
    registerCourseMicroservice,
    unregisterCourseMicroservice,
    allCourseMicroserviceNavigation,
    isInsideCourseMicroservice: true,
  }), [registerCourseMicroservice, unregisterCourseMicroservice, allCourseMicroserviceNavigation]);

  return (
    <CourseMicroserviceContext.Provider value={contextValue}>
      {/* Course infrastructure - must be inside context */}
      <CourseManager />
      {/* Render children (course microservices like EduTest) so they can register */}
      {children}
      {/* CourseRoutesProvider must be inside context to access registered microservices */}
      <CourseRoutesProvider />
    </CourseMicroserviceContext.Provider>
  );
};

export default CourseMicroservice;
