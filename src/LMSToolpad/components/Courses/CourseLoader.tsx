/** @format */

import { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import useCourseStore, { Course } from '../../store/useCourseStore';
import { useNotificationStore } from '../../store/useNotificationsStore';
import { slugify } from '../../utils/slugify';
import LoadingScreen from '../LoadingScreen';
/**
 * @description - This component is responsible for loading the course data and rendering the course tools
 * @returns {React.ReactElement} - Returns the course loader component
 */
const CourseLoader = () => {
  const { courseSlug } = useParams();
  const { fetchState, courses, setCurrentCourse } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = courses.find(
      (course: Course) => slugify(course.title) === courseSlug
    );
    if (foundCourse) setCurrentCourse(foundCourse);
    else if (fetchState !== 'loading') {
      addNotificationData({
        type: 'error',
        message: 'Course not found',
      });
      navigate('/');
    }
  }, [
    courseSlug,
    setCurrentCourse,
    courses,
    fetchState,
    addNotificationData,
    navigate,
  ]);

  if (fetchState === 'loading') return <LoadingScreen />;
  return <Outlet />;
};

export default CourseLoader;
