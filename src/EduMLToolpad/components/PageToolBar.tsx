/** @format */

import { PageContainerToolbar } from '@toolpad/core';
import { useLocation } from 'react-router-dom';
import MessageSorter from '../../educhatRoutes/routes/Messages/Message/MessageSorter';
import { useMessageStore } from '../../educhatRoutes/store/useMessageStore';
// import ChannelFilter from '../../routes/Channels/ChannelFilter';
import { Box } from '@mui/material';

const PageToolbar = () => {
  const { filteredMessages } = useMessageStore();
  //Get the current path
  const path = useLocation().pathname;
  //If we are running in localhost, we are in development mode

  return (
    <PageContainerToolbar>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
          width: '100%',
        }}>
        {path.includes('/educhat/channels/') && filteredMessages.length > 0 && (
          <>
            {/* <SettingsDialog /> */}

            <MessageSorter questionId={undefined} />
          </>
        )}
        {/* {path === '/educhat/channels' && <ChannelFilter />} */}
      </Box>
    </PageContainerToolbar>
  );
};

export default PageToolbar;
