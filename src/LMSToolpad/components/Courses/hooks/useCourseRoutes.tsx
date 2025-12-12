/** @format */

import React, { useMemo } from "react";
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import CourseCodeLoader from "../CourseCodeLoader";
import CourseInstanceSelector from "../CourseInstanceSelector";
import CourseInstanceLoader from "../CourseInstanceLoader";
import CourseTools from "../CourseTools";
import { NavigationPageStoreItem } from "../../Navigation/store/useNavigationStore";
import { useCourseMicroserviceRegistration } from "../CourseMicroservice";
import SubSections from "../../Microservices/MicroserviceSubsections";

/**
 * Component wrapper that provides navigation context for course routes
 */
const CourseRouteWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
}> = ({ children }) => {
  return <>{children}</>;
};

/**
 * Hook that generates course routes from registered course microservices
 * @returns Array of Route elements for course routing
 */
export const useCourseRoutes = () => {
  const { allCourseMicroserviceNavigation } = useCourseMicroserviceRegistration();

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

