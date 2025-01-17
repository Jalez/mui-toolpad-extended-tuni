/** @format */

import { useEffect } from 'react';
import ScienceIcon from '@mui/icons-material/Science';
import {
  NavigationPageStoreItem,
  useNavigationStore,
} from '../LMSToolpad/store/useNavigationStore';

const EduTest2 = () => {
  const { addMicroserviceNavigation } = useNavigationStore();
  useEffect(() => {
    addMicroserviceNavigation(eduTest2Navigation);
  }, []);
  const eduTest2Navigation: NavigationPageStoreItem = {
    kind: 'page',
    segment: 'eduteest',
    title: 'EduTest2',
    iconFC: ScienceIcon,
    view: EduTestView,
    metadata: {
      description: 'EduTest is a microservice for testing',
      forRoles: ['teacher', 'student'],
      isRootTool: true,
    },
    children: [
      {
        kind: 'page',
        segment: 'dashboard',
        title: 'Dashboard',
        view: DashboardView,
        metadata: {
          description: 'Dashboard for EduTest2',
          forRoles: ['teacher', 'student'],
        },
      },
      {
        kind: 'page',
        segment: 'assignments',
        title: 'Assignments',
        view: AssignmentsView,
      },
    ],
  };

  return <> </>;
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
