/** @format */

/**
 * Enhanced sidebar footer component with responsive design.
 *
 * @version 2.1.0
 * @updates
 * - Added responsive design for mini/full layouts
 * - Improved transition animations
 * - Enhanced logo handling
 * - Added version display from constants
 * - Updated copyright information display
 */

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';

import tuniSmallIcon from '/static/images/tuni/face-purple-small.png';
import tuniSvg from '/static/images/tuni/Tampere_University_logo.svg';
import { SidebarFooterProps } from '@toolpad/core';
import { MTETVERSION } from '../../constants';

function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
    <Stack direction='column' alignItems='center' spacing={1}>
      <div
        style={{
          width: mini ? '48px' : '160px',
          textAlign: 'center',
          transition: 'all 0.2s ease-in-out',
          overflow: 'hidden',
        }}>
        <Typography
          variant='caption'
          color='primary'
          sx={{
            m: 1,
            display: 'block',
            whiteSpace: 'nowrap',
          }}>
          BETA {mini ? '' : 'VERSION ' + MTETVERSION}
        </Typography>
      </div>
      <div
        style={{
          height: '3rem',
          width: mini ? '48px' : '160px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'width 0.2s ease-in-out',
          margin: '0 auto',
        }}>
        <img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '3rem',
            width: '48px',
            objectFit: 'contain',
            opacity: mini ? 1 : 0,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: mini ? 'auto' : 'none',
          }}
          alt='Tampere University'
          src={tuniSmallIcon}
        />
        <img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '3rem',
            width: '160px',
            objectFit: 'contain',
            opacity: mini ? 0 : 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: mini ? 'none' : 'auto',
          }}
          alt='Tampere University'
          src={tuniSvg}
        />
      </div>
      <div
        style={{
          width: mini ? '48px' : '200px',
          textAlign: 'center',
          transition: 'all 0.2s ease-in-out',
          overflow: 'hidden',
        }}>
        <Typography
          variant='caption'
          sx={{
            // m: 1,
            display: 'block',
            whiteSpace: 'nowrap',
          }}>
          © {new Date().getFullYear()}
          {mini ? '' : ' Made with 💜 EduML Team'}
        </Typography>
      </div>
    </Stack>
  );
}

export default SidebarFooter;
