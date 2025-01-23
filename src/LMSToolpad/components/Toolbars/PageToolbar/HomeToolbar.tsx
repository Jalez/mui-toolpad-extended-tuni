/** @format */

import { Box, IconButton, Tooltip } from '@mui/material';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import { PageContainerToolbar } from '@toolpad/core';
import LayoutToggle from '../../Courses/LayoutToggle';
import { CourseListVisibilityMenu } from '../../Courses/CourseListVisibilityMenu';
import { useUserStore } from '../../../store/useUserStore';
import { usePlatformStore } from '../../../store/usePlatformStore';

const HomeToolbar = () => {
  const { user, updateUser } = useUserStore();
  const navigationType = user?.preferences?.navigationType || 'direct';
  const { platform, toggleResizeMode } = usePlatformStore();
  const resizeMode = platform.interface.resizeMode;

  const handleLayoutChange = (value: 'direct' | 'instances') => {
    if (!user) return;
    updateUser({
      ...user,
      preferences: {
        ...user.preferences,
        navigationType: value,
      },
    });
  };

  return (
    <PageContainerToolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          gap: 1,
          width: '100%',
        }}>
        <Tooltip title={resizeMode ? 'Exit Resize Mode' : 'Enter Resize Mode'}>
          <IconButton
            size='small'
            onClick={toggleResizeMode}
            color={resizeMode ? 'primary' : 'default'}>
            <OpenWithIcon />
          </IconButton>
        </Tooltip>
        <CourseListVisibilityMenu />
        <LayoutToggle value={navigationType} onChange={handleLayoutChange} />
      </Box>
    </PageContainerToolbar>
  );
};

export default HomeToolbar;
