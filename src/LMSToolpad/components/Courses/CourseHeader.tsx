/** @format */

import { Box, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Course } from '../../store/useCourseStore';

type CourseHeaderProps = {
  course: Course;
  side: 'front' | 'back';
  courseColor: string;
  isTeacher: boolean;
  onFlip: (e: React.MouseEvent<HTMLElement>) => void;
  onSettingsClick: (e: React.MouseEvent<HTMLElement>) => void;
};

export const CourseHeader = ({
  course,
  side,
  courseColor,
  isTeacher,
  onFlip,
  onSettingsClick,
}: CourseHeaderProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
    <Typography variant='subtitle1' sx={{ fontWeight: 500 }}>
      {course.title}
    </Typography>
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {isTeacher && (
        <IconButton
          size='small'
          onClick={onSettingsClick}
          sx={{ color: courseColor }}>
          <SettingsIcon fontSize='small' />
        </IconButton>
      )}
      <IconButton size='small' onClick={onFlip} sx={{ color: courseColor }}>
        {side === 'front' ? (
          <InfoIcon fontSize='small' />
        ) : (
          <ArrowBackIcon fontSize='small' />
        )}
      </IconButton>
    </Box>
  </Box>
);
