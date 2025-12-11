import { useEffect } from "react";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./Navigation/CourseNavigationbuilder";
import { useRetry } from "../../hooks/useRetry";
import CourseEventPublisher from "./CourseEventPublisher";
import CourseList from "./CourseList";
import { useGridItemContext, createGridItem } from "../Common/GridLayout";


const CourseManager = () => {
  const { getCourses, setCurrentCourseUrl, getCourseByUrl, courses } =
    useCourseStore();
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
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/30a7b8ff-4a46-48a8-8e84-a3a483543b74',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CourseManager.tsx:52',message:'Registering course-list grid item',data:{layout:courseListLayout},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'D'})}).catch(()=>{});
    // #endregion

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
