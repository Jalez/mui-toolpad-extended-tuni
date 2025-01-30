/** @format */

import { Box, useTheme } from '@mui/material';

type InternalScrollingProps = {
  children?: React.ReactNode;
  dimensions: { width: number; height: number };
};

const InternalScrolling = ({
  children,
  dimensions,
}: InternalScrollingProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        // only scale vertically

        // allow horizontal scrolling
        overflowX: 'auto',
        overflowY: 'hidden',
        width: dimensions.width + 25,
        height: dimensions.height,
        pointerEvents: 'auto',
        // Hide scrollbar in Firefox
        scrollbarWidth: 'thin',

        // Hide scrollbar in Chrome/Safari
        '&::-webkit-scrollbar': {
          width: '8px',
          backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '4px',
        },
        transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
        willChange: 'width, height',
      }}>
      {children}
    </Box>
  );
};

export default InternalScrolling;
