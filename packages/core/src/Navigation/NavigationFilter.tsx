/** @format */
import {
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  Tooltip,
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

  // Sync visibleSections with filterOptions whenever filterOptions changes
  // This ensures that the navigation store's visibleSections stays in sync with filterOptions
  useEffect(() => {
    // First, ensure all sections in sectionOrder have a value in filterOptions
    const newFilters = { ...filterOptions };
    let hasChanges = false;

    sectionOrder.forEach((header) => {
      if (filterOptions[header] === undefined) {
        // Default: "Courses" = true, all other sections = false
        newFilters[header] = header === "Courses";
        hasChanges = true;
      }
    });

    // Always sync visibleSections with filterOptions (including newFilters if changed)
    const filtersToSync = hasChanges ? newFilters : filterOptions;
    
    // Only update if there are actual changes to avoid infinite loops
    const currentVisibleSections = useNavigationStore.getState().visibleSections;
    const visibleSectionsChanged = JSON.stringify(currentVisibleSections) !== JSON.stringify(filtersToSync);
    
    if (hasChanges || visibleSectionsChanged) {
      if (hasChanges) {
        // Update filterOptions first if we added defaults
        setFilterOptions(newFilters);
      }
      // Then sync visibleSections - this will trigger recalculateNavigation automatically
      setVisibleSections(filtersToSync);
    }
  }, [sectionOrder, filterOptions, setFilterOptions, setVisibleSections]);

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
      <Tooltip title="Filter navigation sections">
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
      </Tooltip>
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
          >
            <Checkbox checked={localFilterOptions[option]} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
