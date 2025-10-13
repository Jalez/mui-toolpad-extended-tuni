import { useEffect } from "react";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./Navigation/CourseNavigationbuilder";
import { useRetry } from "../../hooks/useRetry";
import { VisitedCoursesNavigationAdapter } from "./Navigation/VisitedCoursesNavigationAdapter";
import CourseList from "./CourseList";
import CourseEventPublisher from "./CourseEventPublisher";
import {
  registerWidget,
  unregisterWidget,
} from "../Common/GridLayout/WidgetRegistry";
import SchoolIcon from "@mui/icons-material/School";

const CourseManager = () => {
  const { getCourses, setCurrentCourseUrl, getCourseByUrl, courses } =
    useCourseStore();

  // Register course-list widget only (Calendar and Flow are handled by their respective managers)
  useEffect(() => {
    registerWidget("course-list", CourseList, {
      name: "Course List",
      description:
        "Displays a list of courses with filtering and sorting options",
      category: "academic",
      props: { displayMode: "instance", containerHeight: "100%" },
      iconComponent: SchoolIcon,
      metadata: {
        route: {
          path: "course-list",
          element: (
            <CourseList displayMode="instance" containerHeight="100%" />
          ),
        },
      },
    });

    return () => {
      unregisterWidget("course-list");
    };
  }, []);

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

  return (
    <>
      <VisitedCoursesNavigationAdapter />
      <CourseNavigationBuilder />
      <CourseEventPublisher />
    </>
  );
};

export default CourseManager;
