/** @format */

import { Route, Routes } from "react-router-dom";
import {
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import Home from "../Routes/Home/Home";
import React, { useEffect, useRef, useCallback } from "react";
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";
import { useCourseNavigationStore } from "../Courses/store/useCourseNavigationStore";

/**
 * Core component for handling top-level app routing and microservices.
 *
 * @version 3.1.0
 * @breaking-changes
 * - Course routing has been moved to CourseMicroservice component
 * - This component is now microservice-agnostic - it doesn't directly import course routes
 * - Course routes register themselves via CourseRoutesProvider using NavigationRegistry
 *
 * Architecture:
 * - Microservices handles: /, /help, /contact, dynamic microservices (via NavigationRegistry)
 * - Course routes register themselves as route providers via CourseRoutesProvider
 * - All routes are retrieved through useMicroserviceRoutes() which includes route providers
 * - CourseMicroservice handles: /:code, /:code/:instance, /:code/:instance/:microservice
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components (e.g., CourseMicroservice)
 */
const Microservices = ({ children }: { children: React.ReactNode }) => {
  // Get dynamic microservice routes (includes both app-level microservices and route providers like course routes)
  const microserviceRoutes = useMicroserviceRoutes();
  
  // Subscribe to course navigation store to ensure re-render when microservices register
  // This is needed because the routes need to re-render when new microservices are added
  const courseMicroserviceCount = useCourseNavigationStore(
    (state) => state.allCourseMicroserviceNavigation.length
  );
  
  // Track if we've already done initial navigation setup
  const hasInitializedRef = useRef(false);
  const lastSectionsCountRef = useRef(0);
  const lastCourseMsCountRef = useRef(0);
  
  // Stable function refs to avoid re-triggering effects
  const updateNavigation = useCallback(() => {
    const navStore = useNavigationStore.getState();
    const courseStore = useCourseNavigationStore.getState();
    
    const sectionsCount = Object.keys(navStore.sections).length;
    const courseMsCount = courseStore.allCourseMicroserviceNavigation.length;
    const visibleSectionsCount = Object.values(navStore.visibleSections).filter(Boolean).length;
    
    // Only update if we have both sections and course microservices
    // Also check if there are visible sections to avoid unnecessary updates
    if (sectionsCount > 0 && courseMsCount > 0 && visibleSectionsCount > 0) {
      console.log("[Microservices] Updating navigation structure...", { 
        sectionsCount, 
        courseMsCount, 
        visibleSectionsCount,
        visibleSections: Object.keys(navStore.visibleSections).filter(k => navStore.visibleSections[k])
      });
      // Update navigation structure - this now automatically recalculates navigation
      // within the same state update, ensuring we use the updated sections
      navStore.updateMicroserviceNavigationForSections();
    } else {
      console.log("[Microservices] Skipping navigation update - conditions not met:", {
        sectionsCount,
        courseMsCount,
        visibleSectionsCount
      });
    }
  }, []);

  // Subscribe to store changes outside of React's render cycle for navigation updates
  useEffect(() => {
    console.log("[Microservices] Setting up subscriptions...");
    
    // Initial update after mount
    const timeoutId = setTimeout(() => {
      console.log("[Microservices] Initial timeout fired, setting initialized");
      hasInitializedRef.current = true;
      updateNavigation();
    }, 100);
    
    // Subscribe to ALL store changes (not using selector since subscribeWithSelector isn't configured)
    const unsubscribeCourse = useCourseNavigationStore.subscribe((state) => {
      const newCount = state.allCourseMicroserviceNavigation.length;
      if (newCount !== lastCourseMsCountRef.current) {
        console.log("[Microservices] Course microservices changed:", lastCourseMsCountRef.current, "->", newCount);
        lastCourseMsCountRef.current = newCount;
        if (hasInitializedRef.current) {
          updateNavigation();
        }
      }
    });
    
    // Subscribe to navigation store changes
    const unsubscribeNav = useNavigationStore.subscribe((state) => {
      const newCount = Object.keys(state.sections).length;
      if (newCount !== lastSectionsCountRef.current) {
        console.log("[Microservices] Sections changed:", lastSectionsCountRef.current, "->", newCount);
        lastSectionsCountRef.current = newCount;
        if (hasInitializedRef.current) {
          updateNavigation();
        }
      }
    });
    
    return () => {
      clearTimeout(timeoutId);
      unsubscribeCourse();
      unsubscribeNav();
    };
  }, [updateNavigation]);

  // Log for debugging - can remove later
  console.log("[Microservices] Rendering with", courseMicroserviceCount, "course microservices");

  return (
    <>
      {/* Render children - this includes CourseMicroservice with its nested routes */}
      {children}
      {/* App-level routes */}
      <Routes>
        <Route path="" element={<Home />} index />
        {/* Dynamic microservice routes (includes app-level microservices and route providers) */}
        {microserviceRoutes}
        <Route path="help" element={<div>Help</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Routes>
    </>
  );
};

export default Microservices;
