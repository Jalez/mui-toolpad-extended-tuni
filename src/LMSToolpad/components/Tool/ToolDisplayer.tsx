/** @format */
import { Box, Fade, Typography } from '@mui/material';
import { NavigationPageStoreItem } from '../../store/useNavigationStore';
import { MicroserviceConfig } from '../Microservices/MicroserviceRoutes';
import ToolCard from './ToolCard';
import useCourseStore from '../../store/useCourseStore';

export type ToolDisplayerItem = {
  path: string;
  icon: JSX.Element;
  label: string;
  description: string;
  forRoles?: string[];
};

interface ToolDisplayerProps {
  show: boolean;
  title: string;
  microservices?: MicroserviceConfig[]; // new prop
  onToggleService?: (path: string) => void; // new callback
  navigationItems?: ToolDisplayerItem[];
  navItems: NavigationPageStoreItem[];
  roleCheck?: boolean;
  isUsed?: boolean;
}

const ToolDisplayer = ({
  show,
  onToggleService,
  navItems,
  roleCheck,
  isUsed,
}: ToolDisplayerProps) => {
  const { currentCourse } = useCourseStore();

  return (
    <Box sx={{ p: 3 }} data-testid='tool-selector'>
      <Fade in={show} timeout={500}>
        <Box>
          {/* <Typography variant='h5' sx={{ mb: 4, color: 'primary.main' }}>
            {title}
          </Typography> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'stretch',
              justifyContent: 'center',
              height: 'fit-content',
              width: '100%',
              gap: 4,
            }}>
            {navItems.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',

                  width: '100%',
                  height: '100%',
                  color: 'text.secondary',
                }}>
                <Typography variant='h5' sx={{ mb: 4 }}>
                  No tools available {roleCheck ? 'for your role' : ''}
                  {/* If they are a student, you can tell them to let the teacher know */}
                </Typography>
                {roleCheck &&
                  currentCourse?.data?.myData?.role === 'student' && (
                    <Typography variant='body1' sx={{ mb: 4 }}>
                      Please let your teacher know if you need access to any
                      tools.
                    </Typography>
                  )}
              </Box>
            )}
            {navItems.map((item) =>
              !roleCheck ||
              (roleCheck &&
                item.metadata?.forRoles?.includes(
                  currentCourse?.data?.myData?.role || ''
                )) ? (
                <ToolCard
                  key={item.segment}
                  item={item}
                  onToggleService={onToggleService}
                  isUsed={isUsed} // new prop
                />
              ) : null
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default ToolDisplayer;
