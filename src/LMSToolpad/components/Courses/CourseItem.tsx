/** @format */

import { Card, Box } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import useDialogStore from '../../store/useDialogStore';
import useCourseStore from '../../store/useCourseStore';
import { useState } from 'react';
import { subjectConfig } from '../../config/subjectConfig';
import { CourseHeader } from './CourseHeader';
import { CourseInfo } from './CourseInfo';
import { CourseActions } from './CourseActions';
import { CourseStats } from './CourseStats';
import PaginationDots from '../Common/PaginationDots';

type CourseItemProps = {
  course: Course;
  isSelected?: boolean;
  onSelect: (course: Course) => void;
  displayMode?: 'course' | 'instance' | 'instanceList';
};

const CourseItem = ({
  course,
  onSelect,
  displayMode = 'course',
}: CourseItemProps) => {
  const { setOpenDialog } = useDialogStore();
  const { setCourseToUpdate } = useCourseStore();
  const [side, setSide] = useState<'front' | 'back'>('front');

  const subject = course.code.split('.')[0];
  const config = subjectConfig[subject] || subjectConfig['COMP.CS'];
  const level = course.studyModule?.level || 'basic';
  const courseColor = config.levelShades[level];

  const isTeacher = course.data?.myData?.role === 'teacher';
  const isEnrolled = course.data?.myData?.status === 'enrolled';
  const showEnrollmentOpen = Boolean(
    !isEnrolled && course.enrollment?.status.open
  );
  const hasUpcomingEvents = Boolean(
    course.events.lecture.some(
      (event) => new Date(event.startTime) > new Date()
    )
  );

  const handleSettingsClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCourseToUpdate(course);
    setOpenDialog('CourseSettings');
  };

  const handleFlip = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setSide(side === 'front' ? 'back' : 'front');
  };

  const handleArrowClick = (direction: 'start' | 'end') => {
    setSide(direction === 'start' ? 'front' : 'back');
  };

  return (
    <Card
      elevation={0}
      sx={{
        boxSizing: 'border-box',
        position: 'relative',
        cursor: 'pointer',
        flex: '1',
        backgroundColor: `${courseColor}08`,
        borderLeft: `4px solid ${courseColor}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        perspective: '2000px', // Increased perspective for better 3D effect
        height: '100%', // Ensure card takes full height
        '&:hover': {
          backgroundColor: `${courseColor}15`,
          '& .subject-icon': {
            opacity: 0.15,
            transform: 'scale(1.1)',
          },
        },
      }}
      onClick={() => onSelect(course)}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.8s',
          transformStyle: 'preserve-3d',
          transform: side === 'back' ? 'rotateY(180deg)' : 'rotateY(0)',
        }}>
        {/* Front Side */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            visibility: side === 'front' ? 'visible' : 'hidden',
            backgroundColor: `${courseColor}08`,
            zIndex: side === 'front' ? 1 : 0,
          }}>
          <Box
            component='img'
            className='subject-icon'
            src={config.icon}
            alt={subject}
            sx={{
              position: 'absolute',
              right: -10,
              bottom: -10,
              width: '80px',
              height: '80px',
              opacity: 0.08,
              transition: 'all 0.3s ease-in-out',
              filter: `drop-shadow(0 0 1px ${courseColor})`,
            }}
          />
          <Box
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <CourseHeader
              course={course}
              side={side}
              courseColor={courseColor}
              isTeacher={isTeacher}
              onFlip={handleFlip}
              onSettingsClick={handleSettingsClick}
            />
            <CourseInfo
              course={course}
              displayMode={displayMode}
              showEnrollmentOpen={showEnrollmentOpen}
              hasUpcomingEvents={hasUpcomingEvents}
            />
          </Box>
        </Box>

        {/* Back Side */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            visibility: side === 'back' ? 'visible' : 'hidden',
            backgroundColor: `${courseColor}08`,
            zIndex: side === 'back' ? 1 : 0,
          }}>
          <Box
            sx={{
              p: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <CourseHeader
              course={course}
              side={side}
              courseColor={courseColor}
              isTeacher={isTeacher}
              onFlip={handleFlip}
              onSettingsClick={handleSettingsClick}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 'auto',
              }}>
              <CourseStats course={course} />
              <CourseActions showEnrollmentOpen={showEnrollmentOpen} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Pagination Dots */}

      <PaginationDots
        total={2}
        current={side === 'front' ? 0 : 1}
        onDotClick={(index) => setSide(index === 0 ? 'front' : 'back')}
        onArrowClick={handleArrowClick}
        showArrows={true}
        disableStart={side === 'front'}
        disableEnd={side === 'back'}
      />
    </Card>
  );
};

export default CourseItem;
