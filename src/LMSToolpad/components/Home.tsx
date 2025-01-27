/** @format */

import { Box } from '@mui/material';
import useCourseStore from '../store/useCourseStore';
import { useUserStore } from '../store/useUserStore';
import CourseSelector from './Courses/CourseSelector';
import LoadingScreen from './LoadingScreen';
import ResizablePanel from './Common/ResizablePanel';
import { ResizeProvider } from '../contexts/ResizeContext';

/**
 * Home component with enhanced layout options.
 *
 * @version 2.1.0
 * @updates
 * - Added layout toggle functionality
 * - Enhanced course display modes
 * - Improved responsive design
 * - Added support for instance/direct navigation
 */
const Home = () => {
  const { courses, fetchState } = useCourseStore();
  const { user } = useUserStore();
  const navigationType = user?.preferences?.navigationType || 'direct';

  return (
    <ResizeProvider>
      <Box sx={{ p: 2 }}>
        <ResizablePanel
          id='home-course-selector'
          defaultWidth={800}
          defaultHeight={500}
          minWidth={280}
          maxWidth={1200}
          minHeight={200}
          maxHeight={800}>
          <CourseSelector courses={courses} navigationType={navigationType} />
        </ResizablePanel>
        {fetchState === 'loading' && <LoadingScreen />}
      </Box>
    </ResizeProvider>
  );
};

export default Home;
