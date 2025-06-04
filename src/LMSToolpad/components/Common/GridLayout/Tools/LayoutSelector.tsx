/** @format */
import React, { useState } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { createGridItem } from '../layoutUtils';

const baseConstraints = { minW: 1, minH: 1, maxW: 12, maxH: 12 };

// Define two preset layouts for all breakpoints (for simplicity)
const presets = {
  default: {
    lg: [
      createGridItem('course-list', 0, 0, 1, 1, baseConstraints),
      createGridItem('calendar', 1, 0, 1, 1, baseConstraints),
    ],
    md: [
      createGridItem('course-list', 0, 0, 1, 1, baseConstraints),
      createGridItem('calendar', 1, 0, 1, 1, baseConstraints),
    ],
    sm: [
      createGridItem('course-list', 0, 0, 1, 1, baseConstraints),
      createGridItem('calendar', 1, 0, 1, 1, baseConstraints),
    ],
    xs: [
      createGridItem('course-list', 0, 0, 1, 1, baseConstraints),
      createGridItem('calendar', 1, 0, 1, 1, baseConstraints),
    ],
  },
  swap: {
    lg: [
      createGridItem('calendar', 0, 0, 1, 1, baseConstraints),
      createGridItem('course-list', 1, 0, 1, 1, baseConstraints),
    ],
    md: [
      createGridItem('calendar', 0, 0, 1, 1, baseConstraints),
      createGridItem('course-list', 1, 0, 1, 1, baseConstraints),
    ],
    sm: [
      createGridItem('calendar', 0, 0, 1, 1, baseConstraints),
      createGridItem('course-list', 1, 0, 1, 1, baseConstraints),
    ],
    xs: [
      createGridItem('calendar', 0, 0, 1, 1, baseConstraints),
      createGridItem('course-list', 1, 0, 1, 1, baseConstraints),
    ],
  },
};

type LayoutPreset = 'default' | 'swap';

type LayoutSelectorProps = {
  storageKey: string;
  onPresetChange?: (layouts: { [bp: string]: any[] }) => void;
};

const LayoutSelector: React.FC<LayoutSelectorProps> = ({
  storageKey,
  onPresetChange,
}) => {
  const [preset, setPreset] = useState<LayoutPreset>('default');

  const handleChange = (event: SelectChangeEvent<LayoutPreset>) => {
    const newPreset = event.target.value as LayoutPreset;
    setPreset(newPreset);
    const newLayouts = presets[newPreset];
    try {
      localStorage.setItem(storageKey, JSON.stringify(newLayouts));
    } catch (e) {
      console.error('Failed to save preset layout:', e);
    }
    // Optional callback so the grid can update immediately.
    onPresetChange && onPresetChange(newLayouts);
  };

  return (
    <FormControl variant='standard' size='small'>
      <InputLabel id='layout-selector-label'>Layout</InputLabel>
      <Select
        labelId='layout-selector-label'
        value={preset}
        onChange={handleChange}
        label='Layout'>
        <MenuItem value='default'>Default</MenuItem>
        <MenuItem value='swap'>Swap</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LayoutSelector;
