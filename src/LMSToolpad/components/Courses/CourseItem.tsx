/** @format */

// CourseItem.tsx
import { ListItem, ListItemText, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Course } from '../../store/useCourseStore';

type CourseItemProps = {
  course: Course;
  isSelected: boolean;
  onSelect: (course: Course) => void;
};

const CourseItem = ({ course, isSelected, onSelect }: CourseItemProps) => (
  <ListItem
    onClick={() => onSelect(course)}
    sx={{
      maxWidth: 300,
      mb: 1,
      borderRadius: 1,
      cursor: 'pointer',
      transition: 'all 0.2s ease-in-out',
      bgcolor: isSelected
        ? (theme) => alpha(theme.palette.primary.main, 0.1)
        : 'background.paper',
      '&:hover': {
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
        transform: 'translateX(8px)',
      },
      '&:active': {
        transform: 'scale(0.98)',
      },
    }}>
    <ListItemText
      primary={
        <Typography
          variant='h6'
          color='primary'
          sx={{
            fontWeight: isSelected ? 'bold' : 'medium',
          }}>
          {course.title}
        </Typography>
      }
      secondary={
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mt: 0.5,
            opacity: 0.8,
          }}>
          {course.description}
        </Typography>
      }
    />
  </ListItem>
);

export default CourseItem;
