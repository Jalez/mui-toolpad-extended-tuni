/** @format */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCourseStore, { Course } from '../../store/useCourseStore';
import { useNotificationStore } from '../../store/useNotificationsStore';

import CenteredHeading from '../CenteredHeading';
import LtiLoginUrlForm from './LtiLoginUrlForm';
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from '../../store/useNavigationStore';
import ToolDisplayer from '../Tool/ToolDisplayer';

interface CourseToolsProps {
  microservices?: NavigationPageStoreItem[];
}

/**
 * Component for managing and displaying course-specific tools.
 *
 * @version 2.1.0
 * @updates
 * - Added support for microservice-based tool management
 * - Introduced enabled/available tools separation
 * - Added service enablement/disablement functionality
 * - Enhanced teacher-specific tool configuration
 * - Improved UI with centered headings and tool groups
 *
 * @component
 * @param {CourseToolsProps} props
 * @param {NavigationPageStoreItem[]} props.microservices - Array of available microservice tools
 */
const CourseTools = ({ microservices }: CourseToolsProps) => {
  const { instance, code } = useParams();
  const { updateStateCourse, currentCourse } = useCourseStore();
  const { addNotificationData } = useNotificationStore();
  const [show, setShow] = useState(true);
  const { allMicroserviceNavigation } = useNavigationStore();
  const [currentMicroservices, setCurrentMicroservices] = useState<
    NavigationPageStoreItem[] | undefined
  >(microservices);
  // Add null checking and default to empty array
  // console.log('SECTION', allMicroserviceNavigation);
  useEffect(() => {
    if (!microservices && code && allMicroserviceNavigation) {
      setCurrentMicroservices(allMicroserviceNavigation);
    } else if (microservices) {
      setCurrentMicroservices(microservices);
    }
  }, [microservices, code, instance, allMicroserviceNavigation]);

  // Initialize with empty arrays if no tools are available
  const [usedTools, setUsedTools] = useState<NavigationPageStoreItem[]>(
    currentMicroservices?.filter((ms) =>
      currentCourse?.services?.includes(ms.segment)
    ) || []
  );
  const [availableTools, setAvailableTools] = useState<
    NavigationPageStoreItem[]
  >(
    currentMicroservices?.filter(
      (ms) => !currentCourse?.services?.includes(ms.segment)
    ) || []
  );

  useEffect(() => {
    if (code && instance && currentMicroservices) {
      setUsedTools(
        currentMicroservices.filter((ms) =>
          currentCourse?.services?.includes(ms.segment)
        )
      );
      setAvailableTools(
        currentMicroservices.filter(
          (ms) => !currentCourse?.services?.includes(ms.segment)
        )
      );
    }
  }, [code, instance, microservices, currentCourse]);

  useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, [currentCourse]);

  // Get course-specific role
  const isTeacher = currentCourse?.data?.myData?.role === 'teacher';

  useEffect(() => {
    if (currentCourse && isTeacher && !currentCourse.ltiLoginUrl) {
      addNotificationData({
        type: 'info',
        message: 'The LTI Login URL is missing for this course.',
      });
    }
  }, [currentCourse, isTeacher, addNotificationData]);

  const handleToggleService = async (path: string, isUsed: boolean) => {
    if (!currentCourse) return;
    const newServices = isUsed
      ? currentCourse.services?.filter((svc) => svc !== path) || []
      : [...(currentCourse.services || []), path];
    const updated: Course = { ...currentCourse, services: newServices };
    await updateStateCourse(updated);
  };
  if (!code) return <h1>No course selected!</h1>;

  return (
    <>
      {isTeacher && !currentCourse?.ltiLoginUrl && <LtiLoginUrlForm />}

      {isTeacher ? (
        <>
          <CenteredHeading
            heading='Enabled Tools'
            subheading='These tools are currently enabled for this course. Click on a tool to visit its page.'
          />
          <ToolDisplayer
            show={show}
            title='Enabled Tools'
            navItems={usedTools}
            roleCheck={true}
            onToggleService={(path) => handleToggleService(path, true)}
            isUsed={true}
          />
          <CenteredHeading
            heading='Available Tools'
            subheading='These tools are available for this course. Click on a tool to enable it.'
          />
          <ToolDisplayer
            show={show}
            title='Available Tools'
            navItems={availableTools}
            roleCheck={true}
            onToggleService={(path) => handleToggleService(path, false)}
            isUsed={false}
          />
        </>
      ) : (
        <>
          <CenteredHeading
            heading='Course Tools'
            subheading='These tools are available for this course. Click on a tool to visit its page.'
          />
          <ToolDisplayer
            show={show}
            title={
              currentCourse?.title
                ? `${currentCourse.title} - Tools`
                : 'Course Tools'
            }
            navItems={usedTools}
            roleCheck={true}
          />
        </>
      )}
    </>
  );
};

export default CourseTools;
