/** @format */
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigationStore } from "./store/useNavigationStore";

export const NavigationFilter = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Get sectionOrder and updater for visible sections from the navigation store.
  const { sectionOrder, setVisibleSections, recalculateNavigation } =
    useNavigationStore();

  // Local state for filter options: { [sectionHeader]: boolean }
  const [filterOptions, setFilterOptions] = useState<Record<string, boolean>>(
    {}
  );

  // When sectionOrder changes, initialize each section to visible (true)
  useEffect(() => {
    const initialFilters: Record<string, boolean> = {};
    sectionOrder.forEach((header) => {
      initialFilters[header] = true;
    });
    setFilterOptions(initialFilters);
    // Also update the store with initial visible sections.
    setVisibleSections(initialFilters);
    // Recalculate navigation based on these filters.
    recalculateNavigation();
  }, [sectionOrder, setVisibleSections, recalculateNavigation]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Toggle the visibility for a given section header
  const handleToggle = (
    event: React.MouseEvent<HTMLElement>,
    option: string
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const newOptions = {
      ...filterOptions,
      [option]: !filterOptions[option],
    };
    setFilterOptions(newOptions);
    // Update the navigation store so that recalcNavigation will filter sections.
    setVisibleSections(newOptions);
    recalculateNavigation();
  };

  if (Object.keys(filterOptions).length === 0) {
    return null;
  }

  return (
    <Box>
      <IconButton
        disabled={Object.keys(filterOptions).length === 0}
        onClick={handleClick}
        size="small"
      >
        <FilterListIcon
          htmlColor={
            Object.keys(filterOptions).length === 0
              ? theme.palette.text.disabled
              : theme.palette.text.primary
          }
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {Object.keys(filterOptions).map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleToggle(event, option)}
          >
            <Checkbox checked={filterOptions[option]} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
