/** @format */

import { Box, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationDotsProps {
  total: number;
  current: number;
  onDotClick?: (index: number) => void;
  vertical?: boolean;
  onArrowClick?: (direction: "start" | "end") => void;
  showArrows?: boolean;
  disableStart?: boolean;
  disableEnd?: boolean;
}

const PaginationDots = ({
  total,
  current,
  onDotClick,
  vertical = false,
  onArrowClick,
  disableStart = false,
  disableEnd = false,
}: PaginationDotsProps) => {
  // Guard against invalid total pages
  const safeTotal = Math.max(0, total);
  if (safeTotal <= 0) return null;

  return (
    <Box
      data-testid="pagination-dots"
      sx={{
        width: "fit-content",
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        ...(vertical
          ? {
              flexDirection: "column",
            }
          : {
              flexDirection: "row",
            }),
      }}
    >
      <IconButton
        size="small"
        disabled={disableStart}
        onClick={() => !disableStart && onArrowClick?.("start")}
        sx={{
          p: 0.5,
          opacity: disableStart ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {vertical ? <KeyboardArrowUpIcon /> : <ChevronLeftIcon />}
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: vertical ? "column" : "row",
          gap: 0.5,
        }}
      >
        {Array.from({ length: safeTotal }).map((_, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onDotClick?.(index);
            }}
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: current === index ? "primary.main" : "action.disabled",
              transition: "all 0.2s ease",
              cursor: onDotClick ? "pointer" : "default",
              "&:hover": onDotClick
                ? {
                    transform: "scale(1.2)",
                    bgcolor:
                      current === index ? "primary.dark" : "primary.light",
                  }
                : {},
            }}
          />
        ))}
      </Box>
      <IconButton
        size="small"
        onClick={() => !disableEnd && onArrowClick?.("end")}
        disabled={disableEnd}
        sx={{
          p: 0.5,
          opacity: disableEnd ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {vertical ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
      </IconButton>
    </Box>
  );
};

export default PaginationDots;
