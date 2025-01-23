/** @format */

// CourseList.tsx
import { Box, Typography } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import CourseItem from './CourseItem';
import NoCoursesMessage from './NoCoursesMessage';
import { groupCoursesByEnrollment } from '../../utils/courseFilters';
import ItemReel from './ItemReel';
import { useUserStore } from '../../store/useUserStore';

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
  const { user } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;
  const { isStudent, isStudentOld, isTeacher, isTeacherOld, available } =
    groupCoursesByEnrollment(courses);

  if (courses.length === 0) return <NoCoursesMessage />;

  const renderCourseSection = (
    title: string,
    courseList: Course[],
    priority: 'high' | 'medium' | 'low' = 'medium'
  ) => {
    if (courseList.length === 0) {
      return (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h6'
            sx={{
              color:
                priority === 'high'
                  ? 'primary.main'
                  : priority === 'low'
                    ? 'text.secondary'
                    : 'text.primary',
              textAlign: 'left',
            }}>
            {title}
          </Typography>
          <Typography sx={{ px: 2, mt: 1, color: 'text.secondary' }}>
            There are no courses in this list
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mb: 4, position: 'relative' }}>
        <Typography
          variant='h6'
          sx={{
            color:
              priority === 'high'
                ? 'primary.main'
                : priority === 'low'
                  ? 'text.secondary'
                  : 'text.primary',
            // mb: 2,
            // px: 2,
            textAlign: 'left',
          }}>
          {title}
        </Typography>
        <ItemReel>
          {courseList.map((course) => (
            <Box sx={{ p: 1 }} key={course.id}>
              <CourseItem
                course={course}
                isSelected={selectedCourse?.id === course.id}
                onSelect={onSelectCourse}
                displayMode={displayMode}
              />
            </Box>
          ))}
        </ItemReel>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {visibleLists?.isStudent &&
        renderCourseSection('My Enrolled Courses', isStudent, 'high')}
      {visibleLists?.isStudentOld &&
        renderCourseSection('My Completed Courses', isStudentOld, 'low')}
      {visibleLists?.isTeacher &&
        renderCourseSection('My Teaching Courses', isTeacher, 'medium')}
      {visibleLists?.isTeacherOld &&
        renderCourseSection('My Past Teaching', isTeacherOld, 'low')}
      {visibleLists?.available &&
        renderCourseSection('Available Courses', available, 'medium')}
    </Box>
  );
};

export default CourseList;
