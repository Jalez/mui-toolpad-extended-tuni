/** @format */

import { Box } from '@mui/material';
import React from 'react';

interface BlurOverlayProps {
  children: React.ReactNode;
}

const BlurOverlay = ({ children }: BlurOverlayProps) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}>
    {children}
  </Box>
);

export default BlurOverlay;
