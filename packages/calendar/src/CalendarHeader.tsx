import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import { SpeedDialButton } from '@mui-toolpad-extended-tuni/main';

const viewActions = [
  { icon: <CalendarMonthIcon />, name: "Month", value: "dayGridMonth" },
  { icon: <ViewWeekIcon />, name: "Week", value: "timeGridWeek" },
  { icon: <ViewDayIcon />, name: "Day", value: "timeGridDay" },
];

interface CalendarHeaderProps {
  onPrev: () => void;
  onToday: () => void;
  onNext: () => void;
  onDatePickerOpen: (e: React.MouseEvent<HTMLButtonElement>) => void;
  calendarView: string;
  onViewChange: (view: string) => void;
  currentTitle: string;
}
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  onPrev,
  onToday,
  onNext,
  onDatePickerOpen,
  calendarView,
  onViewChange,
  currentTitle,
}) => {
  const viewIcons = {
    dayGridMonth: <CalendarMonthIcon />,
    timeGridWeek: <ViewWeekIcon />,
    timeGridDay: <ViewDayIcon />,
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
        px: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Previous">
          <IconButton size="small" onClick={onPrev}>
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Go to today">
          <IconButton size="small" onClick={onToday}>
            <TodayIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Select date">
          <IconButton size="small" onClick={onDatePickerOpen}>
            <CalendarMonthIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Next">
          <IconButton size="small" onClick={onNext}>
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="subtitle1">{currentTitle}</Typography>
      <SpeedDialButton
        actions={viewActions}
        value={calendarView}
        onChange={onViewChange}
        icons={viewIcons}
        openIcon={<MoreHorizIcon />}
      />
    </Box>
  );
};

export default CalendarHeader;
