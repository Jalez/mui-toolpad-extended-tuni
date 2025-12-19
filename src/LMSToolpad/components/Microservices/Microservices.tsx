/** @format */

import { Route, Routes } from "react-router-dom";
import {
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import Home from "../Routes/Home/Home";
import React, { useEffect, useRef, useCallback } from "react";
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";

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
 * - Course microservices are managed by CourseMicroservice component via context (not tightly coupled here)
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components (e.g., CourseMicroservice)
 */
const Microservices = ({ children }: { children: React.ReactNode }) => {
  // Get dynamic microservice routes (includes both app-level microservices and route providers like course routes)
  const microserviceRoutes = useMicroserviceRoutes();
  
  // Track if we've already done initial navigation setup
  const hasInitializedRef = useRef(false);
  const lastSectionsCountRef = useRef(0);
  
  // Stable function refs to avoid re-triggering effects
  const updateNavigation = useCallback(() => {
    const navStore = useNavigationStore.getState();
    
    const sectionsCount = Object.keys(navStore.sections).length;
    const visibleSectionsCount = Object.values(navStore.visibleSections).filter(Boolean).length;
    
    // Only update if we have sections and visible sections
    if (sectionsCount > 0 && visibleSectionsCount > 0) {
      // Update navigation structure - this now automatically recalculates navigation
      // within the same state update, ensuring we use the updated sections
      navStore.updateMicroserviceNavigationForSections();
    }
  }, []);
  
  // Subscribe to store changes outside of React's render cycle for navigation updates
  useEffect(() => {
    // Initial update after mount
    const timeoutId = setTimeout(() => {
      hasInitializedRef.current = true;
      updateNavigation();
    }, 100);
    
    // Subscribe to navigation store changes
    const unsubscribeNav = useNavigationStore.subscribe((state) => {
      const newCount = Object.keys(state.sections).length;
      if (newCount !== lastSectionsCountRef.current) {
        lastSectionsCountRef.current = newCount;
        if (hasInitializedRef.current) {
          updateNavigation();
        }
      }
    });
    
    return () => {
      clearTimeout(timeoutId);
      unsubscribeNav();
    };
  }, [updateNavigation]);

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Microservices.tsx:79',message:'Rendering Routes',data:{routeCount:microserviceRoutes.length,routeTypes:microserviceRoutes.map((r:any)=>r?.type?.name || r?.type?.displayName || 'unknown')},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'T'})}).catch(()=>{});
  // #endregion
  return (
    <>
      {/* Render children - this includes CourseMicroservice with its nested routes */}
      {children}
      {/* App-level routes */}
      <Routes>
        <Route path="" element={<Home />} index />
        {/* Dynamic microservice routes (includes app-level microservices and route providers) */}
        {microserviceRoutes}
      </Routes>
    </>
  );
};

export default Microservices;
