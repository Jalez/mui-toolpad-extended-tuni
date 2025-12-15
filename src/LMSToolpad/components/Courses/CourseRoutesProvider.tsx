/** @format */

import { useEffect } from "react";
import { registerRouteProvider, unregisterRouteProvider } from "../Navigation/NavigationRegistry";
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

  useEffect(() => {
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



