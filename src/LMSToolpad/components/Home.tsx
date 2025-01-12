/** @format */

import { Box } from '@mui/material';
import useCourseStore from '../store/useCourseStore';
import CourseSelector from './Courses/CourseSelector';
import LoadingScreen from './LoadingScreen';
import LayoutToggle from './Courses/LayoutToggle';
import { useState } from 'react';

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
  const [navigationType, setNavigationType] = useState<'direct' | 'instances'>(
    'direct'
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LayoutToggle value={navigationType} onChange={setNavigationType} />
      </Box>
      <CourseSelector courses={courses} navigationType={navigationType} />

      {fetchState === 'loading' && <LoadingScreen />}
    </Box>
  );
};

export default Home;
