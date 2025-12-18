/** @format */

import { Box, IconButton, Tooltip } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type CourseActionsProps = {
  showEnrollmentOpen: boolean;
};

export const CourseActions = ({ showEnrollmentOpen }: CourseActionsProps) => (
  <Box sx={{ display: 'flex', gap: 0 }}>
    {showEnrollmentOpen && (
      <Tooltip title='Enroll in course'>
        <IconButton size='small' onClick={(e) => e.stopPropagation()}>
          <PersonAddIcon fontSize='small' color='primary' />
        </IconButton>
      </Tooltip>
    )}
    <Tooltip title='View schedule'>
      <IconButton size='small' onClick={(e) => e.stopPropagation()}>
        <CalendarTodayIcon fontSize='small' />
      </IconButton>
    </Tooltip>
    <Tooltip title='Course details'>
      <IconButton size='small' onClick={(e) => e.stopPropagation()}>
        <InfoOutlinedIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  </Box>
);
