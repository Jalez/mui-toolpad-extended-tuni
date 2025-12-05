/** @format */

import React, { useEffect, useMemo } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import {
  NavigationPageStoreItem,
} from "../LMSToolpad/components/Navigation/store/useNavigationStore";
import { useCourseNavigationStore } from "../LMSToolpad/components/Courses/store/useCourseNavigationStore";

/**
 * EduTest2 Course Microservice
 *
 * This is another example course microservice demonstrating the registration pattern.
 *
 * Registers directly with the course navigation store.
 */
const EduTest2 = () => {
  const { addCourseMicroserviceNavigation } = useCourseNavigationStore();

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
    addCourseMicroserviceNavigation(eduTest2Navigation);
  }, [addCourseMicroserviceNavigation, eduTest2Navigation]);

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
