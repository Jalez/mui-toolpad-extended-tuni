import { useEffect } from "react";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./CourseNavigationbuilder";

const CourseManager = () => {
  const { getCourses, setCurrentCourseUrl, getCourseByUrl } = useCourseStore();

  // Fetch courses on mount
  useEffect(() => {
    getCourses();
  }, [getCourses]);

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

  return <CourseNavigationBuilder />; // This is a manager component, no UI needed
};

export default CourseManager;
