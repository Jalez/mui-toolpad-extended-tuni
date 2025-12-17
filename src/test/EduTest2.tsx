/** @format */

import React, { useEffect, useMemo } from "react";
import ScienceIcon from "@mui/icons-material/Science";
import { NavigationPageStoreItem } from "@toolpad/core";
import { useCourseMicroserviceRegistration } from "../LMSToolpad/components/Courses/context/CourseMicroserviceContext";

/**
 * EduTest2 Course Microservice
 *
 * This is another example course microservice demonstrating the registration pattern.
 *
 * Registers through CourseMicroservice context (must be a child of CourseMicroservice).
 */
const EduTest2 = () => {
  const { registerCourseMicroservice, unregisterCourseMicroservice } = useCourseMicroserviceRegistration();

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
    registerCourseMicroservice(eduTest2Navigation);
    return () => {
      unregisterCourseMicroservice(eduTest2Navigation.segment);
    };
  }, [registerCourseMicroservice, unregisterCourseMicroservice, eduTest2Navigation]);

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
