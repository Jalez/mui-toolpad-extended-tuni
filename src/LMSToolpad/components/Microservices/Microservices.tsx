/** @format */

import { Route, Routes } from "react-router-dom";
import {
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import Home from "../Routes/Home/Home";
import React, { useEffect } from "react";
import { VisitedCoursesNavigationAdapter } from "../Courses/Navigation/VisitedCoursesNavigationAdapter";
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";

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
  const {
    allMicroserviceNavigation,
    updateMicroserviceNavigationForSections,
    sections,
  } = useNavigationStore();

  // Get dynamic microservice routes (for app-level microservices registered via NavigationRegistry)
  const microserviceRoutes = useMicroserviceRoutes();

  useEffect(() => {
    updateMicroserviceNavigationForSections();
  }, [
    allMicroserviceNavigation,
    updateMicroserviceNavigationForSections,
    sections,
  ]);

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
        <Route path="help" element={<div>Help</div>} />
        <Route path="contact" element={<div>Contact</div>} />
      </Routes>
    </>
  );
};

export default Microservices;
