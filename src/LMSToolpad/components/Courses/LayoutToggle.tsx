/** @format */

import { IconButton, Tooltip } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import GridViewIcon from '@mui/icons-material/GridView';

type LayoutToggleProps = {
  value: 'direct' | 'instances';
  onChange: (value: 'direct' | 'instances') => void;
};

const LayoutToggle = ({ value, onChange }: LayoutToggleProps) => {
  const handleClick = () => {
    onChange(value === 'direct' ? 'instances' : 'direct');
  };

  return (
    <Tooltip
      title={
        value === 'direct' ? 'Switch to Course View' : 'Switch to Instance View'
      }>
      <IconButton onClick={handleClick} size='small'>
        {value === 'direct' ? <ViewListIcon /> : <GridViewIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default LayoutToggle;
