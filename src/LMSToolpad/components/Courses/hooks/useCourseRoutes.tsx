/** @format */

import React, { useMemo } from "react";
import type { ReactElement } from "react";
import { Route, useNavigate, useLocation } from "react-router-dom";
import CourseCodeLoader from "../CourseCodeLoader";
import CourseInstanceSelector from "../CourseInstanceSelector";
import CourseInstanceLoader from "../CourseInstanceLoader";
import CourseTools from "../CourseTools";
import { NavigationPageStoreItem } from "../../Navigation/store/useNavigationStore";
import { useCourseNavigationStore } from "../store/useCourseNavigationStore";
import { Typography, IconButton, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SubSections from "../../Microservices/MicroserviceSubsections";

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

/**
 * Component wrapper that provides navigation context for course routes
 */
const CourseRouteWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
}> = ({ children, title, showTitle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {title && showTitle !== false && (
        <PageHeader
          title={title}
          onBack={() => navigate(getParentPath(location.pathname))}
        />
      )}
      {children}
    </>
  );
};

/**
 * Hook that generates course routes from registered course microservices
 * @returns Array of Route elements for course routing
 */
export const useCourseRoutes = () => {
  const { allCourseMicroserviceNavigation } = useCourseNavigationStore();

  console.log("[useCourseRoutes] Course microservices:", allCourseMicroserviceNavigation.length, allCourseMicroserviceNavigation.map(ms => ms.segment));

  return useMemo(() => {
    console.log("[useCourseRoutes] Generating routes for", allCourseMicroserviceNavigation.length, "microservices");
    const routes: ReactElement[] = [];

    // Course routes structure
    routes.push(
      <Route key="course-routes" path=":code" element={<CourseCodeLoader />}>
        <Route index element={<CourseInstanceSelector />} />
        <Route path=":instance" element={<CourseInstanceLoader />}>
          <Route
            index
            element={<CourseTools microservices={allCourseMicroserviceNavigation} />}
          />
          {/* Dynamic routes for registered course microservices */}
          {allCourseMicroserviceNavigation.map((nav) => (
            <Route key={nav.segment} path={nav.segment}>
              <Route
                index
                element={
                  <CourseRouteWrapper title={nav.title} showTitle={nav.showTitle}>
                    {nav.children && nav.children.length > 0 && (
                      <SubSections
                        children={nav.children as NavigationPageStoreItem[]}
                      />
                    )}
                    {nav.view && <nav.view />}
                  </CourseRouteWrapper>
                }
              />
              {nav.children?.map((child) => (
                <Route key={child.segment} path={child.segment}>
                  <Route
                    index
                    element={
                      <CourseRouteWrapper
                        title={child.title}
                        showTitle={child.showTitle}
                      >
                        {child.children && child.children.length > 0 && (
                          <SubSections
                            children={
                              child.children as NavigationPageStoreItem[]
                            }
                          />
                        )}
                        {child.view && <child.view />}
                      </CourseRouteWrapper>
                    }
                  />
                  {child.children?.map((subChild) => (
                    <Route
                      key={subChild.segment}
                      path={subChild.segment}
                      element={
                        <CourseRouteWrapper
                          title={subChild.title}
                          showTitle={subChild.showTitle}
                        >
                          {subChild.view ? <subChild.view /> : null}
                        </CourseRouteWrapper>
                      }
                    />
                  ))}
                </Route>
              ))}
            </Route>
          ))}
        </Route>
      </Route>
    );

    return routes;
  }, [allCourseMicroserviceNavigation]);
};

