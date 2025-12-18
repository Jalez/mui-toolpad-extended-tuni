/** @format */

import React, { useMemo } from "react";
import type { ReactElement } from "react";
import { Route } from "react-router-dom";
import CourseCodeLoader from "../CourseCodeLoader";
import CourseInstanceSelector from "../CourseInstanceSelector";
import CourseInstanceLoader from "../CourseInstanceLoader";
import CourseTools from "../CourseTools";
import { NavigationPageStoreItem, MicroserviceSubsections as SubSections } from "mui-toolpad-extended-tuni";
import { useCourseMicroserviceRegistration } from "../context/CourseMicroserviceContext";

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

  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useCourseRoutes.tsx:29',message:'useCourseRoutes called',data:{navCount:allCourseMicroserviceNavigation.length,navSegments:allCourseMicroserviceNavigation.map(n=>n.segment)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return useMemo(() => {
    const routes: ReactElement[] = [];
    
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useCourseRoutes.tsx:33',message:'Building routes',data:{navCount:allCourseMicroserviceNavigation.length,hasChildren:allCourseMicroserviceNavigation.some(n=>n.children?.length)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

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
          {allCourseMicroserviceNavigation.map((nav) => {
            // #region agent log
            fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useCourseRoutes.tsx:45',message:'Mapping nav route',data:{segment:nav.segment,hasChildren:!!nav.children,childrenCount:nav.children?.length,childSegments:nav.children?.map(c=>c.segment)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            return (
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
              {nav.children?.map((child) => {
                // #region agent log
                fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useCourseRoutes.tsx:60',message:'Mapping child route',data:{parentSegment:nav.segment,childSegment:child.segment,hasSubChildren:!!child.children,subChildrenCount:child.children?.length,subChildSegments:child.children?.map(sc=>sc.segment)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
                // #endregion
                return (
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
              )})}
            </Route>
          )})}
        </Route>
      </Route>
    );

    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useCourseRoutes.tsx:102',message:'Routes built',data:{routeCount:routes.length,firstRoutePath:routes[0]?.props?.path},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    
    return routes;
  }, [allCourseMicroserviceNavigation]);
};

