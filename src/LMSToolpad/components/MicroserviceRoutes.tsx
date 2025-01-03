/** @format */

import React, { useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import CourseLoader from './Courses/CourseLoader';
import CourseTools from './Courses/CourseTools';
import useCourseStore from '../store/useCourseStore';
import { useUserStore } from '../store/useUserStore';
import { useNavigationStore } from '../store/useNavigationStore';

export interface MicroserviceConfig {
  path: string;
  Component: React.ComponentType;
  fetchHooks?: Array<(courseId: string) => void>;
  buildNavigation?: (courseId: string, isTeacher: boolean) => any[]; // or your own type
}

interface MicroserviceRoutesProps {
  microservices: MicroserviceConfig[];
}
/**
 * @description - This component is responsible for rendering the microservices routes, fetching data and building navigation for each microservice based on the current course and user.

 * @param {MicroserviceConfig[]} props.microservices -  List of microservices to render
 * @returns  {React.ReactElement} - Returns the microservices routes
 */
const MicroserviceRoutes: React.FC<MicroserviceRoutesProps> = ({
  microservices,
}) => {
  const { currentCourse } = useCourseStore();
  const { user } = useUserStore();
  const { updateSection } = useNavigationStore();

  useEffect(() => {
    if (!currentCourse?.id) return;
    microservices.forEach((ms) => {
      ms.fetchHooks?.forEach((hookFn) => hookFn(currentCourse.id));
    });
  }, [currentCourse, microservices]);

  useEffect(() => {
    if (!currentCourse?.id || !user) return;
    const isTeacher = user.role === 'teacher';
    microservices.forEach((ms) => {
      if (ms.buildNavigation) {
        const navItems = ms.buildNavigation(currentCourse.id, isTeacher);
        updateSection(currentCourse, ms.path, navItems);
      }
    });
  }, [currentCourse, user, microservices, updateSection]);

  return (
    <Routes>
      <Route path=':courseSlug' element={<CourseLoader />}>
        <Route Component={CourseTools} index />
        {microservices.map((ms) => (
          <Route
            key={ms.path}
            path={`${ms.path}/*`}
            element={<ms.Component />}
          />
        ))}
      </Route>
    </Routes>
  );
};

export default MicroserviceRoutes;
