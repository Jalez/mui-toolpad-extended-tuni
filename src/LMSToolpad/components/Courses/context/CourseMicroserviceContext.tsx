/** @format */

import React, { createContext, useContext, ReactNode, useState, useCallback, useEffect, useMemo } from "react";
import { NavigationPageStoreItem } from "../../Navigation/store/types";
import { useNavigationStore } from "../../Navigation/store/useNavigationStore";

/**
 * Context for course microservices to register themselves
 */
export interface CourseMicroserviceContextValue {
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

export const CourseMicroserviceContext = createContext<CourseMicroserviceContextValue>(defaultContextValue);

/**
 * Hook for course microservices to register themselves.
 * Returns isInsideCourseMicroservice=false if used outside CourseMicroservice provider.
 */
export const useCourseMicroserviceRegistration = () => {
  return useContext(CourseMicroserviceContext);
};

interface CourseMicroserviceProviderProps {
  children: ReactNode;
}

/**
 * Provider component for CourseMicroserviceContext.
 * Manages the state of registered course microservices and syncs with the navigation store.
 */
export const CourseMicroserviceProvider: React.FC<CourseMicroserviceProviderProps> = ({ children }) => {
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
      {children}
    </CourseMicroserviceContext.Provider>
  );
};
