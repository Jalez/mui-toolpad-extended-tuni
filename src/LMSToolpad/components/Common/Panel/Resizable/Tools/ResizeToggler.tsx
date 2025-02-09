/** @format */

import { IconButton, Tooltip } from '@mui/material';
import { usePanelStore } from '../store/usePanelStore';
import OpenWithIcon from '@mui/icons-material/OpenWith';

const ResizeToggler = () => {
  const { resizeMode, toggleResizeMode } = usePanelStore();

  return (
    <Tooltip title={resizeMode ? 'Exit Resize Mode' : 'Enter Resize Mode'}>
      <IconButton
        size='small'
        onClick={toggleResizeMode}
        color={resizeMode ? 'primary' : 'default'}>
        <OpenWithIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ResizeToggler;
