/** @format */

// Allow explicit any for now

import { Badge, Tooltip } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

type IconWithBadgeProps = {
  Icon: React.FC;
  size: number;
  title: string;
  sx?: SxProps<Theme>;
};

const IconWithBadge = ({ Icon, size, title, sx }: IconWithBadgeProps) => {
  return (
    <Tooltip title={size + ' ' + title}>
      <Badge
        sx={{
          fontSize: '0.5rem',
          ...sx,

          '& .MuiBadge-badge': {
            top: '0.3rem',

            padding: 0,
            margin: 0,

            height: '15px',
            minWidth: '15px',
          },
        }}
        badgeContent={size}
        color='error'>
        <Icon />
      </Badge>
    </Tooltip>
  );
};

export default IconWithBadge;
