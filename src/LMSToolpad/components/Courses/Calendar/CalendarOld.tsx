/** @format */

import React, { useEffect, useRef, useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { usePanelStore } from "../../Common/Panel/Resizable/store/usePanelStore"; // added import
import {
  useTheme,
  GlobalStyles,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Popover from "@mui/material/Popover";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateTime } from "luxon";
import { useSetSnapDimensions } from "../../Common/Panel/Resizable/Context/ResizeContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import { SpeedDialButton } from "../../Common/SpeedDialButton";
import useCourseStore from "../store/useCourseStore";
import { subjectConfig } from "../config/subjectConfig";

// Helper to determine contrast color based on hex background
function getContrast(hexColor: string): string {
  // Remove '#' if present and convert to integer values
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
}
interface CalendarProps {
  events?: Array<{
    title: string;
    start: string;
    end?: string; // Make end optional
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
  }>;
}

type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

const Calendar: React.FC<CalendarProps> = () => {
  const { learningCourses } = useCourseStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<any>(null);
  const [calendarView, setCalendarView] = useState<ViewMode>("dayGridMonth");
  const [manualSelection, setManualSelection] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const { resizeMode } = usePanelStore(); // get resize mode state
  const theme = useTheme(); // use MUI theme
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, scrollLeft: 0 });
  const scrollableRef = useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  // const [dialOpen, setDialOpen] = useState(false);
  const [showAllDaySlot, _] = useState(false);

  const itemReelHeight = 200;
  const itemReelWidth = 300; // Width of the course item

  // Set snap dimensions for parent ResizablePanel
  const setSnapDimensions = useSetSnapDimensions();

  const events = learningCourses.flatMap((course) => {
    return Object.values(course.events)
      .flat()
      .map((event) => {
        // console.log('event', event);
        // Extract subject code (first two parts of course.code)
        const subject = course.code.split(".").slice(0, 2).join(".");
        const config = subjectConfig[subject] || {
          baseColor: theme.palette.primary.dark,
          levelShades: {
            basic: theme.palette.primary.light,
            intermediate: theme.palette.primary.main,
            advanced: theme.palette.primary.dark,
          },
        };
        const courseLevel = course.studyModule?.level || "basic";
        const bgColor = config.levelShades[courseLevel];
        const borderColor = config.baseColor;
        const textColor = getContrast(bgColor);
        return {
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          backgroundColor: bgColor,
          borderColor: borderColor,
          textColor: textColor,
        };
      });
  });

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      events.forEach((event) => calendarApi.addEvent(event));
    }
  }, [events]);

  useEffect(() => {
    setSnapDimensions({
      width: itemReelWidth, // Account for padding
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setSnapDimensions]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Only auto-update view if user hasn't made a manual selection
        if (!manualSelection) {
          const width = entry.contentRect.width;
          let view;
          if (width >= 1000) {
            view = "dayGridMonth";
          } else if (width >= 600) {
            view = "timeGridWeek";
          } else {
            view = "timeGridDay";
          }
          setCalendarView(view as ViewMode);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [manualSelection]);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(calendarView);
    }
  }, [calendarView]);

  useEffect(() => {
    if (calendarRef.current) {
      // Select the first '.fc-scroller' element
      const scrollable = containerRef.current?.querySelector(".fc-scroller");
      if (scrollable) {
        // Enable scrolling by overriding inline style
        (scrollable as HTMLElement).style.overflow = "auto";
        scrollableRef.current = scrollable as HTMLElement;
      }
    }
  }, [calendarView]); // Re-run when view changes as the scroller might change

  // Functions to control FullCalendar using its API
  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
    }
  };

  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
    }
  };

  const handleToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
    }
  };

  const changeView = (view: string) => {
    setCalendarView(view as ViewMode);
    setManualSelection(true); // Mark that user manually changed view
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  // Callback for FullCalendar datesSet event
  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollableRef.current) return;
    setIsDragging(true);
    dragStartPos.current = {
      x: e.pageX,
      scrollLeft: scrollableRef.current.scrollLeft,
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDragging || !scrollableRef.current) return;
      e.preventDefault();
      const dx = e.pageX - dragStartPos.current.x;
      scrollableRef.current.scrollLeft = dragStartPos.current.scrollLeft - dx;
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDateSelect = (newDate: DateTime | null) => {
    if (newDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      // Convert Luxon DateTime to JS Date
      calendarApi.gotoDate(newDate.toJSDate());
    }
    setAnchorEl(null);
  };

  // Define view actions for SpeedDial
  const viewActions = [
    { icon: <CalendarMonthIcon />, name: "Month", value: "dayGridMonth" },
    { icon: <ViewWeekIcon />, name: "Week", value: "timeGridWeek" },
    { icon: <ViewDayIcon />, name: "Day", value: "timeGridDay" },
  ];

  const viewIcons = {
    dayGridMonth: <CalendarMonthIcon />,
    timeGridWeek: <ViewWeekIcon />,
    timeGridDay: <ViewDayIcon />,
  };

  const handleEventDidMount = useCallback((info: any) => {
    // Check both top-level and extendedProps for color values
    const bg =
      info.event.backgroundColor || info.event.extendedProps.backgroundColor;
    const bd = info.event.borderColor || info.event.extendedProps.borderColor;
    const txt = info.event.textColor || info.event.extendedProps.textColor;
    if (bg) info.el.style.backgroundColor = bg;
    if (bd) info.el.style.borderColor = bd;
    if (txt) info.el.style.color = txt;
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pointerEvents: resizeMode ? "none" : "auto",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        // borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[2],
      }}
      ref={containerRef}
    >
      <GlobalStyles
        styles={{
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
      />
      {/* Custom header styled similar to CourseHeaderActions */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          px: 1,
        }}
      >
        {/* Left controls with IconButtons */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Previous">
            <IconButton size="small" onClick={handlePrev}>
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Go to today">
            <IconButton size="small" onClick={handleToday}>
              <TodayIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Select date">
            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <CalendarMonthIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title='Toggle all-day slot'>
            <IconButton
              size='small'
              onClick={() => setShowAllDaySlot((v) => !v)}>
              <CalendarMonthIcon fontSize='small' />
            </IconButton>
          </Tooltip> */}
          {anchorEl && (
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={null}
                onChange={handleDateSelect}
              />
            </Popover>
          )}
          <Tooltip title="Next">
            <IconButton size="small" onClick={handleNext}>
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Center title */}
        <Typography variant="subtitle1" component="div">
          {currentTitle}
        </Typography>
        <SpeedDialButton
          actions={viewActions}
          value={calendarView}
          onChange={changeView}
          icons={viewIcons}
          openIcon={<MoreHorizIcon />}
        />
      </Box>
      <Box
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          "& .fc-scroller-liquid-absolute": {
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
          },
        }}
      >
        <FullCalendar
          key={JSON.stringify(events)}
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={calendarView}
          events={events}
          eventDidMount={handleEventDidMount} // <-- New callback added
          height="100%"
          headerToolbar={false}
          datesSet={handleDatesSet}
          editable={false}
          selectable={false}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          expandRows={true}
          handleWindowResize={true}
          allDaySlot={showAllDaySlot}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
