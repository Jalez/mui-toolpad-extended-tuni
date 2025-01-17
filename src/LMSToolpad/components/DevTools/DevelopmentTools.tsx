/** @format */

import { Typography, Paper, MenuList, Button } from '@mui/material';
import UserSwitcher from './UserSwitcher';
import WarningIcon from '@mui/icons-material/Warning';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNotificationStore } from '../../store/useNotificationsStore';

const DevelopmentTools: React.FC = () => {
  const devMode = window.location.hostname === 'localhost';
  const { addNotificationData } = useNotificationStore();

  if (!devMode) return null;

  const handleReset = async () => {
    try {
      const response = await fetch('/api/dev/reset', { method: 'POST' });
      if (!response.ok) throw new Error('Reset failed');

      addNotificationData({
        type: 'success',
        message: 'Store reset successful. Reloading page...',
      });

      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      addNotificationData({
        type: 'error',
        message:
          'Failed to reset store. Make sure mock service worker is running and the route "/api/dev/reset" is available and working to reset the store.',
      });
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          margin: 2,
          p: 2,
          maxWidth: 300,
          backgroundColor: 'warning.light',
        }}>
        <Typography
          variant='h6'
          color='warning.dark'
          sx={{
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            fontSize: '1rem',
          }}>
          <WarningIcon />
          Development Tools
        </Typography>
        <Typography
          variant='body2'
          color='black'
          sx={{
            fontSize: '0.6rem',
          }}>
          Note: Switching between users only affects the view. All backend
          requests (GET, POST, PUT, DELETE) will still be made with the original
          authenticated user.
        </Typography>
        <Button
          startIcon={<RestartAltIcon />}
          variant='contained'
          color='warning'
          size='small'
          onClick={handleReset}
          sx={{ mt: 1 }}>
          Reset Store
        </Button>
      </Paper>
      <MenuList id='dev-menu'>
        <UserSwitcher />
      </MenuList>
    </>
  );
};

export default DevelopmentTools;
