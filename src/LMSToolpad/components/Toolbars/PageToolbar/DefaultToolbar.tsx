/** @format */

import { Box } from '@mui/material';
import { PageContainerToolbar } from '@toolpad/core';

const DefaultToolbar = () => {
  return (
    <PageContainerToolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          width: '100%',
        }}
      />
    </PageContainerToolbar>
  );
};

export default DefaultToolbar;
