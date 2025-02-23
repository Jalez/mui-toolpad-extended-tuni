/** @format */

import { Box } from "@mui/material";

const PageContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      role="main"
      sx={{
        flex: 1,
        overflowY: "auto",
        position: "relative", // Ensures proper positioning context for absolute children
        minHeight: 0, // Ensures proper flex child behavior
        p: 0,
        m: 0,
      }}
    >
      {children}
    </Box>
  );
};

export default PageContent;
