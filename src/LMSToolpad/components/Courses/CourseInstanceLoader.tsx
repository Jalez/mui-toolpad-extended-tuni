/** @format */

import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useCourseStore, { Course } from "./store/useCourseStore";
import { useNotificationStore } from "../Notifications/store/useNotificationsStore";
import LoadingScreen from "../LoadingScreen";

/**
 * Component for loading specific course instance data.
 *
 * @version 2.1.0
 * @new-component
 * - Manages course instance state
 * - Handles instance-specific data loading
 * - Provides instance context to children
 * - Supports microservice integration
 * - Handles instance not found scenarios
 * @description - This component is responsible for loading the course data and rendering the course tools
 * @returns {React.ReactElement} - Returns the course loader component
 */
const CourseInstanceLoader = () => {
  const { instance, code } = useParams();
  const { fetchState, courses, setCurrentCourse } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = courses.find(
      (course: Course) => course.instance === instance
    );
    if (foundCourse) {
      setCurrentCourse(foundCourse);
    } else if (fetchState !== "loading") {
      addNotificationData({
        type: "error",
        message: "Course Instance not found",
      });
      navigate("/" + code);
    }
  }, [
    instance,
    setCurrentCourse,
    courses,
    fetchState,
    addNotificationData,
    navigate,
  ]);

  if (fetchState === "loading") return <LoadingScreen />;
  return <Outlet />;
};

export default CourseInstanceLoader;
