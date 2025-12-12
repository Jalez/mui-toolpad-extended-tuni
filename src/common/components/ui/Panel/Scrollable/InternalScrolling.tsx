/** @format */

import { Box, useTheme } from "@mui/material";

type InternalScrollingProps = {
  children?: React.ReactNode;
  dimensions: { width: number; height: number };
  isExpanded?: boolean;
};

const InternalScrolling = ({
  children,
  dimensions,
}: InternalScrollingProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        overflowX: "hidden",
        overflowY: "hidden",
        width: dimensions.width + 25,
        height: dimensions.height,
        pointerEvents: "auto",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "8px",
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.divider,
          borderRadius: "4px",
        },
        willChange: "width, height",
      }}
    >
      {children}
    </Box>
  );
};

export default InternalScrolling;
