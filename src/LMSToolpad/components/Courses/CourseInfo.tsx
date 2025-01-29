/** @format */

import { Box, Typography, Chip } from '@mui/material';
import { Course } from '../../store/useCourseStore';

type CourseInfoProps = {
  course: Course;
  displayMode: 'course' | 'instance' | 'instanceList';
  showEnrollmentOpen: boolean;
  hasUpcomingEvents: boolean;
};

export const CourseInfo = ({
  course,
  displayMode,
  showEnrollmentOpen,
  hasUpcomingEvents,
}: CourseInfoProps) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      mb: 'auto',
    }}>
    <Typography variant='caption' color='text.secondary'>
      {course.code}
    </Typography>
    {displayMode !== 'course' && (
      <Typography variant='caption' color='text.secondary'>
        • {course.instance}
      </Typography>
    )}

    <Box
      sx={{
        display: 'flex',
        gap: 0,
        flexWrap: 'wrap',
        mt: 'auto',
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
);
