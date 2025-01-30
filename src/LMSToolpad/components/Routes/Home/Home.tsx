/** @format */

import useCourseStore from '../../../store/useCourseStore';
import { useUserStore } from '../../../store/useUserStore';
import CourseSelector from '../../Courses/CourseSelector';
import LoadingScreen from '../../LoadingScreen';
import ResizablePanel from '../../Common/ResizablePanel';
import { ResizeProvider } from '../../Common/Resizable/Context/ResizeContext';
import { registerToolbar } from '../../Toolbars/PageToolbar/toolbarRegistry';
import HomeToolbar from './HomeToolbar';
import { CourseListVisibilityMenu } from '../../Courses/CourseListVisibilityMenu';
import { Box } from '@mui/material';
import FlexWrapper from './FlexWrapper';

registerToolbar('/', HomeToolbar);

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
    <FlexWrapper>
      <ResizeProvider>
        <ResizablePanel
          id='home-course-selector'
          tools={<CourseListVisibilityMenu />}
          defaultWidth={800}
          defaultHeight={500}
          minWidth={280}
          maxWidth={1200}
          minHeight={200}
          maxHeight={800}>
          <CourseSelector courses={courses} navigationType={navigationType} />
        </ResizablePanel>
        {fetchState === 'loading' && <LoadingScreen />}
      </ResizeProvider>
      <ResizeProvider>
        <ResizablePanel
          id='home-course-selector-2'
          tools={<CourseListVisibilityMenu />}
          defaultWidth={800}
          defaultHeight={500}
          minWidth={280}
          maxWidth={1200}
          minHeight={200}
          maxHeight={800}>
          <CourseSelector courses={courses} navigationType={navigationType} />
        </ResizablePanel>
        {fetchState === 'loading' && <LoadingScreen />}
      </ResizeProvider>
    </FlexWrapper>
  );
};

export default Home;
