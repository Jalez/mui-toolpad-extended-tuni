/** @format */

// CourseList.tsx
import { Box, IconButton } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import CourseItem from './CourseItem';
import NoCoursesMessage from './NoCoursesMessage';
import { groupCoursesByEnrollment } from '../../utils/courseFilters';
import ItemReel from './ItemReel';
import { useUserStore } from '../../store/useUserStore';
import NoCourseNotice, { priority } from './NoCourseNotice';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, useState, useEffect } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [showUpButton, setShowUpButton] = useState(false);
  const [showDownButton, setShowDownButton] = useState(false);

  const { user } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;
  const { isStudent, isStudentOld, isTeacher, isTeacherOld, available } =
    groupCoursesByEnrollment(courses);

  const itemReelHeight = 200; // Height of single ItemReel

  // Remove the calculateHeight effect entirely

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = Math.sign(e.deltaY);
      if (direction > 0) {
        scrollToNext();
      } else {
        scrollToPrevious();
      }
    };

    const checkScroll = () => {
      const hasScrollableContent =
        container.scrollHeight > container.clientHeight;
      setShowUpButton(container.scrollTop > 10);
      setShowDownButton(
        hasScrollableContent &&
          container.scrollTop <
            container.scrollHeight - container.clientHeight - 10
      );
    };

    // Initial check
    checkScroll();

    // Add observers for content changes
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(container);

    container.addEventListener('scroll', checkScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollToNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: itemReelHeight, behavior: 'smooth' });
  };

  const scrollToPrevious = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ top: -itemReelHeight, behavior: 'smooth' });
  };

  if (courses.length === 0) return <NoCoursesMessage />;

  const renderCourseSection = (
    title: string,
    courseList: Course[],
    priority: priority
  ) => {
    return (
      <ItemReel height={itemReelHeight} title={title} priority={priority}>
        {courseList.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            isSelected={selectedCourse?.id === course.id}
            onSelect={onSelectCourse}
            displayMode={displayMode}
          />
        ))}
      </ItemReel>
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: containerHeight,
        overflow: 'hidden',
      }}>
      <Box
        ref={containerRef}
        sx={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          overflowY: 'auto',
          position: 'relative',
          scrollSnapType: 'y mandatory',
          '& > div': {
            scrollSnapAlign: 'start',
            minHeight: itemReelHeight,
            flex: '0 0 auto', // Prevent flex stretching
            height: itemReelHeight,
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}>
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
      </Box>
      {showUpButton && (
        <IconButton
          sx={{
            position: 'absolute',
            top: -15,

            '&:hover': {
              boxShadow: 'none',
              bgcolor: 'transparent',
            },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
          onClick={scrollToPrevious}>
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
      {showDownButton && (
        <IconButton
          sx={{
            position: 'absolute',
            bottom: -15,

            '&:hover': {
              boxShadow: 'none',
              bgcolor: 'transparent',
            },
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
          onClick={scrollToNext}>
          <KeyboardArrowDownIcon />
        </IconButton>
      )}
    </Box>
  );
};

export default CourseList;
