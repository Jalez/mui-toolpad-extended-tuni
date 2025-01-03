/** @format */

import { Typography, Paper, MenuList } from '@mui/material';
import UserSwitcher from './UserSwitcher';
import WarningIcon from '@mui/icons-material/Warning';
const DevelopmentTools: React.FC = () => {
  const devMode = window.location.hostname === 'localhost';
  if (!devMode) {
    return null;
  }

  return (
    <>
      {' '}
      <Paper
        elevation={3}
        sx={{
          margin: 2,
          p: 2,
          maxWidth: 300,
          //give it warning color
          backgroundColor: 'warning.light',
          // backgroundImage: 'linear-gradient(315deg, #f3dfc1 0%, #cbe2a0 74%)',
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
          color='text.secondary'
          sx={{
            fontSize: '0.6rem',
          }}>
          Note: Switching between users only affects the view. All backend
          requests (GET, POST, PUT, DELETE) will still be made with the original
          authenticated user.
        </Typography>
      </Paper>
      <MenuList id='dev-menu'>
        <UserSwitcher />
      </MenuList>
    </>
  );
};

export default DevelopmentTools;
