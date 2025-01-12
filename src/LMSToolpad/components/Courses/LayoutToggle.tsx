/** @format */

import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LaunchIcon from '@mui/icons-material/Launch';

type LayoutToggleProps = {
  value: 'direct' | 'instances';
  onChange: (value: 'direct' | 'instances') => void;
};

const LayoutToggle = ({ value, onChange }: LayoutToggleProps) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: 'direct' | 'instances' | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      aria-label='navigation type'
      size='small'
      sx={{ mb: 2 }}>
      <Tooltip title='All Course Instances'>
        <ToggleButton value='direct' aria-label='course instances view'>
          <LaunchIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title='All Courses'>
        <ToggleButton value='instances' aria-label='courses view'>
          <FormatListBulletedIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default LayoutToggle;
