/** @format */

import { Box, Typography } from "@mui/material";
import { Course } from "../store/useCourseStore";

type CourseHeaderProps = {
  course: Course;
};

export const CourseHeader = ({ course }: CourseHeaderProps) => (
  <Box sx={{ mb: 1 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 500,
        width: "100%",
      }}
    >
      {course.title} ({course.code})
    </Typography>
  </Box>
);
