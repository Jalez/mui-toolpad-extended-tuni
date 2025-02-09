/** @format */

import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CenteredHeading from '../CenteredHeading';
import ResizablePanel from '../Common/Panel/ResizablePanel';
import CourseListForInstance from './CourseListForInstance';

/**
 * Component for selecting course instances from a filtered list.
 *
 * @version 2.1.0
 * @new-component
 * - Provides instance selection UI for courses
 * - Groups instances by course code
 * - Handles active/inactive instance states
 * - Supports nested navigation structure
 *
 * @param {Course[]} courses - Available course instances
 */
const CourseInstanceSelector = () => {
  const { code } = useParams();

  // courseInstances can be computed if needed - no longer used directly
  // const courseInstances = courses.filter((course) => course.code === code);

  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
      <CenteredHeading
        heading='Course Instances'
        subheading='Below are all the instances of the selected course. Select an instance to view its content.'
      />
      <ResizablePanel
        id='home-course-selector'
        defaultWidth={600}
        defaultHeight={400}
        minWidth={300}
        maxWidth={1200}
        minHeight={200}
        maxHeight={800}>
        <CourseListForInstance
          code={code || ''}
          displayMode='course'
          containerHeight='100%'
        />
      </ResizablePanel>
    </Box>
  );
};

export default CourseInstanceSelector;
