import { Box, Typography } from "@mui/material";
import { EventViewProps } from "../types";
import { CalendarEventType } from "../CalendarEventItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RepeatIcon from "@mui/icons-material/Repeat";

// New minimal view for very short events
const MinimalEventView = ({
  courseCode,
  courseColor,
  requiresRegistration,
  recurring,
  theme,
}: EventViewProps) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      height: "100%",
      minHeight: 18,
      position: "relative",
      gap: 0.5,
      px: 0.5,
      backgroundColor: `${courseColor}30`,
      border: `1px solid ${courseColor}50`,
      borderLeft: `3px solid ${courseColor}`,
      boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 1px 2px ${theme.palette.action.hover}`,
      "&:hover": {
        backgroundColor: `${courseColor}40`,
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 2px 4px ${theme.palette.action.hover}`,
        zIndex: 1,
      },
    }}
  >
    <Typography
      variant="caption"
      sx={{
        color: theme.palette.text.primary,
        fontWeight: 600,
        fontSize: "0.7rem",
        lineHeight: 1,
      }}
      noWrap
    >
      {courseCode}
    </Typography>

    {(requiresRegistration || recurring) && (
      <Box sx={{ display: "flex", gap: 0.25, ml: "auto" }}>
        {requiresRegistration && (
          <HowToRegIcon
            sx={{
              fontSize: 10,
              color: theme.palette.warning.main,
            }}
          />
        )}
        {recurring && (
          <RepeatIcon
            sx={{
              fontSize: 10,
              color: courseColor,
            }}
          />
        )}
      </Box>
    )}
  </Box>
);

export const CompactEventView = ({
  eventInfo,
  courseCode,
  type,
  courseColor,
  requiresRegistration,
  recurring,
  eventTypeIcons,
  theme,
}: EventViewProps) => {
  // Calculate event height based on start and end time
  const startTime = new Date(eventInfo.event.start!).getTime();
  const endTime = new Date(eventInfo.event.end!).getTime();
  const duration = endTime - startTime;
  const minutes = duration / (1000 * 60);

  // Add type-specific gradients for better visual distinction
  const getTypeGradient = (type: CalendarEventType, color: string) => {
    switch (type) {
      case "lecture":
        return `linear-gradient(45deg, ${color}20, ${color}30)`;
      case "exercise":
        return `linear-gradient(135deg, ${color}20, ${color}30)`;
      case "exam":
        return `linear-gradient(90deg, ${color}30, ${color}40)`;
      case "deadline":
        return `linear-gradient(180deg, ${color}20, ${color}30)`;
      default:
        return `linear-gradient(90deg, ${color}20, ${color}25)`;
    }
  };

  // Use minimal view for events shorter than 30 minutes
  if (minutes < 30) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          minHeight: 18,
          position: "relative",
          gap: 0.5,
          px: 0.5,
          background: getTypeGradient(type, courseColor),
          border: `1px solid ${courseColor}50`,
          borderLeft: `3px solid ${courseColor}`,
          boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 1px 2px ${theme.palette.action.hover}`,
          "&:hover": {
            background: getTypeGradient(type, courseColor).replace(
              /[0-9]+/g,
              (m) => (Number(m) + 10).toString()
            ),
            boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 2px 4px ${theme.palette.action.hover}`,
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 600,
            fontSize: "0.7rem",
            lineHeight: 1,
          }}
          noWrap
        >
          {courseCode}
        </Typography>

        {(requiresRegistration || recurring) && (
          <Box sx={{ display: "flex", gap: 0.25, ml: "auto" }}>
            {requiresRegistration && (
              <HowToRegIcon
                sx={{
                  fontSize: 10,
                  color: theme.palette.warning.main,
                }}
              />
            )}
            {recurring && (
              <RepeatIcon
                sx={{
                  fontSize: 10,
                  color: courseColor,
                }}
              />
            )}
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        p: 0.75,
        height: "100%",
        position: "relative",
        gap: 0.5,
        background: getTypeGradient(type, courseColor),
        border: `1px solid ${courseColor}50`,
        borderLeft: `3px solid ${courseColor}`,
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 1px 2px ${theme.palette.action.hover}`,
        "&:hover": {
          background: getTypeGradient(type, courseColor).replace(
            /[0-9]+/g,
            (m) => (Number(m) + 10).toString()
          ),
          boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 2px 4px ${theme.palette.action.hover}`,
          zIndex: 1,
        },
      }}
    >
      <Box
        component="img"
        src={eventTypeIcons[type]}
        alt={type}
        sx={{
          width: 14,
          height: 14,
          filter: `drop-shadow(0 0 1px ${courseColor})`,
          flexShrink: 0,
          mt: 0.25,
        }}
      />
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: courseColor,
            fontWeight: 600,
            lineHeight: 1,
          }}
          noWrap
        >
          {courseCode}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            lineHeight: 1,
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: minutes < 45 ? "0.7rem" : "inherit",
          }}
          noWrap
        >
          {eventInfo.event.title}
        </Typography>
        {minutes >= 45 && (
          <Typography
            variant="caption"
            sx={{
              lineHeight: 1,
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
            }}
            noWrap
          >
            {eventInfo.timeText}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export const RegularView = ({
  eventInfo,
  courseCode,
  type,
  courseColor,
  location,
  requiresRegistration,
  recurring,
  eventTypeIcons,
  theme,
}: EventViewProps) => {
  // Calculate event height similar to CompactView
  const startTime = new Date(eventInfo.event.start!).getTime();
  const endTime = new Date(eventInfo.event.end!).getTime();
  const duration = endTime - startTime;
  const minutes = duration / (1000 * 60);

  // Use the same gradient function for consistency
  const getTypeGradient = (type: CalendarEventType, color: string) => {
    switch (type) {
      case "lecture":
        return `linear-gradient(45deg, ${color}20, ${color}30)`;
      case "exercise":
        return `linear-gradient(135deg, ${color}20, ${color}30)`;
      case "exam":
        return `linear-gradient(90deg, ${color}30, ${color}40)`;
      case "deadline":
        return `linear-gradient(180deg, ${color}20, ${color}30)`;
      default:
        return `linear-gradient(90deg, ${color}20, ${color}25)`;
    }
  };

  // Use minimal view for events shorter than 30 minutes
  if (minutes < 30) {
    return (
      <MinimalEventView
        eventInfo={eventInfo}
        courseCode={courseCode}
        type={type}
        courseColor={courseColor}
        requiresRegistration={requiresRegistration}
        recurring={recurring}
        eventTypeIcons={eventTypeIcons}
        theme={theme}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: minutes < 45 ? 0.75 : 1,
        height: "100%",
        position: "relative",
        gap: 0.5,
        background: getTypeGradient(type, courseColor),
        border: `1px solid ${courseColor}50`,
        borderLeft: `3px solid ${courseColor}`,
        boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 1px 2px ${theme.palette.action.hover}`,
        "&:hover": {
          background: getTypeGradient(type, courseColor).replace(
            /[0-9]+/g,
            (m) => (Number(m) + 10).toString()
          ),
          boxShadow: `0 0 0 1px ${theme.palette.background.paper}, 0 2px 4px ${theme.palette.action.hover}`,
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: minutes < 45 ? 0.5 : 0.75,
        }}
      >
        {/* <Box
          component="img"
          src={eventTypeIcons[type]}
          alt={type}
          sx={{
            width: minutes < 45 ? 16 : 20,
            height: minutes < 45 ? 16 : 20,
            filter: `drop-shadow(0 0 1px ${courseColor})`,
            flexShrink: 0,
            mt: 0.25,
          }}
        /> */}
        <Box
          sx={{
            minWidth: 0,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: courseColor,
              fontWeight: 600,
              lineHeight: 1,
              fontSize: minutes < 45 ? "0.7rem" : "0.75rem",
            }}
            noWrap
          >
            {courseCode} • {type}
          </Typography>
          <Typography
            variant={minutes < 45 ? "caption" : "body2"}
            sx={{
              lineHeight: 1.2,
              color: theme.palette.text.primary,
              fontWeight: 500,
            }}
            noWrap
          >
            {eventInfo.event.title}
          </Typography>
          {minutes >= 45 && (
            <Typography
              variant="caption"
              sx={{
                lineHeight: 1,
                color: theme.palette.text.secondary,
              }}
              noWrap
            >
              {eventInfo.timeText}
            </Typography>
          )}
        </Box>
      </Box>

      {minutes >= 60 && location && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: "auto",
          }}
        >
          <LocationOnIcon sx={{ fontSize: 14, color: courseColor }} />
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
            }}
            noWrap
          >
            {location}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
