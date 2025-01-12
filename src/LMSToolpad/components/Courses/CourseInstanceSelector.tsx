/** @format */

import { Box } from '@mui/material';
import CourseList from './CourseList';
import { useNavigate, useParams } from 'react-router-dom';
import useCourseStore from '../../store/useCourseStore';
import CenteredHeading from '../CenteredHeading';

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
  const { courses, setCurrentCourse } = useCourseStore(); // <-- Add setCurrentCourse
  const navigate = useNavigate();

  const courseInstances = courses.filter((course) => course.code === code);
  return (
    <Box
      sx={{
        p: 3,
        // height: ' 100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
      <CenteredHeading
        heading='Course Instances'
        subheading='Below are all the instances of the selected course. Select an instance to view its content.'
      />
      <CourseList
        courses={courseInstances}
        onSelectCourse={(course) => {
          setCurrentCourse(course);
          // Add the instance to navigation

          navigate(`${course.instance}`);
        }}
        displayMode='instanceList'
      />
    </Box>
  );
};

export default CourseInstanceSelector;
