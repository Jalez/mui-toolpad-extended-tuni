import {
  Popover,
  Paper,
  Stack,
  Box,
  Typography,
  Divider,
  Fade,
} from "@mui/material";
import { EventMenuProps } from "../types";
import EventDetails from "./EventDetails";

const EventMenu = ({
  open,
  anchorEl,
  onClose,
  eventInfo,
  courseColor,
  type,
  eventTypeIcons,
  courseTitle,
  courseCode,
  description,
  location,
  maxParticipants,
  requiresRegistration,
  teachers,
  recurring,
  theme,
}: EventMenuProps) => {
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement calendar export functionality
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement registration functionality
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "left",
      }}
      TransitionComponent={Fade}
      TransitionProps={{ timeout: 150 }}
      sx={{
        "& .MuiPopover-paper": {
          overflow: "visible",
          mt: 1,
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: "50%",
            left: -6,
            width: 12,
            height: 12,
            bgcolor: "background.paper",
            transform: "rotate(45deg) translateY(-50%)",
            zIndex: 0,
            borderLeft: `1px solid ${theme.palette.divider}`,
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
        },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: { xs: "90vw", sm: 400 },
          maxWidth: 400,
          position: "relative",
          overflow: "hidden",
          borderLeft: `4px solid ${courseColor}`,
        }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          {/* Header */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Box
              component="img"
              src={eventTypeIcons[type]}
              alt={type}
              sx={{
                width: 32,
                height: 32,
                filter: `drop-shadow(0 0 1px ${courseColor})`,
                mt: 0.5,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                {eventInfo.event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {courseTitle} ({courseCode})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {eventInfo.timeText}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <EventDetails
            description={description}
            location={location}
            courseColor={courseColor}
            maxParticipants={maxParticipants}
            requiresRegistration={requiresRegistration}
            teachers={teachers}
            type={type}
            recurring={recurring}
            onAddToCalendar={handleAddToCalendar}
            onRegister={handleRegister}
            theme={theme}
          />
        </Stack>
      </Paper>
    </Popover>
  );
};

export default EventMenu;
