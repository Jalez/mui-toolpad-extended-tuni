/** @format */

import {
  Card,
  Typography,
  IconButton,
  Box,
  Chip,
  Collapse,
} from '@mui/material';
import useCourseStore, {
  Course,
  courseLevel,
} from '../../store/useCourseStore';
import SettingsIcon from '@mui/icons-material/Settings';
import useDialogStore from '../../store/useDialogStore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

// Add subject configurations
const subjectConfig: {
  [key: string]: {
    icon: string;
    baseColor: string;
    levelShades: { [K in courseLevel]: string };
  };
} = {
  'COMP.CS': {
    icon: '/static/images/icons/code.svg',
    baseColor: '#2196f3', // Blue
    levelShades: {
      basic: '#90caf9', // Light blue
      intermediate: '#2196f3', // Medium blue
      advanced: '#1565c0', // Dark blue
    },
  },
  MATH: {
    icon: '/static/images/icons/line.svg',
    baseColor: '#4caf50', // Green
    levelShades: {
      basic: '#a5d6a7',
      intermediate: '#4caf50',
      advanced: '#2e7d32',
    },
  },
  PHYS: {
    icon: '/static/images/icons/weight.svg',
    baseColor: '#f44336', // Red
    levelShades: {
      basic: '#ef9a9a',
      intermediate: '#f44336',
      advanced: '#c62828',
    },
  },
  BIO: {
    icon: '/static/images/icons/dna.svg',
    baseColor: '#9c27b0', // Purple
    levelShades: {
      basic: '#ce93d8',
      intermediate: '#9c27b0',
      advanced: '#6a1b9a',
    },
  },
  CHEM: {
    icon: '/static/images/icons/atom.svg',
    baseColor: '#ff9800', // Orange
    levelShades: {
      basic: '#ffb74d',
      intermediate: '#ff9800',
      advanced: '#ef6c00',
    },
  },
  LANG: {
    icon: '/static/images/icons/lang.svg',
    baseColor: '#795548', // Brown
    levelShades: {
      basic: '#a1887f',
      intermediate: '#795548',
      advanced: '#4e342e',
    },
  },
};

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
  const [expanded, setExpanded] = useState(false);

  // Get subject from course code and ensure type safety
  const subject = course.code.split('.')[0];
  const config = subjectConfig[subject] || subjectConfig['COMP.CS'];
  const level = course.studyModule?.level || 'basic';
  const courseColor = config.levelShades[level as courseLevel];

  // Update to use course-specific role from course data
  const isTeacher = course.data?.myData?.role === 'teacher';

  const handleSettingsClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCourseToUpdate(course);
    setOpenDialog('CourseSettings');
  };

  const isEnrolled = course.data?.myData?.status === 'enrolled';
  const showEnrollmentOpen = !isEnrolled && course.enrollment?.status.open;
  const hasUpcomingEvents = course.events.lecture.some(
    (event) => new Date(event.startTime) > new Date()
  );

  const handleExpandClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Card
      elevation={0}
      sx={{
        //Ensure everything gets counted in the height and width, including padding

        boxSizing: 'border-box',
        position: 'relative',
        cursor: 'pointer',
        flex: '1',
        backgroundColor: `${courseColor}08`,
        borderLeft: `4px solid ${courseColor}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        '&:hover': {
          backgroundColor: `${courseColor}15`,
          '& .subject-icon': {
            opacity: 0.15,
            transform: 'scale(1.1)',
          },
        },
      }}
      onClick={() => onSelect(course)}>
      {/* Subject Icon */}
      <Box
        className='subject-icon'
        component='img'
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

      {/* Main Content */}
      <Box
        sx={{
          p: 2,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        {/* Header with Expand Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
            {course.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            {isTeacher && (
              <IconButton
                size='small'
                onClick={handleSettingsClick}
                sx={{ color: courseColor }}>
                <SettingsIcon fontSize='small' />
              </IconButton>
            )}
            <IconButton
              size='small'
              onClick={handleExpandClick}
              sx={{
                color: courseColor,
                transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s',
              }}>
              <ExpandMoreIcon fontSize='small' />
            </IconButton>
          </Box>
        </Box>

        {/* Course Info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // gap: 1,
            mb: expanded ? 0 : 'auto',
          }}>
          <Typography variant='caption' color='text.secondary'>
            {course.code}
          </Typography>
          {displayMode !== 'course' && (
            <Typography variant='caption' color='text.secondary'>
              • {course.instance}
            </Typography>
          )}

          {/* Status Indicators */}
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flexWrap: 'wrap',
              mt: 'auto', // Push to bottom when collapsed
            }}>
            {showEnrollmentOpen && (
              <Chip
                size='small'
                label='Enrollment Open'
                sx={{
                  backgroundColor: 'success.light',
                  color: 'success.contrastText',
                  height: 20,
                }}
              />
            )}
            {hasUpcomingEvents && (
              <Chip
                size='small'
                label='Upcoming Events'
                sx={{
                  backgroundColor: 'info.light',
                  color: 'info.contrastText',
                  height: 20,
                }}
              />
            )}
          </Box>
        </Box>

        {/* Expandable Details Section */}
        <Collapse
          in={expanded}
          timeout={300}
          sx={{
            '& .MuiCollapse-wrapper': {
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
            },
          }}>
          <Box
            sx={{
              pt: 2,
              mt: 2,
              borderTop: 1,
              borderColor: `${courseColor}30`,
              opacity: expanded ? 1 : 0,
              transform: expanded ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
            {/* Quick Actions */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {showEnrollmentOpen && (
                <IconButton size='small' title='Enroll'>
                  <PersonAddIcon fontSize='small' />
                </IconButton>
              )}
              <IconButton size='small' title='View Schedule'>
                <CalendarTodayIcon fontSize='small' />
              </IconButton>
              <IconButton size='small' title='Course Info'>
                <InfoOutlinedIcon fontSize='small' />
              </IconButton>
            </Box>

            {/* Course Stats */}
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'>
              Credits: {course.studyModule?.credits} • Level:{' '}
              {course.studyModule?.level}
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'>
              Language: {course.language}
            </Typography>
            {course.enrollment?.status.maxStudents && (
              <Typography
                variant='caption'
                color='text.secondary'
                display='block'>
                Spots: {course.data?.enrollmentData?.length || 0}/
                {course.enrollment.status.maxStudents}
              </Typography>
            )}
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
};

export default CourseItem;
