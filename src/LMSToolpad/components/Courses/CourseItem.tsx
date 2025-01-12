/** @format */

import { Card, CardContent, Typography, Stack } from '@mui/material';
import { Course } from '../../store/useCourseStore';

type CourseItemProps = {
  course: Course;
  isSelected?: boolean;
  isInactive?: boolean;
  onSelect: (course: Course) => void;
  displayMode?: 'course' | 'instance' | 'instanceList';
};

const CourseTitle = ({ title }: { title: string }) => (
  <Typography variant='h6' component='div' gutterBottom>
    {title}
  </Typography>
);

const CourseCode = ({ code }: { code: string }) => (
  <Typography color='text.secondary'>{code}</Typography>
);

const CourseInstance = ({ instance }: { instance: string }) => (
  <Typography variant='body2' color='text.secondary'>
    Instance: {instance}
  </Typography>
);

const LastUpdateDate = ({
  date,
  isInactive,
}: {
  date: string;
  isInactive?: boolean;
}) => (
  <Typography
    variant='caption'
    color={isInactive ? 'text.secondary' : 'primary.light'}
    sx={{
      display: 'block',
      mt: 1,
      fontStyle: isInactive ? 'italic' : 'normal',
      opacity: isInactive ? 0.8 : 1,
    }}>
    Last updated: {new Date(date).toLocaleDateString()}
  </Typography>
);

/**
 * Course item component for displaying individual course cards.
 *
 * @version 2.1.0
 * @updates
 * - Completely redesigned with new card-based layout
 * - Added support for inactive course states
 * - Enhanced display modes (course/instance/instanceList)
 * - Added transition animations and hover effects
 * - Improved accessibility with better contrast and focus states
 *
 * @component
 * @param {CourseItemProps} props
 */
const CourseItem = ({
  course,
  isSelected,
  isInactive,
  onSelect,
  displayMode = 'course',
}: CourseItemProps) => {
  const renderContent = () => (
    <Stack spacing={1}>
      <CourseTitle title={course.title} />
      {displayMode !== 'instanceList' && <CourseCode code={course.code} />}
      {(displayMode === 'instance' || displayMode === 'instanceList') && (
        <CourseInstance instance={course.instance} />
      )}
      <LastUpdateDate date={course.updatedAt} isInactive={isInactive} />
    </Stack>
  );

  return (
    <Card
      sx={{
        minWidth: 200,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'primary.light' : 'background.paper',
        opacity: isInactive ? 0.7 : 1,
        filter: isInactive ? 'grayscale(30%)' : 'none',
        '&:hover': {
          backgroundColor: 'action.hover',
          opacity: 1,
          filter: 'none',
        },
        transition: 'all 0.3s ease',
      }}
      onClick={() => onSelect(course)}>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default CourseItem;
