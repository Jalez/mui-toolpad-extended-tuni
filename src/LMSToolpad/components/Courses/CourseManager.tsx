import { useEffect } from "react";
import useCourseStore from "./store/useCourseStore";
import { CourseNavigationBuilder } from "./Navigation/CourseNavigationbuilder";
import { useRetry } from "../../../hooks/useRetry";
import { VisitedCoursesNavigationAdapter } from "./Navigation/VisitedCoursesNavigationAdapter";
import CourseList from "./CourseList";
import Calendar from "./Calendar/Calendar";
import Mindmap from "./Mindmap";
import {
  registerWidget,
  unregisterWidget,
} from "../Common/GridLayout/WidgetRegistry";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const CourseManager = () => {
  const { getCourses, setCurrentCourseUrl, getCourseByUrl, courses } =
    useCourseStore();

  // Register widgets only once on mount
  useEffect(() => {
    const widgetsToRegister = [
      {
        id: "course-list",
        component: CourseList,
        options: {
          name: "Course List",
          description:
            "Displays a list of courses with filtering and sorting options",
          category: "academic",
          props: { displayMode: "instance", containerHeight: "100%" },
          iconComponent: SchoolIcon, // Directly pass the component, not a string
          metadata: {
            route: {
              path: "course-list",
              element: (
                <CourseList displayMode="instance" containerHeight="100%" />
              ),
            },
          },
        },
      },
      {
        id: "calendar",
        component: Calendar,
        options: {
          name: "Calendar",
          description: "Shows course events and deadlines in a calendar view",
          category: "planning",
          iconComponent: CalendarMonthIcon, // Directly pass the component
          metadata: {
            route: {
              path: "calendar",
              element: <Calendar />,
            },
          },
        },
      },
      {
        id: "mindmap",
        component: Mindmap,
        options: {
          name: "Mindmap",
          description:
            "Visual representation of course relationships and topics",
          category: "visualization",
          iconComponent: PsychologyIcon, // Directly pass the component
          metadata: {
            route: {
              path: "mindmap",
              element: <Mindmap />,
            },
          },
        },
      },
    ];

    widgetsToRegister.forEach(({ id, component, options }) => {
      registerWidget(id, component, options);
    });

    return () => {
      widgetsToRegister.forEach(({ id }) => {
        unregisterWidget(id);
      });
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
    </>
  );
};

export default CourseManager;
