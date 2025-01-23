/** @format */

// CourseSelector.tsx
import { Box, Fade } from '@mui/material';
import useCourseStore, { Course } from '../../store/useCourseStore';
import { useEffect, useState } from 'react';
import CourseList from './CourseList';
import { useNavigate } from 'react-router-dom';
import { filterUniqueCourses } from '../../utils/courseFilters';

type CourseSelectorProps = {
  courses: Course[];
  navigationType?: 'direct' | 'instances';
};

/**
 * Component for displaying and selecting courses with enhanced navigation features.
 *
 * @version 2.1.0
 * @updates
 * - Added support for direct and instance-based navigation modes
 * - Enhanced course filtering with code and instance grouping
 * - Added support for inactive course states
 * - Improved course selection UI with new card-based design
 *
 * @component
 * @param {CourseSelectorProps} props
 * @param {Course[]} props.courses - Array of available courses
 * @param {'direct' | 'instances'} [props.navigationType='direct'] - Navigation mode
 */
const CourseSelector = ({
  courses,
  navigationType = 'direct',
}: CourseSelectorProps) => {
  const { currentCourse, setCurrentCourse } = useCourseStore();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleCourseSelect = (course: Course) => {
    setCurrentCourse(course);
    if (navigationType === 'direct') {
      // For direct, go straight into code + instance
      navigate(`${course.code}/${course.instance}`);
    } else {
      // For 'instances' view, only navigate to course code
      navigate(`${course.code}`);
    }
  };

  // Remove filtering for direct view, only filter for course view
  const displayedCourses =
    navigationType === 'instances' ? filterUniqueCourses(courses) : courses;

  return (
    <Fade in={mounted} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {/* <CenteredHeading heading='Active Courses' /> */}
        <CourseList
          courses={displayedCourses}
          selectedCourse={currentCourse}
          onSelectCourse={handleCourseSelect}
          displayMode={navigationType === 'direct' ? 'instance' : 'course'}
        />
      </Box>
    </Fade>
  );
};

export default CourseSelector;
