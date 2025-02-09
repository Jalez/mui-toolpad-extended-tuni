/** @format */

import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { Course } from "./store/useCourseStore";
import EventIcon from "@mui/icons-material/Event";

type CourseInfoProps = {
  course: Course;
  displayMode: "course" | "instance" | "instanceList";
  hasUpcomingEvents: boolean;
};

export const CourseInfo = ({
  course,
  displayMode,
  hasUpcomingEvents,
}: CourseInfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        mb: "auto",
        width: "100%",
      }}
    >
      {displayMode !== "course" && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            mr: 1,
          }}
        >
          {course.instance}
        </Typography>
      )}
      {hasUpcomingEvents && (
        <Tooltip title="Upcoming Events">
          <IconButton
            size="small"
            color="info"
            sx={{
              width: 28,
              height: 28,
              padding: 0,
            }}
          >
            <EventIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};
