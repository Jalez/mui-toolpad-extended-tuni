/** @format */

import { Box, Typography } from "@mui/material";

interface ResizeIndicatorProps {
  dimensions: {
    width: number;
    height: number;
  };
}

const ResizeIndicator = ({ dimensions }: ResizeIndicatorProps) => (
  <Box
    sx={{
      padding: 2,
      backgroundColor: "background.paper",
      borderRadius: 1,
      boxShadow: 2,
    }}
  >
    <Typography variant="body2" component="div">
      {Math.round(dimensions.width)} × {Math.round(dimensions.height)}
    </Typography>
  </Box>
);

export default ResizeIndicator;
