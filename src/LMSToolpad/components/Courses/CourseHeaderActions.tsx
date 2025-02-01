/** @format */

import {
  Box,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import StarsIcon from '@mui/icons-material/Stars';
import GroupAddIcon from '@mui/icons-material/GroupAdd'; // Add this import
import { useState, MouseEvent } from 'react';
import { Course } from '../../store/useCourseStore';

type CourseHeaderActionsProps = {
  course: Course;
  courseColor: string;
  isTeacher: boolean;
  showEnrollmentOpen?: boolean;
  onSettingsClick: (e: React.MouseEvent<HTMLElement>) => void;
  onEnroll?: (e: React.MouseEvent<HTMLElement>) => void;
  onTeacherEnroll?: (e: React.MouseEvent<HTMLElement>) => void; // New prop
};

export const CourseHeaderActions = ({
  course,
  courseColor,
  isTeacher,
  showEnrollmentOpen,
  onSettingsClick,
  onEnroll,
  onTeacherEnroll,
}: CourseHeaderActionsProps) => {
  const [infoAnchor, setInfoAnchor] = useState<null | HTMLElement>(null);
  const [enrollAnchor, setEnrollAnchor] = useState<null | HTMLElement>(null);

  const handleEnrollClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setEnrollAnchor(null); // Close menu
    if (isTeacher) {
      onTeacherEnroll?.(e);
    } else {
      onEnroll?.(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      {showEnrollmentOpen && (
        <>
          <Tooltip
            title={isTeacher ? 'Manage enrollments' : 'Enroll in course'}>
            <IconButton
              size='small'
              color='success'
              onClick={(e) => {
                e.stopPropagation();
                setEnrollAnchor(e.currentTarget);
              }}
              sx={{ width: 28, height: 28, padding: 0 }}>
              {isTeacher ? (
                <GroupAddIcon sx={{ fontSize: 18 }} />
              ) : (
                <PersonAddIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={enrollAnchor}
            open={Boolean(enrollAnchor)}
            onClose={(event: MouseEvent<HTMLElement>) => {
              event.stopPropagation();
              setEnrollAnchor(null);
            }}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <MenuItem dense disabled>
              <ListItemIcon>
                <GroupIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText
                primary={`${course.data?.enrollmentData?.length || 0}/${course.enrollment?.status.maxStudents} enrolled`}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </MenuItem>
            <Divider />
            <MenuItem dense onClick={handleEnrollClick}>
              {isTeacher ? 'Manage Student Enrollments' : 'Enroll Now'}
            </MenuItem>
          </Menu>
        </>
      )}
      {isTeacher && (
        <Tooltip title='Course settings'>
          <IconButton
            size='small'
            onClick={onSettingsClick}
            sx={{ color: courseColor, width: 28, height: 28, padding: 0 }}>
            <SettingsIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}
      <>
        <Tooltip title='Course details'>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              setInfoAnchor(e.currentTarget);
            }}
            sx={{ color: courseColor, width: 28, height: 28, padding: 0 }}>
            <InfoIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={infoAnchor}
          open={Boolean(infoAnchor)}
          onClose={(event: MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            setInfoAnchor(null);
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <MenuItem dense disabled>
            <ListItemIcon>
              <SchoolIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={course.studyModule?.level}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
          <MenuItem dense disabled>
            <ListItemIcon>
              <StarsIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={`${course.studyModule?.credits} credits`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
          <MenuItem dense disabled>
            <ListItemIcon>
              <TranslateIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText
              primary={course.language}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </MenuItem>
        </Menu>
      </>
    </Box>
  );
};
