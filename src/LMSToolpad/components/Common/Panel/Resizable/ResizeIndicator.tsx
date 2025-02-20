/** @format */

import { Box } from "@mui/material";

type ResizeIndicatorProps = {
  dimensions: { width: number; height: number };
};

const ResizeIndicator = ({ dimensions }: ResizeIndicatorProps) => {
  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: 1,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        color: "text.secondary",
        fontSize: "0.875rem",
        userSelect: "none",
      }}
    >
      {`${dimensions.width} × ${dimensions.height}`}
    </Box>
  );
};

export default ResizeIndicator;
