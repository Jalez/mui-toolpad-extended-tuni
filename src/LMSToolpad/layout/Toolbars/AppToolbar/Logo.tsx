/** @format */

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

import useCourseStore from "../../../components/Courses/store/useCourseStore";
import { usePlatformStore } from "../../../store/usePlatformStore";
// import logo from '/static/images/tuni.png';
import SchoolIcon from "@mui/icons-material/School";
export const Logo = () => {
  const { setCurrentCourse } = useCourseStore((state) => state);
  const { platform } = usePlatformStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      onClick={() => setCurrentCourse(null)}
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "1",
      }}
    >
      {isMobile ? (
        <SchoolIcon sx={{ fontSize: "2rem" }} />
      ) : (
        <Typography variant="h1" component="h1">
          {platform.name}
        </Typography>
      )}
    </Box>
  );
};
