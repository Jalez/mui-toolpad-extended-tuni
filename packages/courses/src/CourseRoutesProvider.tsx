/** @format */

import { useEffect } from "react";
import { registerRouteProvider, unregisterRouteProvider } from "mui-toolpad-extended-tuni";
import { useCourseRoutes } from "./hooks/useCourseRoutes";

/**
 * CourseRoutesProvider Component
 * 
 * Registers course routes with the NavigationRegistry as a route provider.
 * This allows Microservices.tsx to be microservice-agnostic - it doesn't need
 * to know about course routes specifically.
 * 
 * @version 1.0.0
 */
const CourseRoutesProvider = () => {
  const courseRoutes = useCourseRoutes();

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseRoutesProvider.tsx:17',message:'CourseRoutesProvider render',data:{routeCount:courseRoutes.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseRoutesProvider.tsx:20',message:'Registering route provider',data:{routeCount:courseRoutes.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion
    // Register course routes as a route provider
    registerRouteProvider("course-routes", () => courseRoutes);

    return () => {
      // Clean up registration on unmount
      unregisterRouteProvider("course-routes");
    };
  }, [courseRoutes]);

  // This component doesn't render anything - it just registers routes
  return null;
};

export default CourseRoutesProvider;



