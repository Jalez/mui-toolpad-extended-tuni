/** @format */

import React, { useEffect, useState } from 'react';

import { Route, Routes } from 'react-router-dom';
import CourseInstanceLoader from '../Courses/CourseInstanceLoader';
import CourseTools from '../Courses/CourseTools';
import useCourseStore from '../../store/useCourseStore';
import { useUserStore } from '../../store/useUserStore';
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from '../../store/useNavigationStore';
import CourseInstanceSelector from '../Courses/CourseInstanceSelector';
import CourseCodeLoader from '../Courses/CourseCodeLoader';

export interface MicroserviceConfig {
  path: string;
  Component: React.ComponentType;
  fetchHooks?: Array<(courseId: string) => void>;
  buildNavigation: (courseId: string, isTeacher: boolean) => any[]; // or your own type
}

interface MicroserviceRoutesProps {
  microservices: MicroserviceConfig[];
}

/**
 * Component responsible for managing and rendering microservice routes within the LMS.
 *
 * @version 2.1.0
 * @breaking-changes
 * - Navigation structure now requires course code and instance properties
 * - Updated configuration interface for better TypeScript support
 * - Changed route structure to support course instances
 * - Added support for course code level navigation
 * - Improved handling of microservice-specific navigation items
 *
 * @component
 * @param {MicroserviceRoutesProps} props - Component properties
 * @param {MicroserviceConfig[]} props.microservices - Array of microservice configurations
 *
 * @example
 * ```tsx
 * const microservices = [{
 *   path: 'assignments',
 *   Component: AssignmentsTool,
 *   fetchHooks: [(courseId) => fetchAssignmentData(courseId)],
 *   buildNavigation: (courseId, isTeacher) => ([{
 *     kind: 'page',
 *     segment: 'assignments',
 *     title: 'Assignments',
 *     description: 'Course assignments',
 *     forRoles: ['teacher', 'student']
 *   }])
 * }];
 * ```
 */
const MicroserviceRoutes: React.FC<MicroserviceRoutesProps> = ({
  microservices,
}) => {
  const { currentCourse, currentCourseCode, courses } = useCourseStore();
  const { user } = useUserStore();
  const { updateCourseInstanceSection } = useNavigationStore();
  const [allMicroservicesNavigation, setAllMicroservicesNavigation] = useState<
    NavigationPageStoreItem[]
  >([]);

  useEffect(() => {
    if (!currentCourse?.id) return;
    microservices.forEach((ms) => {
      ms.fetchHooks?.forEach((hookFn) => hookFn(currentCourse.id));
    });
  }, [currentCourse, microservices]);

  useEffect(() => {
    // If we have a current course, use that for microservice navigation
    if (currentCourse?.id && user) {
      const isTeacher = user.role === 'teacher';
      const buildMicroServiceNavigation: NavigationPageStoreItem[] = [];
      microservices.forEach((ms) => {
        if (ms.buildNavigation && typeof ms.buildNavigation === 'function') {
          const microserviceNavigation = ms.buildNavigation(
            currentCourse.id,
            isTeacher
          );
          buildMicroServiceNavigation.push(...microserviceNavigation);
          if (currentCourse.services?.includes(ms.path)) {
            updateCourseInstanceSection(currentCourse, microserviceNavigation);
          }
        }
      });
      setAllMicroservicesNavigation(buildMicroServiceNavigation);
    }
    // If we only have a course code, build basic navigation
    else if (currentCourseCode && user) {
      console.log('Building navigation for course code:', currentCourseCode);
      const matchingCourses = courses.filter(
        (course) => course.code === currentCourseCode
      );
      console.log('Matching courses:', matchingCourses);

      if (matchingCourses.length > 0) {
        const isTeacher = user.role === 'teacher';
        const buildMicroServiceNavigation: NavigationPageStoreItem[] = [];

        microservices.forEach((ms) => {
          if (ms.buildNavigation && typeof ms.buildNavigation === 'function') {
            matchingCourses.forEach((course) => {
              if (course.services?.includes(ms.path)) {
                const microserviceNavigation = ms.buildNavigation(
                  course.id,
                  isTeacher
                );
                buildMicroServiceNavigation.push(...microserviceNavigation);
                // Also update the course instance section
                updateCourseInstanceSection(course, microserviceNavigation);
              }
            });
          }
        });

        setAllMicroservicesNavigation(buildMicroServiceNavigation);
      }
    }
  }, [
    currentCourse,
    currentCourseCode,
    courses,
    user,
    microservices,
    updateCourseInstanceSection,
  ]);

  return (
    <Routes>
      <Route path=':code' element={<CourseCodeLoader />}>
        <Route index element={<CourseInstanceSelector />} />
        <Route path=':instance' element={<CourseInstanceLoader />}>
          <Route
            index
            element={<CourseTools microservices={allMicroservicesNavigation} />}
          />
          {microservices.map((ms) => (
            <Route
              key={ms.path}
              path={`${ms.path}/*`}
              element={<ms.Component />}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default MicroserviceRoutes;
