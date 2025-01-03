/** @format */

import { Box, Typography } from '@mui/material';

import useCourseStore from '../store/useCourseStore';
// import logo from '/static/images/tuni.png';

export const Logo = () => {
  const { setCurrentCourse} = useCourseStore((state) => state);
  // <img
  //   style={{
  //     maxWidth: "30px",
  //     margin: "0 auto",
  //     display: "block",
  //     padding: "0px",
  //     textAlign: "center",
  //   }}
  //   src={logo}
  //   alt="EduChat"
  // />
  return (
    <Box
    onClick={() => setCurrentCourse(null)}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: '1',
        // gap: '0.5rem',
      }}>
      <Typography variant='h1' component='h1'>
        {'EduML'}
      </Typography>
      {/* {user && user.id && <DevelopmentTools />} */}
    </Box>
  );
};
