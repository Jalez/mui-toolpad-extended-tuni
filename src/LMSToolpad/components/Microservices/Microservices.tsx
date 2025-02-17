/** @format */

import { Route, Routes } from "react-router-dom";
import CourseCodeLoader from "../Courses/CourseCodeLoader";
import CourseInstanceSelector from "../Courses/CourseInstanceSelector";
import CourseInstanceLoader from "../Courses/CourseInstanceLoader";
import CourseTools from "../Courses/CourseTools";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../Navigation/store/useNavigationStore";
import ToolDisplayer from "../Tool/ToolDisplayer";
import Home from "../Routes/Home/Home";
import { useEffect } from "react";

type MicroservicesProps = {
  children: React.ReactNode;
};

const Microservices = ({ children }: MicroservicesProps) => {
  const {
    allMicroserviceNavigation,
    updateMicroserviceNavigationForSections,
    sections,
  } = useNavigationStore();

  // Call the store function to update sections with merged microservices
  useEffect(() => {
    // console.log("allMicroserviceNavigation", allMicroserviceNavigation);
    updateMicroserviceNavigationForSections();
  }, [
    allMicroserviceNavigation,
    updateMicroserviceNavigationForSections,
    sections,
  ]);

  return (
    <>
      {children}
      <Routes>
        <Route path="" element={<Home />} index />
        <Route path="help" element={<div>Help</div>} />
        <Route path="contact" element={<div>Contact</div>} />
        <Route path=":code" element={<CourseCodeLoader />}>
          <Route index element={<CourseInstanceSelector />} />
          <Route path=":instance" element={<CourseInstanceLoader />}>
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
                        title={nav.title as string}
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
                            title={child.title as string}
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
