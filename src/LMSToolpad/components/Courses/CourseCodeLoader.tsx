/** @format */

import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useCourseStore, { Course } from '../../store/useCourseStore';
import { useNotificationStore } from '../../store/useNotificationsStore';
import LoadingScreen from '../LoadingScreen';
import { useNavigationStore } from '../../store/useNavigationStore';
import SchoolIcon from '@mui/icons-material/School';

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
  const { addSection } = useNavigationStore();

  useEffect(() => {
    if (!code) return;
    setCurrentCourseCode(code);

    const matchingCourses = courses.filter(
      (course: Course) => course.code === code
    );

    if (matchingCourses.length > 0) {
      const firstCourse = matchingCourses[0];
      addSection({
        segment: firstCourse.code,
        title: firstCourse.code.toUpperCase(),
        description: firstCourse.description,
        Icon: SchoolIcon,
        instances: matchingCourses.map((c) => c.instance),
      });
    } else if (fetchState !== 'loading') {
      addNotificationData({
        type: 'error',
        message: 'Course not found',
      });
      navigate('/');
    }
  }, [
    code,
    courses,
    fetchState,
    addNotificationData,
    navigate,
    setCurrentCourseCode,
  ]);

  if (fetchState === 'loading') return <LoadingScreen />;
  return <Outlet />;
};

export default CourseCodeLoader;
