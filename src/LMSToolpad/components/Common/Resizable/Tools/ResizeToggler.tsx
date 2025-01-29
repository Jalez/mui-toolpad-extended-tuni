/** @format */

import { IconButton, Tooltip } from '@mui/material';
import { usePlatformStore } from '../../../../store/usePlatformStore';

import OpenWithIcon from '@mui/icons-material/OpenWith';

const ResizeToggler = () => {
  const { platform, toggleResizeMode } = usePlatformStore();
  const resizeMode = platform.interface.resizeMode;

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
