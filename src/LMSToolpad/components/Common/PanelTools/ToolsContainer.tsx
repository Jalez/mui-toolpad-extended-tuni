/** @format */

import { Box } from '@mui/material';
import React from 'react';

interface ToolsContainerProps {
  children: React.ReactNode;
}

export const ToolsContainer = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: 'flex', gap: 1 }}>{children}</Box>
);

interface ToolsContainerWrapperProps {
  children: React.ReactNode;
  position?: 'top-right' | 'bottom-right';
}

export const ToolsContainerWrapper = ({
  children,
  position = 'top-right',
}: ToolsContainerWrapperProps) => (
  <Box
    sx={{
      position: 'absolute',
      ...(position === 'top-right'
        ? {
            top: 8,
            right: 8,
          }
        : {
            bottom: 8,
            right: 8,
          }),
      zIndex: 2,
      opacity: 0,
      transition: 'opacity 0.2s ease-in-out',
      '.MuiBox-root:hover > &': {
        opacity: 1,
      },
    }}>
    {children}
  </Box>
);

export default ToolsContainer;
