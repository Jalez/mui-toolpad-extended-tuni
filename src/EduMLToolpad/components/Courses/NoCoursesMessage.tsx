/** @format */

import { ListItem, ListItemText, Typography } from '@mui/material';

const NoCoursesMessage = () => (
  <ListItem>
    <ListItemText
      primary={
        <Typography variant='h6' color='primary'>
          No Courses Found
        </Typography>
      }
      secondary={
        <Typography variant='body2' color='text.secondary'>
          You must link a course to EduML to get started.
        </Typography>
      }
    />
  </ListItem>
);

export default NoCoursesMessage;
