import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

import tuniSmallIcon from '/static/images/tuni/face-purple-small.png';
import tuniSvg from '/static/images/tuni/Tampere_University_logo.svg';
import { SidebarFooterProps } from "@toolpad/core";

function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Stack direction='column' alignItems='center' spacing={1}>
        {/* <Chip size='medium' label='BETA' color='primary' variant='outlined' /> */}
        <Typography variant='caption' color='primary' sx={{ m: 1 }}>
          BETA {mini ? '' : 'VERSION' + ' ' + '0.1.0'}
        </Typography>
        {mini ? (
          <>
            <img
              style={{ height: '3rem', width: 'auto' }}
              alt='Tampere University'
              src={tuniSmallIcon}
            />
            <Typography variant='caption' sx={{ m: 1 }}>
              © {new Date().getFullYear()}
            </Typography>
          </>
        ) : (
          <>
            <img
              style={{ height: '3rem', width: 'auto' }}
              alt='Tampere University'
              src={tuniSvg}
            />
            <Typography
              variant='caption'
              sx={{
                m: 1,
                overflow: 'hidden',
                //No wrap text
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              © {new Date().getFullYear()} Made with 💜 The EduML Team
            </Typography>
          </>
        )}
      </Stack>
    );
  }

export default SidebarFooter;