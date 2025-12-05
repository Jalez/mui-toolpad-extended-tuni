/** @format */

import React, { createContext, useContext, ReactNode } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import CourseCodeLoader from "./CourseCodeLoader";
import CourseInstanceSelector from "./CourseInstanceSelector";
import CourseInstanceLoader from "./CourseInstanceLoader";
import CourseTools from "./CourseTools";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubSections from "../Microservices/MicroserviceSubsections";

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

/**
 * Page header component with back button and title
 */
const PageHeader: React.FC<{ title: string; onBack?: () => void }> = ({
  title,
  onBack,
}) => (
  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
    {onBack && (
      <IconButton
        onClick={onBack}
        sx={{ mr: 1, color: "primary.main" }}
        aria-label="Go back"
      >
        <ArrowBackIcon />
      </IconButton>
    )}
    <Typography variant="h2" sx={{ color: "primary.main" }}>
      {title}
    </Typography>
  </Box>
);

/**
 * Helper function to get parent path for back navigation
 */
const getParentPath = (currentPath: string) => {
  const pathSegments = currentPath.split("/").filter(Boolean);
  pathSegments.pop();
  return "/" + pathSegments.join("/");
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
  const navigate = useNavigate();
  const location = useLocation();
  const { allMicroserviceNavigation, addMicroserviceNavigation } =
    useNavigationStore();

  // Registration functions for course microservices
  const registerCourseMicroservice = (navigation: NavigationPageStoreItem) => {
    addMicroserviceNavigation(navigation);
  };

  const unregisterCourseMicroservice = (segment: string) => {
    // Note: Currently the store doesn't support removal, but we expose it for future use
    console.log(`Unregister course microservice: ${segment}`);
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

      {/* Course routing structure - handles /:code/* paths */}
      <Routes>
        <Route path=":code" element={<CourseCodeLoader />}>
          <Route index element={<CourseInstanceSelector />} />
          <Route path=":instance" element={<CourseInstanceLoader />}>
            <Route
              index
              element={<CourseTools microservices={allMicroserviceNavigation} />}
            />
            {/* Dynamic routes for registered course microservices */}
            {allMicroserviceNavigation.map((nav) => (
              <Route key={nav.segment} path={nav.segment}>
                <Route
                  index
                  element={
                    <>
                      {nav.title && nav.showTitle !== false && (
                        <PageHeader
                          title={nav.title}
                          onBack={() =>
                            navigate(getParentPath(location.pathname))
                          }
                        />
                      )}
                      {nav.children && nav.children.length > 0 && (
                        <SubSections
                          children={nav.children as NavigationPageStoreItem[]}
                        />
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
                          {child.title && child.showTitle !== false && (
                            <PageHeader
                              title={child.title}
                              onBack={() =>
                                navigate(getParentPath(location.pathname))
                              }
                            />
                          )}
                          {child.children && child.children.length > 0 && (
                            <SubSections
                              children={
                                child.children as NavigationPageStoreItem[]
                              }
                            />
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
                            {subChild.title && subChild.showTitle !== false && (
                              <PageHeader
                                title={subChild.title}
                                onBack={() =>
                                  navigate(getParentPath(location.pathname))
                                }
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
    </CourseMicroserviceContext.Provider>
  );
};

export default CourseMicroservice;
