/** @format */

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import CourseCodeLoader from "../Courses/CourseCodeLoader";
import CourseInstanceSelector from "../Courses/CourseInstanceSelector";
import CourseInstanceLoader from "../Courses/CourseInstanceLoader";
import CourseTools from "../Courses/CourseTools";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import Home from "../Routes/Home/Home";
import React, { useEffect } from "react";
import { VisitedCoursesNavigationAdapter } from "../Courses/Navigation/VisitedCoursesNavigationAdapter";
import { useMicroserviceRoutes } from "../Navigation/hooks/useMicroserviceRoutes";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubSections from "./MicroserviceSubsections";

/**
 * Page header component with back button and title
 */
const PageHeader: React.FC<{ title: string; onBack?: () => void }> = ({ title, onBack }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    {onBack && (
      <IconButton
        onClick={onBack}
        sx={{ mr: 1, color: 'primary.main' }}
        aria-label="Go back"
      >
        <ArrowBackIcon />
      </IconButton>
    )}
    <Typography variant="h2" sx={{ color: 'primary.main' }}>
      {title}
    </Typography>
  </Box>
);

/**
 * Core component for handling microservices and course-related routing.
 * Manages the integration between course navigation, tools, and microservices.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render
 */
const Microservices = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    allMicroserviceNavigation,
    updateMicroserviceNavigationForSections,
    sections,
  } = useNavigationStore();

  // Helper function to get parent path for back navigation
  const getParentPath = (currentPath: string) => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    // Remove the last segment to get parent path
    pathSegments.pop();
    return '/' + pathSegments.join('/');
  };

  // Get dynamic microservice routes
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
      {children}
      <Routes>
        <Route path="" element={<Home />} index />
        {/* Dynamic microservice routes */}
        {microserviceRoutes}
        <Route path="help" element={<div>Help</div>} />
        <Route path="contact" element={<div>Contact</div>} />
        <Route path=":code" element={<CourseCodeLoader />}>
          <Route index element={<CourseInstanceSelector />} />
          <Route path=":instance" element={<CourseInstanceLoader />}>
            <Route
              index
              element={
                <CourseTools microservices={allMicroserviceNavigation} />
              }
            />
            {allMicroserviceNavigation.map((nav) => (
              <Route key={nav.segment} path={nav.segment}>
                <Route
                  index
                  element={
                    <>
                      {nav.title && (nav.showTitle !== false) && (
                        <PageHeader
                          title={nav.title}
                          onBack={() => navigate(getParentPath(location.pathname))}
                        />
                      )}
                      {nav.children && nav.children.length > 0 && (
                        <SubSections children={nav.children as NavigationPageStoreItem[]} />
                      )}
                      {nav.view && <nav.view />}
                    </>
                  }
                />
                {nav.children?.map((child) => (
                  <Route key={child.segment} path={child.segment}>
                    <Route
                      index
                      element={
                        <>
                          {child.title && (child.showTitle !== false) && (
                            <PageHeader
                              title={child.title}
                              onBack={() => navigate(getParentPath(location.pathname))}
                            />
                          )}
                          {child.children && child.children.length > 0 && (
                            <SubSections children={child.children as NavigationPageStoreItem[]} />
                          )}
                          {child.view && <child.view />}
                        </>
                      }
                    />
                    {child.children?.map((subChild) => (
                      <Route
                        key={subChild.segment}
                        path={subChild.segment}
                        element={
                          <>
                            {subChild.title && (subChild.showTitle !== false) && (
                              <PageHeader
                                title={subChild.title}
                                onBack={() => navigate(getParentPath(location.pathname))}
                              />
                            )}
                            {subChild.view ? <subChild.view /> : null}
                          </>
                        }
                      />
                    ))}
                  </Route>
                ))}
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Microservices;
