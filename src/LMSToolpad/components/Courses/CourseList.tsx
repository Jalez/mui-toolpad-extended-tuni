/** @format */

// CourseList.tsx
import { List, Typography, Box } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import CourseItem from './CourseItem';
import NoCoursesMessage from './NoCoursesMessage';
import { groupCoursesByActivity } from '../../utils/courseFilters';

type CourseListProps = {
  courses: Course[];
  selectedCourse?: Course | null;
  onSelectCourse: (course: Course) => void;
  displayMode?: 'course' | 'instance' | 'instanceList';
};

/**
 * Course list component for displaying course collections.
 *
 * @version 2.1.0
 * @updates
 * - Added support for active/inactive course grouping
 * - Enhanced layout with responsive grid system
 * - Added new display mode support
 * - Improved course filtering and sorting
 * - Added support for course instance display
 *
 * @component
 * @param {CourseListProps} props
 */
const CourseList = ({
  courses,
  selectedCourse,
  onSelectCourse,
  displayMode = 'course',
}: CourseListProps) => {
  // Skip unique if we're in instance or instanceList mode
  const skipUnique =
    displayMode === 'instance' || displayMode === 'instanceList';

  const { active, inactive } = groupCoursesByActivity(courses, skipUnique);

  if (courses.length === 0) return <NoCoursesMessage />;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <List
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
        {active.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
            onSelect={onSelectCourse}
            displayMode={displayMode}
          />
        ))}
      </List>
      {inactive.length > 0 && (
        <>
          <Typography
            variant='h6'
            color='text.secondary'
            sx={{ mt: 2, px: 2, alignSelf: 'center' }}>
            Inactive Courses
          </Typography>
          <List
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}>
            {inactive.map((course) => (
              <CourseItem
                key={course.id}
                course={course}
                isSelected={selectedCourse?.id === course.id}
                onSelect={onSelectCourse}
                displayMode={displayMode}
                isInactive
              />
            ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default CourseList;
