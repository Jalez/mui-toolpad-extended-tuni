/** @format */

import { Typography } from '@mui/material';
import useCourseStore from '../store/useCourseStore';
import CourseSelector from './Courses/CourseSelector';
import LoadingScreen from './LoadingScreen';

const Home = () => {
  const { currentCourse, fetchState } = useCourseStore();
  return (
    <>
      <CourseSelector />
      {!currentCourse && fetchState !== 'loading' && (
        <Typography
          variant="h1"
          sx={{ textAlign: 'center', mt: 5, color: 'text.secondary' }}
        >Select a course to get started</Typography>
      )}
      {fetchState === 'loading' && <LoadingScreen />}
    </>
  );
};
export default Home;
