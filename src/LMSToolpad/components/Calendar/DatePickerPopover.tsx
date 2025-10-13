import React from "react";
import { Popover } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

interface DatePickerPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onDateSelect: (date: any) => void; // Adjust type as needed
}

const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  anchorEl,
  onClose,
  onDateSelect,
}) => (
  <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    transformOrigin={{ vertical: "top", horizontal: "center" }}
  >
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      value={null}
      onChange={onDateSelect}
    />
  </Popover>
);

export default DatePickerPopover;
