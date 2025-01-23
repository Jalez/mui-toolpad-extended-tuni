/** @format */

import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { useUserStore, UserData } from '../../store/useUserStore';

type VisibleListKey = keyof UserData['preferences']['visibleCourseLists'];

const listOptions: Array<{ key: VisibleListKey; label: string }> = [
  { key: 'isStudent', label: 'Current Courses' },
  { key: 'isStudentOld', label: 'Completed Courses' },
  { key: 'isTeacher', label: 'Teaching Courses' },
  { key: 'isTeacherOld', label: 'Past Teaching' },
  { key: 'available', label: 'Available Courses' },
];

export const CourseListVisibilityMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, updateUser } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (key: VisibleListKey) => {
    if (!user || !visibleLists) return;

    const updatedUser: UserData = {
      ...user,
      preferences: {
        ...user.preferences,
        visibleCourseLists: {
          ...visibleLists,
          [key]: !visibleLists[key],
        },
      },
    };

    updateUser(updatedUser);
  };

  return (
    <>
      <IconButton onClick={handleClick} size='small'>
        <FilterListIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {listOptions.map(({ key, label }) => (
          <MenuItem key={key} onClick={() => handleToggle(key)} dense>
            <Checkbox checked={visibleLists?.[key] ?? true} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
