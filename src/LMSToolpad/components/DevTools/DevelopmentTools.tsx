/** @format */

import {
  Typography,
  Paper,
  Button,
  IconButton,
  Menu,
  Tooltip,
  Divider,
  Box,
} from '@mui/material';
import UserSwitcher from './UserSwitcher';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import BuildIcon from '@mui/icons-material/Build';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useNotificationStore } from '../../store/useNotificationsStore';
import { useState, MouseEvent } from 'react';

const DevelopmentTools: React.FC = () => {
  const devMode = window.location.hostname === 'localhost';
  const { addNotificationData } = useNotificationStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!devMode) return null;

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <Tooltip title='Development Tools'>
        <IconButton size='small' onClick={handleOpen}>
          <BuildIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
          //add arrow to the menu
        }}
        //Set margin to 0 to margin from MuiList-root MuiList-padding MuiMenu-list css-1toxriw-MuiList-root-MuiMenu-list
        sx={{ '& .MuiList-root': { p: 0 } }}
        data-testid='development-tools-menu'>
        <Paper
          sx={{ width: 350, maxHeight: '80vh', overflow: 'auto' }}
          data-testid='development-tools-menu-paper'>
          {/* Header */}
          <Box sx={{ p: 2, bgcolor: 'warning.light' }}>
            <Typography
              variant='h6'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: '1rem',
                fontWeight: 'bold',
                color: 'warning.dark',
              }}>
              <EngineeringIcon /> Development Tools
            </Typography>
          </Box>

          <Divider />

          {/* User Simulation Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant='subtitle2' gutterBottom>
              User Simulation
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'
              sx={{ mb: 1 }}>
              Switch between different user roles to test UI views. Note:
              Backend requests still use the original authenticated user.
            </Typography>
            <UserSwitcher />
          </Box>

          <Divider />

          {/* Data Management Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant='subtitle2' gutterBottom>
              Data Management
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              display='block'
              sx={{ mb: 1 }}>
              Reset Store: Clears all local data and resets the application
              state to its initial values. Useful when testing gets stuck or
              data becomes inconsistent.
            </Typography>
            <Button
              startIcon={<RestartAltIcon />}
              variant='outlined'
              color='warning'
              size='small'
              onClick={handleReset}
              fullWidth>
              Reset Store
            </Button>
          </Box>

          <Divider />

          {/* TODO Tools Section */}
          <Box sx={{ p: 2 }}>
            <Typography variant='subtitle2' gutterBottom>
              Planned Features
            </Typography>
            <Typography
              variant='caption'
              color='text.secondary'
              component='div'>
              Future development tools to be implemented:
              <ul>
                <li>Network Request Logger</li>
                <li>Performance Metrics Monitor</li>
                <li>State Inspector</li>
                <li>Error Boundary Testing</li>
                <li>Theme Switcher</li>
                <li>Mock API Response Editor</li>
              </ul>
            </Typography>
          </Box>
        </Paper>
      </Menu>
    </>
  );
};

export default DevelopmentTools;
