import { useState, useCallback } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { EventContentArg } from "@fullcalendar/core";
import { CompactEventView, RegularView } from "./components/EventViews";
import EventMenu from "./components/EventMenu";

// Calendar-specific event types (decoupled from course-specific types)
// Re-exported from types.ts
import type { CalendarEventType } from "./types";

const eventTypeIcons: Record<CalendarEventType, string> = {
  lecture: "/static/images/icons/brain.svg",
  exercise: "/static/images/icons/weight.svg",
  exam: "/static/images/icons/code.svg",
  deadline: "/static/images/icons/dna.svg",
  other: "/static/images/icons/atom.svg",
  meeting: "/static/images/icons/brain.svg", // Reuse brain icon for meetings
  maintenance: "/static/images/icons/weight.svg", // Reuse weight icon for maintenance
};

type ExtendedEventContentArg = EventContentArg & {
  el?: HTMLElement;
};

interface CalendarEventItemProps {
  eventInfo: ExtendedEventContentArg;
}

const CalendarEventItem = ({ eventInfo }: CalendarEventItemProps) => {
  const theme = useTheme();
  const isCompact = useMediaQuery(theme.breakpoints.down("sm"));
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const courseCode = eventInfo.event.extendedProps.courseCode || "";
  const type = eventInfo.event.extendedProps.type as CalendarEventType;

  // Use the color that's already set on the event by CalendarEventAggregator
  const courseColor = eventInfo.event.backgroundColor || theme.palette.primary.main;

  const {
    courseTitle,
    description,
    location,
    teachers,
    maxParticipants,
    requiresRegistration,
    recurring,
  } = eventInfo.event.extendedProps;

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setMenuAnchor(null);
  }, []);

  const commonProps = {
    eventInfo,
    courseCode,
    type,
    courseColor,
    location,
    requiresRegistration,
    recurring,
    eventTypeIcons,
    theme,
    courseTitle,
    maxParticipants,
  };

  // Get the event's position in the overlapping group
  const groupIndex = Number(
    eventInfo.el?.style.getPropertyValue("--event-group-index") || "0"
  );
  const groupSize = Number(
    eventInfo.el?.style.getPropertyValue("--event-group-size") || "1"
  );

  const getEventDepth = (index: number, size: number) => {
    const baseZ = 1;
    // If it's a single event, keep it at base level
    if (size <= 1) return baseZ;

    // For overlapping events, create alternating layers
    // Even-numbered events come forward, odd-numbered go back
    return index % 2 === 0 ? baseZ + 1 : baseZ - 1;
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          height: "100%",
          transition: "all 0.2s ease-in-out",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          m: "1px",
          // Add offset based on group position
          ml: groupIndex > 0 ? `${groupIndex * 4}px` : "1px",
          // Adjust width based on group size
          width: groupSize > 1 ? `calc(100% - ${groupIndex * 4}px)` : "auto",
          zIndex: getEventDepth(groupIndex, groupSize),
          "&:hover": {
            transform: "scale(1.01)",
            zIndex: 10, // Always bring hovered item to front
          },
        }}
      >
        {isCompact ? (
          <CompactEventView {...commonProps} />
        ) : (
          <RegularView {...commonProps} />
        )}
      </Box>

      <EventMenu
        open={Boolean(menuAnchor)}
        anchorEl={menuAnchor}
        onClose={handleClose}
        eventInfo={eventInfo}
        courseColor={courseColor}
        type={type}
        eventTypeIcons={eventTypeIcons}
        courseTitle={courseTitle}
        courseCode={courseCode}
        description={description}
        location={location}
        maxParticipants={maxParticipants}
        requiresRegistration={requiresRegistration}
        teachers={teachers}
        recurring={recurring}
        theme={theme}
      />
    </>
  );
};

export default CalendarEventItem;
