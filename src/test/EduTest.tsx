/** @format */
import ScienceIcon from "@mui/icons-material/Science";
import { useEffect, useMemo } from "react";
import {
  NavigationPageStoreItem,
} from "../LMSToolpad/components/Navigation/store/useNavigationStore";
import { useCourseMicroserviceRegistration } from "../LMSToolpad/components/Courses/CourseMicroservice";

/**
 * EduTest Course Microservice
 *
 * This is an example course microservice that demonstrates how to create
 * a self-contained tool that integrates with the Course system.
 *
 * Registers through CourseMicroservice context (must be a child of CourseMicroservice).
 */
const EduTest = () => {
  const {
    registerCourseMicroservice,
    unregisterCourseMicroservice,
  } = useCourseMicroserviceRegistration();

  // Define navigation structure
  // - "edutest" root: no view, shows tool selector (no title needed)
  // - "dashboard": shows title "Dashboard" + view + subsections
  // - "assignments": shows title "Assignments" + view only
  // - "subdashboard": has title but showTitle: false so no title displayed
  const eduTestNavigation: NavigationPageStoreItem = useMemo(
    () => ({
      kind: "page",
      segment: "edutest",
      title: "EduTest",
      iconFC: ScienceIcon,
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
            description: "Dashboard for EduTest",
            forRoles: ["teacher", "student"],
          },
          children: [
            {
              kind: "page",
              segment: "subdashboard",
              title: "SubDashboard",
              showTitle: false,
              view: SubDashboardView,
              metadata: {
                description: "SubDashboard for EduTest",
                forRoles: ["teacher", "student"],
              },
            },
          ],
        },
        {
          kind: "page",
          segment: "assignments",
          title: "Assignments",
          view: AssignmentsView,
          metadata: {
            description: "Assignments for EduTest",
            forRoles: ["teacher", "student"],
          },
        },
      ],
    }),
    []
  );

  useEffect(() => {
    registerCourseMicroservice(eduTestNavigation);
    return () => {
      unregisterCourseMicroservice(eduTestNavigation.segment);
    };
  }, [registerCourseMicroservice, unregisterCourseMicroservice, eduTestNavigation]);

  return <></>;
};

export default EduTest;

const DashboardView = () => {
  return <div>Dashboard View</div>;
};

const AssignmentsView = () => {
  return <div>Assignments View</div>;
};

const SubDashboardView = () => {
  return <div>SubDashboard View</div>;
};
