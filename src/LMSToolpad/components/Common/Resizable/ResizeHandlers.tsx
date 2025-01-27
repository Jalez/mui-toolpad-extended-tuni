/** @format */

import { Box, useTheme } from '@mui/material';

export type direction = 'horizontal' | 'vertical' | 'corner';

type ResizeHandlesProps = {
  handleMouseDown: (direction: direction) => (e: React.MouseEvent) => void;
};

const ResizeHandlers = ({ handleMouseDown }: ResizeHandlesProps) => {
  const theme = useTheme();
  return (
    <>
      <Box
        onMouseDown={handleMouseDown('horizontal')}
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
        }}
      />
      <Box
        onMouseDown={handleMouseDown('vertical')}
        sx={{
          position: 'absolute',
          bottom: 0,
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
        }}
      />
      <Box
        onMouseDown={handleMouseDown('corner')}
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
        }}
      />
    </>
  );
};

export default ResizeHandlers;
