/** @format */

import { Box, useTheme } from '@mui/material';
type BlurOverlayProps = {
  children?: React.ReactNode;
};

const BlurOverlay = ({ children }: BlurOverlayProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        //for bgcolor, use theme.palette.background.default
        bgcolor: theme.palette.background.default,
        opacity: 0.5,
        zIndex: theme.zIndex.modal,
        transition: 'opacity 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
      }}>
      {children}
    </Box>
  );
};

export default BlurOverlay;
