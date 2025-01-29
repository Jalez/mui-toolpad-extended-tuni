/** @format */

import { Box, IconButton, Tooltip } from '@mui/material';
import { Course } from '../../store/useCourseStore';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import GroupIcon from '@mui/icons-material/Group';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

type CourseStatsProps = {
  course: Course;
};

export const CourseStats = ({ course }: CourseStatsProps) => (
  <Box sx={{ display: 'flex', gap: 0 }}>
    <Tooltip title={`${course.studyModule?.credits} credits`}>
      <IconButton size='small'>
        <CreditScoreIcon fontSize='small' />
      </IconButton>
    </Tooltip>
    <Tooltip title={`Level: ${course.studyModule?.level}`}>
      <IconButton size='small'>
        <SchoolIcon fontSize='small' />
      </IconButton>
    </Tooltip>
    <Tooltip title={`Language: ${course.language}`}>
      <IconButton size='small'>
        <TranslateIcon fontSize='small' />
      </IconButton>
    </Tooltip>
    {course.enrollment?.status.maxStudents && (
      <Tooltip
        title={`Enrolled: ${course.data?.enrollmentData?.length || 0}/${course.enrollment.status.maxStudents}`}>
        <IconButton size='small'>
          <GroupIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);
