/** @format */

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import { usePlatformStore } from "../../../store/usePlatformStore";
// import logo from '/static/images/tuni.png';
import SchoolIcon from "@mui/icons-material/School";
export const Logo = () => {
  const { platform } = usePlatformStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      {isMobile ? (
        <SchoolIcon sx={{ fontSize: "2rem", color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main }} />
      ) : (
        <Typography 
          variant="h1" 
          component="h1"
          sx={{
            color: (theme) => theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.primary.main,
          }}
        >
          {platform.name}
        </Typography>
      )}
    </Box>
  );
};
