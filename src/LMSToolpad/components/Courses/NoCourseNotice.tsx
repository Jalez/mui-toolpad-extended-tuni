/** @format */

import { Box, Typography } from '@mui/material';

export type priority = 'high' | 'low' | 'normal';

type NoCourseNoticeProps = {
  title: string;
  priority: priority;
};
const NoCourseNotice = ({ title, priority }: NoCourseNoticeProps) => {
  return (
    <Box sx={{ mb: 4, minHeight: '100px' }}>
      <Typography
        variant='h6'
        sx={{
          color:
            priority === 'high'
              ? 'primary.main'
              : priority === 'low'
                ? 'text.secondary'
                : 'text.primary',
          textAlign: 'left',
        }}>
        {title}
      </Typography>
      <Typography sx={{ px: 2, mt: 1, color: 'text.secondary' }}>
        There are no courses in this list
      </Typography>
    </Box>
  );
};

export default NoCourseNotice;
