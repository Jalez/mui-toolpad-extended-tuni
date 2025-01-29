/** @format */

import { Box } from '@mui/material';
import { PageContainerToolbar } from '@toolpad/core';
import LayoutToggle from '../../Courses/LayoutToggle';
import { useUserStore } from '../../../store/useUserStore';
import ResizeToggler from '../../Common/Resizable/Tools/ResizeToggler';

const HomeToolbar = () => {
  const { user, updateUser } = useUserStore();
  const navigationType = user?.preferences?.navigationType || 'direct';

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
        <ResizeToggler />
        <LayoutToggle value={navigationType} onChange={handleLayoutChange} />
      </Box>
    </PageContainerToolbar>
  );
};

export default HomeToolbar;
