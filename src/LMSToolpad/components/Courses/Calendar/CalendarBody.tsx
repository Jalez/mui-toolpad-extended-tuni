import React from "react";
import { Box, useTheme } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarEventItem from "./CalendarEventItem";
import { EventApi, EventMountArg } from "@fullcalendar/core";

interface CalendarBodyProps {
  calendarRef: React.RefObject<any>;
  calendarView: string;
  events: any[];
  onDatesSet: (arg: any) => void;
  eventDidMount: (info: any) => void;
  showAllDaySlot: boolean;
  // Drag-related event handlers:
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  density?: "compact" | "comfortable" | "spacious";
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  calendarRef,
  calendarView,
  events,
  onDatesSet,
  eventDidMount,
  showAllDaySlot,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  density = "comfortable",
}) => {
  const theme = useTheme();

  const handleEventDidMount = (info: EventMountArg) => {
    // Get all events in the same time slot
    const timeSlotEvents = info.view.calendar
      .getEvents()
      .filter((event: EventApi) => {
        return (
          event.start?.getTime() === info.event.start?.getTime() &&
          event.end?.getTime() === info.event.end?.getTime() &&
          event.allDay === info.event.allDay
        );
      });

    // Sort events by course code to maintain consistent ordering
    timeSlotEvents.sort((a: EventApi, b: EventApi) => {
      const codeA = a.extendedProps.courseCode || "";
      const codeB = b.extendedProps.courseCode || "";
      // If course codes are the same, maintain original order
      if (codeA === codeB) {
        return timeSlotEvents.indexOf(a) - timeSlotEvents.indexOf(b);
      }
      return codeA.localeCompare(codeB);
    });

    // Set the group index and size
    const groupSize = timeSlotEvents.length;
    const groupIndex = timeSlotEvents.findIndex((e) => e.id === info.event.id);

    info.el.style.setProperty(
      "--event-group-index",
      JSON.stringify(groupIndex)
    );
    info.el.style.setProperty("--event-group-size", JSON.stringify(groupSize));

    // Improve click target for overlapped events
    info.el.style.pointerEvents = "all";

    // Call the original eventDidMount if provided
    if (eventDidMount) {
      eventDidMount(info);
    }
  };

  const densityValues = {
    compact: {
      margin: "0 !important",
      slotHeight: "2.5rem !important",
      minEventHeight: 18,
      spacing: 1,
    },
    comfortable: {
      margin: "0 !important",
      slotHeight: "3rem !important",
      minEventHeight: 20,
      spacing: 2,
    },
    spacious: {
      margin: "0 !important",
      slotHeight: "3.5rem !important",
      minEventHeight: 24,
      spacing: 3,
    },
  };

  const densityConfig = densityValues[density];

  return (
    <Box
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      sx={{
        flex: 1,
        minHeight: 0,
        overflow: "hidden",
        "& .fc-scroller-liquid-absolute": {
          cursor: "grab",
          "&:active": { cursor: "grabbing" },
        },
        // Improve event separation and overlapping
        ".fc-timegrid-event-harness": {
          margin: densityConfig.margin,
          pointerEvents: "all !important",
          "&:not(:first-of-type)": {
            borderTop: `2px solid ${theme.palette.background.paper}`,
            marginTop: `-${2 + densityConfig.spacing}px !important`,
            paddingTop: `${densityConfig.spacing}px !important`,
            "&::before": {
              content: '""',
              position: "absolute",
              top: -1,
              left: 0,
              right: 0,
              height: 2,
              background: theme.palette.background.paper,
              zIndex: 1,
            },
          },
          "&:hover": {
            zIndex: "5 !important",
            "& + .fc-timegrid-event-harness": {
              zIndex: "4 !important",
            },
          },
        },
        ".fc-timegrid-event": {
          margin: "0 !important",
          padding: "0 !important",
          background: "none !important",
          borderRadius: "0 !important",
          border: "none !important",
        },
        ".fc-event": {
          background: "none !important",
          border: "none !important",
        },
        // Add subtle column dividers
        ".fc-timegrid-col": {
          borderRight: `1px solid ${theme.palette.divider}40 !important`,
        },
        // Make time slots more prominent
        ".fc-timegrid-slot": {
          height: densityConfig.slotHeight,
          borderColor: `${theme.palette.divider}30 !important`,
          "&:nth-of-type(4n+1)": {
            borderTop: `2px solid ${theme.palette.divider}50 !important`,
          },
          "&:nth-of-type(2n)": {
            backgroundColor: `${theme.palette.action.hover}05`,
          },
        },
        ".fc-timegrid-slot-minor": {
          borderColor: `${theme.palette.divider}20 !important`,
        },
        // Weekend styling
        ".fc-day-sun, .fc-day-sat": {
          backgroundColor: `${theme.palette.action.hover}15 !important`,
        },
        // Enhance today column
        ".fc-day-today": {
          backgroundColor: `${theme.palette.primary.main}08 !important`,
          borderLeft: `2px solid ${theme.palette.primary.main}40 !important`,
          borderRight: `2px solid ${theme.palette.primary.main}40 !important`,
        },
        // Better header styling
        ".fc-col-header-cell": {
          padding: "8px 4px",
          backgroundColor: theme.palette.background.default,
          borderBottom: `2px solid ${theme.palette.divider} !important`,
          "&.fc-day-today": {
            backgroundColor: `${theme.palette.primary.main}15 !important`,
            fontWeight: 600,
          },
        },
        // Striped background for better time slot visibility
        ".fc-timegrid-col-bg": {
          background: `repeating-linear-gradient(
            to bottom,
            ${theme.palette.background.paper},
            ${theme.palette.background.paper} 3rem,
            ${theme.palette.action.hover}10 3rem,
            ${theme.palette.action.hover}10 6rem
          )`,
        },
        // Improve time column visibility
        ".fc-timegrid-axis": {
          borderRight: `2px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
          "& .fc-timegrid-axis-cushion": {
            padding: "4px 8px",
            fontSize: "0.75rem",
            color: theme.palette.text.secondary,
          },
        },
        // Enhance current time indicator
        ".fc-timegrid-now-indicator-line": {
          borderColor: theme.palette.error.main,
          borderStyle: "dashed",
          opacity: 0.7,
          zIndex: 3,
        },
        ".fc-timegrid-now-indicator-arrow": {
          borderColor: theme.palette.error.main,
          opacity: 0.7,
        },
        ".fc .fc-day-today": {
          backgroundColor: theme.palette.background.default + " !important",
        },
        ".fc-timegrid-event-harness-inset .fc-timegrid-event, .fc-timegrid-event.fc-event-mirror, .fc-timegrid-more-link, .fc-timegrid-slot-lane, .fc-timegrid-slot-lane-frame":
          {
            border: "none !important",
            boxShadow: "none !important",
            font: theme.typography.body2.fontFamily,
          },
        "fc-event-main-frame": {
          backgroundColor: "white" + " !important",
        },
        ".fc-theme-standard td, .fc-theme-standard th": {
          border: "none !important",
        },
        ".fc .fc-col-header-cell .fc-day .fc-day-mon .fc-day-past .fc-daygrid-day-frame, .fc .fc-daygrid-day-top, .fc .fc-daygrid-day-bg, .fc .fc-scrollgrid-liquid":
          {
            border: "none !important",
          },
        td: {
          border: "none !important",
          padding: 0,
        },

        ".fc .fc-daygrid-body tbody tr:hover > td": {
          backgroundColor: theme.palette.action.hover + " !important",
        },
        ".fc-daygrid-row:hover": {
          "& .fc-daygrid-day": {
            backgroundColor: theme.palette.action.hover + " !important",
          },
        },
        ".fc-timegrid-slot-lane:hover": {
          backgroundColor: theme.palette.action.hover + " !important",
        },
        ".fc-daygrid-day:hover": {
          backgroundColor: theme.palette.action.hover + " !important",
        },
      }}
    >
      <FullCalendar
        key={JSON.stringify(events)}
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={calendarView}
        events={events}
        eventDidMount={handleEventDidMount}
        height="100%"
        headerToolbar={false}
        eventContent={(eventInfo) => (
          <CalendarEventItem eventInfo={eventInfo} />
        )}
        datesSet={onDatesSet}
        editable={false}
        selectable={false}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        expandRows={true}
        handleWindowResize={true}
        allDaySlot={showAllDaySlot}
        slotEventOverlap={false}
        eventMinHeight={densityConfig.minEventHeight}
        eventOrder="start,-duration,allDay,title"
        forceEventDuration={true}
        nowIndicator={true}
        slotDuration="00:30:00"
        slotLabelInterval={{ hours: 1 }}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: true,
          hour12: false,
        }}
      />
    </Box>
  );
};

export default CalendarBody;
