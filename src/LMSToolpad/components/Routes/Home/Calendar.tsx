/** @format */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { usePanelStore } from '../../Common/Resizable/store/usePanelStore'; // added import
import {
  useTheme,
  GlobalStyles,
  Box,
  Typography,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Popover from '@mui/material/Popover';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { DateTime } from 'luxon';

interface CalendarProps {
  events: any[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<any>(null);
  const [calendarView, setCalendarView] = useState('dayGridMonth');
  const [manualSelection, setManualSelection] = useState(false);
  const [currentTitle, setCurrentTitle] = useState('');
  const { resizeMode } = usePanelStore(); // get resize mode state
  const theme = useTheme(); // use MUI theme
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, scrollLeft: 0 });
  const scrollableRef = useRef<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Only auto-update view if user hasn't made a manual selection
        if (!manualSelection) {
          const width = entry.contentRect.width;
          let view;
          if (width >= 1000) {
            view = 'dayGridMonth';
          } else if (width >= 600) {
            view = 'timeGridWeek';
          } else {
            view = 'timeGridDay';
          }
          setCalendarView(view);
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
      const scrollable = containerRef.current?.querySelector('.fc-scroller');
      if (scrollable) {
        // Enable scrolling by overriding inline style
        (scrollable as HTMLElement).style.overflow = 'auto';
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
    setCalendarView(view);
    setManualSelection(true); // Mark that user manually changed view
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(view);
    }
  };

  // Callback for FullCalendar datesSet event
  const handleDatesSet = (arg: any) => {
    setCurrentTitle(arg.view.title);
  };

  // Update changeView to handle ToggleButtonGroup changes if needed
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: string | null
  ) => {
    if (newView) {
      changeView(newView);
    }
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

  return (
    <>
      <GlobalStyles
        styles={{
          '.fc': {
            height: '100% !important',
          },
          '.fc-view': {
            height: '100% !important',
          },
          '.fc-scroller': {
            height: '100% !important',
          },
          '.fc-daygrid-body': {
            height: '100% !important',
          },
          // Add styles for better appearance in small containers
          '.fc-col-header-cell': {
            padding: '4px',
          },
          '.fc-daygrid-day': {
            padding: '2px',
          },
        }}
      />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: resizeMode ? 'none' : 'auto',
        }}
        ref={containerRef}>
        {/* Custom header styled similar to CourseHeaderActions */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 1,
            px: 1,
          }}>
          {/* Left controls with IconButtons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title='Previous'>
              <IconButton size='small' onClick={handlePrev}>
                <ChevronLeftIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Go to today'>
              <IconButton size='small' onClick={handleToday}>
                <TodayIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Select date'>
              <IconButton
                size='small'
                onClick={(e) => setAnchorEl(e.currentTarget)}>
                <CalendarMonthIcon fontSize='small' />
              </IconButton>
            </Tooltip>
            {anchorEl && (
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <StaticDatePicker
                  displayStaticWrapperAs='desktop'
                  value={null}
                  onChange={handleDateSelect}
                />
              </Popover>
            )}
            <Tooltip title='Next'>
              <IconButton size='small' onClick={handleNext}>
                <ChevronRightIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
          {/* Center title */}
          <Typography variant='subtitle1' component='div'>
            {currentTitle}
          </Typography>
          {/* Right controls as a ToggleButtonGroup */}
          <ToggleButtonGroup
            value={calendarView}
            exclusive
            onChange={handleViewChange}
            size='small'
            color='primary'>
            <ToggleButton value='dayGridMonth'>Month</ToggleButton>
            <ToggleButton value='timeGridWeek'>Week</ToggleButton>
            <ToggleButton value='timeGridDay'>Day</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
            '& .fc-scroller-liquid-absolute': {
              cursor: 'grab',
              '&:active': {
                cursor: 'grabbing',
              },
            },
          }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={calendarView}
            events={events}
            height='100%'
            headerToolbar={false}
            eventBackgroundColor={theme.palette.primary.light}
            eventBorderColor={theme.palette.primary.dark}
            eventTextColor={theme.palette.getContrastText(
              theme.palette.primary.light
            )}
            datesSet={handleDatesSet}
            editable={false}
            selectable={false}
            slotMinTime='00:00:00'
            slotMaxTime='24:00:00'
            expandRows={true}
            handleWindowResize={true}
          />
        </Box>
      </Box>
    </>
  );
};

export default Calendar;
