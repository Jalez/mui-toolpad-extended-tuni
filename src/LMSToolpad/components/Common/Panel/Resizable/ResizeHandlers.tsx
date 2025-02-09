/** @format */

import { Box, useTheme } from '@mui/material';

export type direction = 'horizontal' | 'vertical' | 'corner';

type ResizeHandlesProps = {
  handleMouseDown: (direction: direction) => (e: React.MouseEvent) => void;
  handleTouchStart: (direction: direction) => (e: React.TouchEvent) => void; // Add this prop
};

const ResizeHandlers = ({
  handleMouseDown,
  handleTouchStart,
}: ResizeHandlesProps) => {
  const theme = useTheme();
  return (
    <>
      <Box
        onMouseDown={handleMouseDown('horizontal')}
        onTouchStart={handleTouchStart('horizontal')} // Add touch handler
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '4px',
          height: '100%',
          cursor: 'ew-resize',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.2,
          },
          '&:active': {
            opacity: 0.4,
          },
          '@media (hover: none)': {
            // Add mobile styles
            width: '12px', // Wider touch target
          },
        }}
      />
      <Box
        onMouseDown={handleMouseDown('vertical')}
        onTouchStart={handleTouchStart('vertical')} // Add touch handler
        sx={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          height: '4px',
          width: '100%',
          cursor: 'ns-resize',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            opacity: 0.2,
          },
          '&:active': {
            opacity: 0.4,
          },
          '@media (hover: none)': {
            // Add mobile styles
            height: '12px', // Taller touch target
          },
        }}
      />
      <Box
        onMouseDown={handleMouseDown('corner')}
        onTouchStart={handleTouchStart('corner')} // Add touch handler
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: '12px',
          width: '12px',
          cursor: 'nwse-resize',
          '&:hover': {
            '&::after': {
              opacity: 0.2,
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderWidth: '0 0 12px 12px',
            borderColor: `transparent transparent ${theme.palette.primary.main} transparent`,
            opacity: 0.1,
            transition: 'opacity 0.2s ease',
          },
          '@media (hover: none)': {
            // Add mobile styles
            height: '24px',
            width: '24px',
          },
        }}
      />
    </>
  );
};

export default ResizeHandlers;
