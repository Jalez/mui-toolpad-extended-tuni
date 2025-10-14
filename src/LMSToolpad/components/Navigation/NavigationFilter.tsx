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
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigationStore } from "./store/useNavigationStore";
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";

export const NavigationFilter = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Get sectionOrder and updater for visible sections from the navigation store.
  const { sectionOrder, setVisibleSections, recalculateNavigation } =
    useNavigationStore();

  // Get filter options from the shared filter store
  const { filterOptions, setFilterOptions } = useNavigationFilterStore();

  // Use memoization to prevent unnecessary state updates
  const localFilterOptions = useMemo(() => {
    return { ...filterOptions };
  }, [filterOptions]);

  // When sectionOrder changes, initialize missing sections to visible (true)
  // but only do this once when sectionOrder or filterOptions change
  useEffect(() => {
    const newFilters = { ...filterOptions };
    let hasChanges = false;

    sectionOrder.forEach((header) => {
      if (filterOptions[header] === undefined) {
        newFilters[header] = false;
        hasChanges = true;
      }
    });

    // Only update if there are actual changes
    if (hasChanges) {
      setVisibleSections(newFilters);
    }
  }, [sectionOrder, filterOptions, setVisibleSections]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // Toggle the visibility for a given section header
  const handleToggle = useCallback(
    (event: React.MouseEvent<HTMLElement>, option: string) => {
      event.preventDefault();
      event.stopPropagation();

      // Prevent toggling "Last 5 visited courses" section
      if (option === "Last 5 visited courses") {
        return;
      }

      const newOptions = {
        ...filterOptions,
        [option]: !filterOptions[option],
      };

      // Batch updates by doing both operations in one go
      setFilterOptions(newOptions);
      setVisibleSections(newOptions);
      recalculateNavigation();
    },
    [filterOptions, setFilterOptions, setVisibleSections, recalculateNavigation]
  );

  if (Object.keys(localFilterOptions).length === 0) {
    return null;
  }

  return (
    <Box>
      <IconButton
        disabled={Object.keys(localFilterOptions).length === 0}
        onClick={handleClick}
        size="small"
      >
        <FilterListIcon
          htmlColor={
            Object.keys(localFilterOptions).length === 0
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
        {Object.keys(localFilterOptions).map((option) => (
          <MenuItem
            key={option}
            onClick={(event) => handleToggle(event, option)}
            disabled={option === "Last 5 visited courses"}
          >
            <Checkbox checked={localFilterOptions[option]} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
