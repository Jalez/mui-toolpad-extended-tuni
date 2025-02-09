/** @format */
import ScienceIcon from "@mui/icons-material/Science";
import { useEffect } from "react";
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from "../LMSToolpad/components/Navigation/store/useNavigationStore";
const EduTest = () => {
  const { addMicroserviceNavigation } = useNavigationStore();
  useEffect(() => {
    addMicroserviceNavigation(eduTestNavigation);
  }, []);
  const eduTestNavigation: NavigationPageStoreItem = {
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
        // view: DashboardView,
        metadata: {
          description: "Dashboard for EduTest",
          forRoles: ["teacher", "student"],
        },
        children: [
          {
            kind: "page",
            segment: "subdashboard",
            title: "SubDashboard",
            view: DashboardView,
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
  };
  return <></>;
};

export default EduTest;

const DashboardView = () => {
  return <div>Dashboard View</div>;
};

const AssignmentsView = () => {
  return <div>Assignments View</div>;
};
