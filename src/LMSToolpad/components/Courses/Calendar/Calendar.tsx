import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { Box, GlobalStyles, useTheme, useMediaQuery } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import DatePickerPopover from "./DatePickerPopover";
import CalendarBody from "./CalendarBody";
import useCourseStore from "../store/useCourseStore";
import { usePanelStore } from "../../Common/Panel/Resizable/store/usePanelStore";
import { useSetSnapDimensions } from "../../Common/Panel/Resizable/Context/ResizeContext";
import { subjectConfig } from "../config/subjectConfig";

// Helper function remains the same
function getContrast(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "black" : "white";
}

type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

const Calendar: React.FC = () => {
  const { learningCourses } = useCourseStore();
  const theme = useTheme();
  const { resizeMode } = usePanelStore();
  const setSnapDimensions = useSetSnapDimensions();
  const isCompact = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Determine density based on screen size
  const density = isCompact ? "compact" : isMedium ? "comfortable" : "spacious";

  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<any>(null);
  const [calendarView, setCalendarView] = useState<ViewMode>("dayGridMonth");
  const [manualSelection, setManualSelection] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showAllDaySlot] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, scrollLeft: 0 });
  const scrollableRef = useRef<HTMLElement | null>(null);

  const itemReelHeight = 200;
  const itemReelWidth = 300;

  // Create events from courses
  const events = learningCourses.flatMap((course) =>
    Object.entries(course.events).flatMap(([eventType, events]) =>
      events.map((event) => {
        const subject = course.code.split(".")[0];
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
        return {
          id: event.id,
          title: event.title,
          start: event.startTime,
          end: event.endTime || event.startTime,
          backgroundColor: bgColor,
          borderColor: config.baseColor,
          textColor: getContrast(bgColor),
          extendedProps: {
            courseCode: course.code,
            courseTitle: course.title,
            type: eventType,
            description: event.description,
            location: event.location,
            teachers: event.teachers,
            level: courseLevel,
            maxParticipants: event.maxParticipants,
            requiresRegistration: event.requiresRegistration,
            recurring: event.recurring,
          },
        };
      })
    )
  );

  // Move snap dimensions update to useLayoutEffect
  useLayoutEffect(() => {
    setSnapDimensions({
      width: itemReelWidth,
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setSnapDimensions]);

  // Adjust view based on container width unless manually overridden
  useLayoutEffect(() => {
    if (!containerRef.current || manualSelection) return;

    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const view: ViewMode =
          width >= 1000
            ? "dayGridMonth"
            : width >= 600
              ? "timeGridWeek"
              : "timeGridDay";

        if (view !== calendarView) {
          setCalendarView(view);
        }
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [manualSelection, calendarView]);

  // Update FullCalendar view when calendarView state changes
  useLayoutEffect(() => {
    if (calendarRef.current) {
      const api = calendarRef.current.getApi();
      requestAnimationFrame(() => {
        api.changeView(calendarView);
      });
    }
  }, [calendarView]);

  // Setup scrollable element for drag events
  useEffect(() => {
    if (containerRef.current) {
      const scrollable = containerRef.current.querySelector(".fc-scroller");
      if (scrollable) {
        (scrollable as HTMLElement).style.overflow = "auto";
        scrollableRef.current = scrollable as HTMLElement;
      }
    }
  }, [calendarView]);

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
    setManualSelection(true);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
  };

  const handleEventDidMount = useCallback((info: any) => {
    const bg =
      info.event.backgroundColor || info.event.extendedProps.backgroundColor;
    const bd = info.event.borderColor || info.event.extendedProps.borderColor;
    const txt = info.event.textColor || info.event.extendedProps.textColor;
    if (bg) info.el.style.backgroundColor = bg;
    if (bd) info.el.style.borderColor = bd;
    if (txt) info.el.style.color = txt;
  }, []);

  // Drag event handlers
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

  const handleMouseUp = useCallback(() => setIsDragging(false), []);
  const handleMouseLeave = useCallback(() => setIsDragging(false), []);

  const handleDateSelect = (newDate: any) => {
    if (newDate && calendarRef.current) {
      calendarRef.current.getApi().gotoDate(newDate.toJSDate());
    }
    setAnchorEl(null);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        pointerEvents: resizeMode ? "none" : "auto",
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: theme.spacing(2),
        boxShadow: theme.shadows[2],
        "& .fc-timegrid-event": {
          margin: "1px 0",
          padding: "1px",
        },
        "& .fc-daygrid-event": {
          margin: "1px 2px",
        },
        "& .fc td": {
          border: `1px solid ${theme.palette.divider}`,
        },
        "& .fc-timegrid-col-events": {
          margin: "0 2px",
        },
        "& .fc-event": {
          borderRadius: "4px",
        },
        "& .fc-event-main": {
          padding: 0,
        },
        "& .fc-event-title": {
          padding: "0 1px",
        },
        "& .fc-scrollgrid": {
          borderColor: theme.palette.divider,
        },
        "& .fc-col-header-cell": {
          borderColor: theme.palette.divider,
        },
        "& .fc-day:nth-of-type(even)": {
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <GlobalStyles
        styles={
          {
            /* Your FullCalendar styles here */
          }
        }
      />

      <CalendarHeader
        onPrev={handlePrev}
        onToday={handleToday}
        onNext={handleNext}
        onDatePickerOpen={(e) => setAnchorEl(e.currentTarget)}
        calendarView={calendarView}
        onViewChange={changeView}
        currentTitle={currentTitle}
      />

      <DatePickerPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        onDateSelect={handleDateSelect}
      />

      <CalendarBody
        calendarRef={calendarRef}
        calendarView={calendarView}
        events={events}
        onDatesSet={handleDatesSet}
        eventDidMount={handleEventDidMount}
        showAllDaySlot={showAllDaySlot}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        density={density}
      />
    </Box>
  );
};

export default Calendar;
