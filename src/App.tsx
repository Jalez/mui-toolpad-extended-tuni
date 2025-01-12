/** @format */

import { BrowserRouter } from 'react-router-dom';
import { LMSProvider, MicroserviceRoutes } from '.';
import CoreRoutes from './CoreRoutes';
import { buildMicroServiceNavigation } from './LMSToolpad/components/MicroserviceNavigationBuilder';

const EduTest = () => {
  return <div>EduTest</div>;
};

const EduTest2 = () => {
  return <div>EduTest2</div>;
};

import ScienceIcon from '@mui/icons-material/Science';

const App = () => {
  const allAvailableMicroservices = [
    {
      path: 'edutest',
      Component: EduTest,
      fetchHooks: [],
      buildNavigation: () => {
        return buildMicroServiceNavigation({
          segment: 'edutest',
          title: 'EduTest',
          description: 'EduTest is a microservice for testing',
          icon: ScienceIcon,
          forRoles: ['teacher', 'student'],
        });
      },
    },
    {
      path: 'edutest2',
      Component: EduTest2,
      fetchHooks: [],
      buildNavigation: () => {
        return buildMicroServiceNavigation({
          segment: 'edutest2',
          title: 'EduTest2',
          description: 'EduTest2 is ANOTHER microservice for testing',
          icon: ScienceIcon,
          forRoles: ['teacher', 'student'],
        });
      },
    },
  ];

  return (
    <BrowserRouter>
      <LMSProvider>
        <CoreRoutes />
        <MicroserviceRoutes microservices={allAvailableMicroservices} />
      </LMSProvider>
    </BrowserRouter>
  );
};

export default App;
