/** @format */

import { IconButton, Stack, Tooltip } from '@mui/material';
import { ToolbarActions } from '@toolpad/core';
import { useUserStore } from '../../store/useUserStore';
import SettingsIcon from '@mui/icons-material/Settings';
import useDialogStore from '../../store/useDialogStore';

export function CustomActions() {
  return (
    <Stack direction='row' alignItems='center' spacing={2}>
      <ToolbarActions />
      <PlatformSettingsOpener />
    </Stack>
  );
}

const PlatformSettingsOpener = () => {
  const { user } = useUserStore();
  const { setOpenDialog } = useDialogStore();

  if (user?.role !== 'admin') return null;

  const handleOpenPlatformSettings = () => {
    console.log('Open Platform Settings');
    setOpenDialog('PlatformSettings');
  };

  return (
    <Tooltip title='Platform Settings'>
      <IconButton
        onClick={handleOpenPlatformSettings}
        size='small'
        color='inherit'>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};
