/** @format */

// CourseSelector.tsx
import { Typography, Box, Fade } from '@mui/material';
import useCourseStore from '../../store/useCourseStore';
import { useEffect, useState } from 'react';
import CourseList from './CourseList';
import { useNavigate } from 'react-router-dom';
import { slugify } from '../../../educhatRoutes/utils/slugify';

const CourseSelector = () => {
  const { courses, currentCourse } = useCourseStore();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);



  return (
    <Fade in={mounted} timeout={500}>
      <Box
        sx={{
          p: 3,
          // height: ' 100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
        <Typography
          variant='h4'
          sx={{
            mb: 3,
            fontWeight: 'medium',
            color: 'primary.main',
          }}>
          Courses
        </Typography>
        <CourseList
          courses={courses}
          selectedCourse={currentCourse}
          onSelectCourse={(course) => navigate(`${slugify(course.title)}`)}
        />
      </Box>
    </Fade>
  );
};

export default CourseSelector;
