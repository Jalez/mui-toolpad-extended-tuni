/** @format */
import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MicIcon from '@mui/icons-material/Mic';
import { useState, useEffect } from 'react';
import DevelopmentTools from '../DevTools/DevelopmentTools';
import { useUserStore } from '../../store/useUserStore';
import useDialogStore from '../../store/useDialogStore';

export const CollapsibleMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    setIsExpanded(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: isExpanded ? 'auto' : 40,
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
          duration: 200,
          easing: theme.transitions.easing.easeInOut,
        }),
        borderRadius: 1,
        // boxShadow: isExpanded ? theme.shadows[3] : 'none',
      }}
      onMouseEnter={() => !isLargeScreen && setIsExpanded(true)}
      onMouseLeave={() => !isLargeScreen && setIsExpanded(false)}>
      <Tooltip title='More actions'>
        <IconButton
          size='small'
          sx={{
            opacity: isExpanded ? 0 : 1,
            // transition: theme.transitions.create('opacity', { duration: 200 }),
            pointerEvents: isExpanded ? 'none' : 'auto',
          }}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Stack
        direction='row'
        spacing={1}
        sx={{
          opacity: isExpanded ? 1 : 0,
          transition: theme.transitions.create('opacity', {
            duration: 200,
            delay: isExpanded ? 100 : 0,
          }),
          pointerEvents: isExpanded ? 'auto' : 'none',
        }}>
        <Tooltip title='No Notifications'>
          <IconButton size='small'>
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Voice Command'>
          <IconButton
            size='small'
            onClick={() => {
              if ('webkitSpeechRecognition' in window) {
                const recognition = new (
                  window as any
                ).webkitSpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.onresult = (event: any) => {
                  console.log('Voice command:', event.results[0][0].transcript);
                };
                recognition.start();
              } else {
                alert('Speech recognition not supported');
              }
            }}>
            <MicIcon />
          </IconButton>
        </Tooltip>
        <DevelopmentTools />
        <PlatformSettingsOpener />
      </Stack>
    </Box>
  );
};

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
