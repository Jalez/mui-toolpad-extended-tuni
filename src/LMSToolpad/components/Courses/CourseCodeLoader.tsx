/** @format */

import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useCourseStore, { Course } from "./store/useCourseStore";
import { useNotificationStore } from "../Notifications/store/useNotificationsStore";
import LoadingScreen from "../../../common/components/ui/LoadingScreen/LoadingScreen";

/**
 * Component for loading and managing course code level data.
 *
 * @version 2.1.0
 * @new-component
 * - Handles course code level routing
 * - Manages course code state in store
 * - Provides course instance list context
 * - Supports navigation between instances
 * @description - This component is responsible for loading the course data and rendering the course tools
 * @returns {React.ReactElement} - Returns the course loader component
 */
const CourseCodeLoader = () => {
  const { code } = useParams();
  const { fetchState, courses, setCurrentCourseCode } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;
    setCurrentCourseCode(code);

    const matchingCourses = courses.filter(
      (course: Course) => course.code === code
    );
    if (matchingCourses.length === 0 && fetchState === "success") {
      addNotificationData({
        type: "error",
        message: "Course not found",
      });
      navigate("/");
    }
  }, [
    code,
    courses,
    fetchState,
    addNotificationData,
    navigate,
    setCurrentCourseCode,
  ]);

  if (fetchState === "loading") return <LoadingScreen />;
  return <Outlet />;
};

export default CourseCodeLoader;
