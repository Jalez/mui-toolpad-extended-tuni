/** @format */

import { Route, Routes } from 'react-router-dom';
import CourseCodeLoader from '../Courses/CourseCodeLoader';
import CourseInstanceSelector from '../Courses/CourseInstanceSelector';
import CourseInstanceLoader from '../Courses/CourseInstanceLoader';
import CourseTools from '../Courses/CourseTools';
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from '../../store/useNavigationStore';
import { useEffect } from 'react';
import ToolDisplayer from '../Tool/ToolDisplayer';
import useCourseStore from '../../store/useCourseStore';
import Home from '../Routes/Home/Home';

type MicroservicesProps = {
  children: React.ReactNode;
};

const Microservices = ({ children }: MicroservicesProps) => {
  const { allMicroserviceNavigation, updateCourseInstanceSection } =
    useNavigationStore();
  const { currentCourse, currentCourseCode, courses } = useCourseStore();

  useEffect(() => {
    // If we have a current course, use that for microservice navigation
    if (currentCourse?.id) {
      allMicroserviceNavigation.forEach((ms) => {
        if (currentCourse.services?.includes(ms.segment)) {
          updateCourseInstanceSection(currentCourse, allMicroserviceNavigation);
        }
      });
    }
  }, [currentCourse, currentCourseCode, courses, updateCourseInstanceSection]);

  return (
    <>
      {children}
      <Routes>
        <Route path='' element={<Home />} index />
        <Route path='help' element={<div>Help</div>} />
        <Route path='contact' element={<div>Contact</div>} />
        <Route path=':code' element={<CourseCodeLoader />}>
          <Route index element={<CourseInstanceSelector />} />
          <Route path=':instance' element={<CourseInstanceLoader />}>
            <Route
              index
              element={
                <CourseTools microservices={allMicroserviceNavigation} />
              }
            />
            {allMicroserviceNavigation.map((nav) => (
              <Route key={nav.segment} path={nav.segment}>
                <Route
                  index
                  element={
                    (nav.view && <nav.view />) || (
                      <ToolDisplayer
                        title={nav.title}
                        show={true}
                        navItems={nav.children as NavigationPageStoreItem[]}
                      />
                    )
                  }
                />
                {nav.children?.map((child) => (
                  <Route key={child.segment} path={child.segment}>
                    <Route
                      index
                      element={
                        (child.view && <child.view />) || (
                          <ToolDisplayer
                            title={child.title}
                            show={true}
                            navItems={
                              child.children as NavigationPageStoreItem[]
                            }
                          />
                        )
                      }
                    />
                    {child.children?.map((subChild) => (
                      <Route
                        key={subChild.segment}
                        path={subChild.segment}
                        element={subChild.view ? <subChild.view /> : null}
                      />
                    ))}
                  </Route>
                ))}
              </Route>
            ))}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Microservices;
