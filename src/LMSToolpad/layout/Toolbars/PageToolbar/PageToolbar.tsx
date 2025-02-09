/** @format */

import { PageContainer, useActivePage } from '@toolpad/core';

import { useMediaQuery, useTheme } from '@mui/material';
import RegisteredPageTools from './RegisteredPageTools';

/**
 * PageToolbar component
 *
 * @returns
 */
export const PageToolbar = () => {
  const activePage = useActivePage();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  let breadcrumbs = activePage?.breadcrumbs || [];
  if (isSmallScreen) {
    breadcrumbs = activePage?.breadcrumbs?.slice(-2) || [];
  }
  return (
    <PageContainer
      title=''
      // maxWidth={false} // Disable maxWidth to use full width
      breadcrumbs={breadcrumbs}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        // fontSize: '0.8rem',
        // Target breadcrumbs specifically
        '& .MuiBreadcrumbs-root': {
          ...(isSmallScreen && {
            fontSize: '0.575rem', // Adjust this value as needed
            '& .MuiBreadcrumbs-li': {
              fontSize: 'inherit',
            },
            '& .MuiBreadcrumbs-separator': {
              fontSize: 'inherit',
            },
            // Target the last breadcrumb
            '& .MuiBreadcrumbs-li:last-child': {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'inherit',
              '& .MuiTypography-root': {
                fontSize: 'inherit',
                fontWeight: 'bold',
              },
            },
          }),
        },

        '& .MuiStack-root': {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 0,
          padding: 0,
          alignItems: 'center',
          flex: 1,
        },
      }}
      slots={{ toolbar: RegisteredPageTools }}></PageContainer>
  );
};
