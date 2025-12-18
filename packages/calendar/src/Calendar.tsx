import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import CalendarHeader from "./CalendarHeader";
import DatePickerPopover from "./DatePickerPopover";
import CalendarBody from "./CalendarBody";
import { useCalendarStore } from "./store/useCalendarStore";


type ViewMode = "dayGridMonth" | "timeGridWeek" | "timeGridDay";

const Calendar: React.FC = () => {
  const { events } = useCalendarStore();
  const theme = useTheme();
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

  // Move snap dimensions update to useLayoutEffect
  useLayoutEffect(() => {
    // setDimensions({
    //   width: 200,
    //   height: 400,
    // });
  }, [itemReelWidth, itemReelHeight]);

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
        // pointerEvents: resizeMode ? "none" : "auto",
        // backgroundColor: theme.palette.background.primary,
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
