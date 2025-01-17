/** @format */

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  Chip,
  Box,
} from '@mui/material';
import useCourseStore, { Course } from '../../store/useCourseStore';
import SettingsIcon from '@mui/icons-material/Settings';

import useDialogStore from '../../store/useDialogStore';
import defaultCourseImage from '/static/images/default-course.webp'; // You'll need to add this

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

const StatusChip = ({ status }: { status: Course['status'] }) => {
  const colors: Record<Course['status'], 'warning' | 'success' | 'error'> = {
    draft: 'warning',
    active: 'success',
    archived: 'error',
  };

  return <Chip size='small' label={status} color={colors[status]} />;
};

const VisibilityInfo = ({
  visibility,
}: {
  visibility: Course['visibility'];
}) => (
  <Typography variant='caption' color='text.secondary'>
    {visibility.mode.charAt(0).toUpperCase() + visibility.mode.slice(1)}
  </Typography>
);

const CourseMetadata = ({
  language,
  tags,
}: Pick<Course, 'language' | 'tags'>) => (
  <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
    {language && <Chip size='small' label={language} variant='outlined' />}
    {tags?.map((tag) => (
      <Chip key={tag} size='small' label={tag} variant='outlined' />
    ))}
  </Box>
);

const EnrollmentStatus = ({
  enrollmentStatus,
}: {
  enrollmentStatus: Course['enrollmentStatus'];
}) => (
  <Typography
    variant='caption'
    color={enrollmentStatus.open ? 'success.main' : 'error.main'}>
    {enrollmentStatus.open ? 'Enrollment Open' : 'Enrollment Closed'}
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
  const { setOpenDialog } = useDialogStore();
  const { setCourseToUpdate } = useCourseStore();

  const handleSettingsClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setCourseToUpdate(course);
    setOpenDialog('CourseSettings');
  };

  const renderContent = () => {
    const imageUrl = course.image || defaultCourseImage;
    return (
      <Stack spacing={1}>
        <CardMedia
          component='img'
          height='140'
          image={imageUrl}
          alt={course.title}
        />
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'>
          <Stack spacing={0.5}>
            <CourseTitle title={course.title} />
            {displayMode !== 'instanceList' && (
              <CourseCode code={course.code} />
            )}
            {(displayMode === 'instance' || displayMode === 'instanceList') && (
              <CourseInstance instance={course.instance} />
            )}
          </Stack>
          <Stack direction='row' spacing={1} alignItems='center'>
            <StatusChip status={course.status} />
            <IconButton onClick={handleSettingsClick}>
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction='row' spacing={1} alignItems='center'>
          <VisibilityInfo visibility={course.visibility} />
          <EnrollmentStatus enrollmentStatus={course.enrollmentStatus} />
        </Stack>
        <CourseMetadata language={course.language} tags={course.tags} />
        <LastUpdateDate date={course.updatedAt} isInactive={isInactive} />
      </Stack>
    );
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        cursor: 'pointer',
        border: isSelected ? 2 : 1,
        borderColor: isSelected ? 'primary.light' : 'background.paper',
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
