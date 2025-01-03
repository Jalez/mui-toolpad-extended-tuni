/** @format */

import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';

const IconWrapper = ({ IconFC }: { IconFC: SvgIconComponent }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return IconFC ? (
    <Box onClick={handleClick}>
      <IconFC fontSize='small' />
    </Box>
  ) : null;
};

export default IconWrapper;
