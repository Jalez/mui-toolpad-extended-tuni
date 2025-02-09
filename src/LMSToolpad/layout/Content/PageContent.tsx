/** @format */

import { Box } from '@mui/material';

/** @format */

const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ flex: 1, overflowY: 'auto' }}>{children}</Box>;
};

export default PageContent;
