import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./Navigation/CourseNavigationbuilder";
import { useRetry, useGridItemContext, createGridItem } from "mui-toolpad-extended-tuni";
import CourseEventPublisher from "./CourseEventPublisher";
import CourseList from "./CourseList";


const CourseManager = () => {
  const location = useLocation();
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
