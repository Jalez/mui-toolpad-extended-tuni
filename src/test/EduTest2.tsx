/** @format */

import React, { useEffect, useMemo } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../LMSToolpad/components/Navigation/store/useNavigationStore";
import { useCourseMicroserviceRegistration } from "../LMSToolpad/components/Courses/CourseMicroservice";

/**
 * EduTest2 Course Microservice
 *
 * This is another example course microservice demonstrating the registration pattern.
 *
 * When used inside CourseMicroservice, it uses the course-specific registration.
 * When used standalone, it falls back to the global navigation store.
 */
const EduTest2 = () => {
  const { registerCourseMicroservice, isInsideCourseMicroservice } =
    useCourseMicroserviceRegistration();
  const { addMicroserviceNavigation } = useNavigationStore();

  const eduTest2Navigation: NavigationPageStoreItem = useMemo(
    () => ({
      kind: "page",
      segment: "eduteest",
      title: "EduTest2",
      iconFC: ScienceIcon,
      view: EduTestView,
      metadata: {
        description: "EduTest is a microservice for testing",
        forRoles: ["teacher", "student"],
        isRootTool: true,
      },
      children: [
        {
          kind: "page",
          segment: "dashboard",
          title: "Dashboard",
          view: DashboardView,
          metadata: {
            description: "Dashboard for EduTest2",
            forRoles: ["teacher", "student"],
          },
        },
        {
          kind: "page",
          segment: "assignments",
          title: "Assignments",
          view: AssignmentsView,
        },
      ],
    }),
    []
  );

  useEffect(() => {
    if (isInsideCourseMicroservice) {
      registerCourseMicroservice(eduTest2Navigation);
    } else {
      addMicroserviceNavigation(eduTest2Navigation);
    }
  }, [
    isInsideCourseMicroservice,
    registerCourseMicroservice,
    addMicroserviceNavigation,
    eduTest2Navigation,
  ]);

  return <></>;
};

export default EduTest2;

const EduTestView: React.FC = () => {
  return <div>EduTest View</div>;
};

const DashboardView: React.FC = () => {
  return <div>Dashboard View</div>;
};

const AssignmentsView: React.FC = () => {
  return <div>Assignments View</div>;
};
