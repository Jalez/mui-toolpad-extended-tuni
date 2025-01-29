/** @format */

import { Course } from '../../store/useCourseStore';
import CourseItem from './CourseItem';
import NoCoursesMessage from './NoCoursesMessage';
import { groupCoursesByEnrollment } from '../../utils/courseFilters';
import { useUserStore } from '../../store/useUserStore';
import { useSetSnapDimensions } from '../Common/Resizable/Context/ResizeContext';

import VerticalScroller from '../Common/VerticalScroller';
import { priority } from './NoCourseNotice';
import { useEffect } from 'react';
import HorizontalScroller from '../Common/HorizontalScroller';

type CourseListProps = {
  courses: Course[];
  selectedCourse?: Course | null;
  onSelectCourse: (course: Course) => void;
  displayMode?: 'course' | 'instance' | 'instanceList';
  containerHeight?: string | number;
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
  containerHeight = '100%',
}: CourseListProps) => {
  const { user } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;
  const { isStudent, isStudentOld, isTeacher, isTeacherOld, available } =
    groupCoursesByEnrollment(courses);

  const itemReelHeight = 200;
  const itemReelWidth = 300; // Width of the course item

  // Set snap dimensions for parent ResizablePanel
  const setSnapDimensions = useSetSnapDimensions();

  useEffect(() => {
    setSnapDimensions({
      width: itemReelWidth, // Account for padding
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setSnapDimensions]);
  if (courses.length === 0) return <NoCoursesMessage />;

  const renderCourseSection = (
    title: string,
    courseList: Course[],
    priority: priority
  ) => {
    return (
      <HorizontalScroller
        height={itemReelHeight}
        title={title}
        priority={priority}
        itemWidth={itemReelWidth}>
        {courseList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
            onSelect={onSelectCourse}
            displayMode={displayMode}
          />
        ))}
      </HorizontalScroller>
    );
  };

  return (
    <VerticalScroller
      itemHeight={itemReelHeight}
      containerHeight={containerHeight}>
      {visibleLists?.isStudent &&
        renderCourseSection('My Enrolled Courses', isStudent, 'high')}
      {visibleLists?.isStudentOld &&
        renderCourseSection('My Completed Courses', isStudentOld, 'low')}
      {visibleLists?.isTeacher &&
        renderCourseSection('My Teaching Courses', isTeacher, 'low')}
      {visibleLists?.isTeacherOld &&
        renderCourseSection('My Past Teaching', isTeacherOld, 'low')}
      {visibleLists?.available &&
        renderCourseSection('Available Courses', available, 'low')}
    </VerticalScroller>
  );
};

export default CourseList;
