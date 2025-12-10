/** @format */

import { Route, Routes } from "react-router-dom";
import {
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import Home from "../Routes/Home/Home";
import React, { useEffect, useRef, useCallback } from "react";
import { VisitedCoursesNavigationAdapter } from "../Courses/Navigation/VisitedCoursesNavigationAdapter";
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";
import { useCourseRoutes } from "../Courses/hooks/useCourseRoutes";
import { useCourseNavigationStore } from "../Courses/store/useCourseNavigationStore";

/**
 * Core component for handling top-level app routing and microservices.
 *
 * @version 3.0.0
 * @breaking-changes
 * - Course routing has been moved to CourseMicroservice component
 * - This component now only handles app-level routes (Home, Help, Contact)
 * - Course microservices should be nested inside CourseMicroservice
 *
 * Architecture:
 * - Microservices handles: /, /help, /contact, dynamic app microservices
 * - CourseMicroservice handles: /:code, /:code/:instance, /:code/:instance/:microservice
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components (e.g., CourseMicroservice)
 */
const Microservices = ({ children }: { children: React.ReactNode }) => {
  // Get dynamic microservice routes (for app-level microservices registered via NavigationRegistry)
  const microserviceRoutes = useMicroserviceRoutes();
  // Get course routes (for course microservices) - this triggers re-render when routes change
  const courseRoutes = useCourseRoutes();
  
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
    
    // Only update if we have both sections and course microservices
    if (sectionsCount > 0 && courseMsCount > 0) {
      console.log("[Microservices] Updating navigation structure...", { sectionsCount, courseMsCount });
      navStore.updateMicroserviceNavigationForSections();
      navStore.recalculateNavigation();
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
      <VisitedCoursesNavigationAdapter />
      {/* Render children - this includes CourseMicroservice with its nested routes */}
      {children}
      {/* App-level routes */}
      <Routes>
        <Route path="" element={<Home />} index />
        {/* Dynamic app-level microservice routes */}
        {microserviceRoutes}
        {/* Course routes */}
        {courseRoutes}
        <Route path="help" element={<div>Help</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Routes>
    </>
  );
};

export default Microservices;
