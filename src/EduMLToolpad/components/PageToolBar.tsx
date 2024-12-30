/** @format */

import { PageContainerToolbar } from '@toolpad/core';

import { Box } from '@mui/material';

const PageToolbar = () => {
  return (
    <PageContainerToolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          width: '100%',
        }}>
        {/* {path === '/educhat/channels' && <ChannelFilter />} */}
      </Box>
    </PageContainerToolbar>
  );
};

export default PageToolbar;
