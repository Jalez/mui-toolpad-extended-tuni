/** @format */

import { Divider, Stack, MenuItem } from '@mui/material';
import { Settings, Feedback } from '@mui/icons-material';
import {
  Account,
  AccountPopoverFooter,
  AccountPreview,
  SignOutButton,
  ToolbarActions,
} from '@toolpad/core';
import { useUserStore } from '../../store/useUserStore';
import useDialogStore from '../../store/useDialogStore';

export const ToolbarAccount = () => {
  return (
    <Account
      slots={{
        popoverContent: AccountMenu,
      }}
    />
  );
};

const AccountMenu = () => {
  const { user, setUserToUpdate } = useUserStore();
  const { setOpenDialog } = useDialogStore();
  const handleSettingsClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setUserToUpdate(user);
    setOpenDialog('UserSettings');
  };
  return (
    <Stack direction='column'>
      <Stack direction='row' alignItems='center' spacing={2}>
        <AccountPreview variant='expanded' />
        <ToolbarActions />
      </Stack>
      <Divider />
      <MenuItem sx={{ gap: 1 }} onClick={handleSettingsClick}>
        <Settings fontSize='small' />
        User Settings
      </MenuItem>
      <MenuItem sx={{ gap: 1 }}>
        <Feedback fontSize='small' />
        Give feedback
      </MenuItem>
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
};
