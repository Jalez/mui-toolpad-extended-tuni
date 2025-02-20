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
import { useNavigationFilterStore } from "./store/useNavigationFilterStore";

export const NavigationFilter = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Get sectionOrder and updater for visible sections from the navigation store.
  const { sectionOrder, setVisibleSections, recalculateNavigation } =
    useNavigationStore();

  // Get filter options from the shared filter store
  const { filterOptions, setFilterOptions } = useNavigationFilterStore();
  const [localFilterOptions, setLocalFilterOptions] = useState(filterOptions);

  // When sectionOrder changes, initialize missing sections to visible (true)
  useEffect(() => {
    const newFilters = { ...filterOptions };
    let hasChanges = false;

    sectionOrder.forEach((header) => {
      if (filterOptions[header] === undefined) {
        newFilters[header] = false;
        hasChanges = true;
      }
    });

    setLocalFilterOptions(newFilters);
    if (hasChanges) {
      setVisibleSections(newFilters);
    }
  }, [sectionOrder, filterOptions, setLocalFilterOptions, setVisibleSections]);

  // Update navigation when filter options change
  useEffect(() => {
    if (Object.keys(localFilterOptions).length > 0) {
      setVisibleSections(localFilterOptions);
      recalculateNavigation();
    }
  }, [localFilterOptions]);

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
        ...localFilterOptions,
        [option]: !localFilterOptions[option],
      };
      setFilterOptions(newOptions);
      // Update the navigation store so that recalcNavigation will filter sections.
      setVisibleSections(newOptions);
      recalculateNavigation();
    },
    [
      localFilterOptions,
      setFilterOptions,
      setVisibleSections,
      recalculateNavigation,
    ]
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
