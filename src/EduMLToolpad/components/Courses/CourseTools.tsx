/** @format */


import useCourseStore, { Course } from '../../store/useCourseStore';
import { useEffect, useState } from 'react';
import ToolSelector from '../ToolSelector';
import { useUserStore } from '../../store/useUserStore';
import { useNotificationStore } from '../../store/useNotificationsStore';
import { useNavigationStore } from '../../store/useNavigationStore';
import LtiLoginUrlForm from './LtiLoginUrlForm';
import { useNavigate, useParams } from 'react-router-dom';
import { slugify } from '../../../educhatRoutes/utils/slugify';
import LoadingScreen from '../LoadingScreen';

const CourseTools = () => {
  const { courseSlug} = useParams();
  const { currentCourse, setCurrentCourse, courses, fetchState } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const { user } = useUserStore();
  const { navigation, sections } = useNavigationStore();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();




  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, [currentCourse]);

  useEffect(() => {
    if (
      currentCourse &&
      user?.role === 'teacher' &&
      !currentCourse.ltiLoginUrl
    ) {
      addNotificationData({
        type: 'info',
        message:
          'The LTI Login URL is missing for this course.',
      });
    }
  }, [currentCourse, user, addNotificationData]);

  if(!courseSlug) return <h1>No course selected!</h1>
  console.log("sections", sections)
  if(!sections[courseSlug]) return <h1>No sections found!</h1>

  return (
    <>
      {user?.role === 'teacher' && !currentCourse?.ltiLoginUrl && (
        <LtiLoginUrlForm />
      )}
      <ToolSelector
        show={show}
        title={
          currentCourse?.title
            ? `${currentCourse.title} - Select a Tool`
            : 'Select a Tool'
        }
        navItems={sections[courseSlug].children}
        roleCheck={true}
      />
    </>
  );
};

export default CourseTools;
