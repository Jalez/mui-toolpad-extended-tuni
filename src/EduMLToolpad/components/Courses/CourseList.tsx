/** @format */

// CourseList.tsx
import { List, Paper } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import CourseItem from './CourseItem';
import NoCoursesMessage from './NoCoursesMessage';

type CourseListProps = {
  courses: Course[];
  selectedCourse?: Course | null;
  onSelectCourse: (course: Course) => void;
};

const CourseList = ({
  courses,
  selectedCourse,
  onSelectCourse,
}: CourseListProps) => (
  <Paper elevation={3}>
    <List
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        gap: 2,
      }}>
      {courses.length === 0 ? (
        <NoCoursesMessage />
      ) : (
        courses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
            onSelect={onSelectCourse}
          />
        ))
      )}
    </List>
  </Paper>
);

export default CourseList;
