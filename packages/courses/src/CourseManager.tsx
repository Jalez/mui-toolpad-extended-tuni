import { useEffect } from "react";
import { useLocation } from "mui-toolpad-extended-tuni";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./Navigation/CourseNavigationbuilder";
import { useRetry, useGridItemContext, createGridItem } from "mui-toolpad-extended-tuni";
import CourseEventPublisher from "./CourseEventPublisher";
import CourseList from "./CourseList";


const CourseManager = () => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseManager.tsx:11',message:'CourseManager render - about to call useLocation',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'M'})}).catch(()=>{});
  // #endregion
  let location;
  try {
    location = useLocation();
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseManager.tsx:15',message:'useLocation succeeded',data:{pathname:location?.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'N'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/c66c732d-3054-49ac-a9c8-4251e2d751a6',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseManager.tsx:18',message:'useLocation failed',data:{error:error instanceof Error ? error.message : String(error),errorName:error instanceof Error ? error.name : 'Unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'O'})}).catch(()=>{});
    // #endregion
    // Fallback: return empty location object if Router context is not available
    location = { pathname: typeof window !== 'undefined' ? window.location.pathname : '/', search: '', hash: '', state: null, key: 'default' };
  }
  const { 
    getCourses, 
    setCurrentCourseUrl, 
    getCourseByUrl, 
    courses,
    currentCourse,
    currentCourseCode,
    setCurrentCourse,
    setCurrentCourseCode,
    setCurrentCourseUrl: setCurrentCourseUrlState
  } = useCourseStore();
  const { registerGridItem, unregisterGridItem } = useGridItemContext();

  // Use the retry hook for fetching courses
  useRetry({
    action: getCourses,
    condition: courses.length < 1,
    successMessage: "Courses fetched successfully",
    errorMessage: "Failed to fetch courses, retrying...",
  });

  // Listen for parent frame URL messages to set current course
  useEffect(() => {
    const messageHandler = async (event: MessageEvent) => {
      const { url } = event.data;
      if (url) {
        setCurrentCourseUrl(url);
        try {
          await getCourseByUrl(url);
        } catch (error) {
          console.error("Failed to fetch course by URL:", error);
        }
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, [getCourseByUrl, setCurrentCourseUrl]);

  // Watch URL and automatically null course state when navigating away from course routes
  useEffect(() => {
    // Course routes are: /:code and /:code/:instance (registered at root level)
    // When navigating to root (/), clear all course state
    // CourseCodeLoader and CourseInstanceLoader handle setting course state when on their routes
    if (location.pathname === '/' && (currentCourse || currentCourseCode)) {
      setCurrentCourse(null);
      setCurrentCourseCode(null);
      setCurrentCourseUrlState('');
    }
  }, [location.pathname, currentCourse, currentCourseCode, setCurrentCourse, setCurrentCourseCode, setCurrentCourseUrlState]);

  // Register course-list grid item with its default layout
  // Course-list chooses its own default size: full width (15 cols), 1 row height
  useEffect(() => {
    // Create grid item layout - course-list chooses its default size
    const courseListLayout = createGridItem({
      id: "course-list",
      x: 0,
      y: 0,
      w: 15,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 15,
      maxH: 15,
    });

    registerGridItem("course-list", <CourseList displayMode="instance" containerHeight="100%" />, courseListLayout);

    return () => {
      unregisterGridItem("course-list");
    };
  }, [registerGridItem, unregisterGridItem]);

  return (
    <>
      <CourseNavigationBuilder />
      <CourseEventPublisher />
    </>
  );
};

export default CourseManager;
