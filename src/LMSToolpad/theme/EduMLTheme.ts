/** @format */

import { createTheme } from '@mui/material';

export const EduMLTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: { fontSize: '1.25rem', fontWeight: 600 },
    h3: { fontSize: '1.1rem', fontWeight: 500 },
    h4: { fontSize: '1rem', fontWeight: 500 },
    h5: { fontSize: '0.875rem', fontWeight: 500 },
    h6: { fontSize: '0.75rem', fontWeight: 500 },
    subtitle1: { fontSize: '0.875rem', lineHeight: 1.5 },
    subtitle2: { fontSize: '0.75rem', lineHeight: 1.5 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5 },
    body2: { fontSize: '0.75rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 500 },
    caption: { fontSize: '0.75rem', lineHeight: 1.66 },
    overline: { fontSize: '0.75rem', textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        background: {
          default: '#f5f5f5',
          paper: '#ffffff',
        },
        primary: {
          main: '#6a1b9a',
          light: '#9c4dcc',
          dark: '#38006b',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#ff4081',
          light: '#ff79b0',
          dark: '#c60055',
          contrastText: '#000000',
        },
        error: {
          main: '#e57373',
          light: '#ff8a80',
          dark: '#d32f2f',
          contrastText: '#ffffff',
        },
        warning: {
          main: '#ffb74d',
          light: '#ffe97d',
          dark: '#f57c00',
          contrastText: '#000000',
        },
        info: {
          main: '#64b5f6',
          light: '#9be7ff',
          dark: '#2286c3',
          contrastText: '#000000',
        },
        success: {
          main: '#81c784',
          light: '#b2fab4',
          dark: '#519657',
          contrastText: '#000000',
        },
        text: {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
          disabled: 'rgba(0, 0, 0, 0.38)',
        },
        divider: 'rgba(0, 0, 0, 0.12)',
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        background: {
          default: '#303030',
          paper: '#424242',
        },
        primary: {
          main: '#9575cd',
          light: '#c7a4ff',
          dark: '#65499c',
          contrastText: '#ffffff',
        },
        secondary: {
          main: '#ff4081',
          light: '#ff79b0',
          dark: '#c60055',
          contrastText: '#ffffff',
        },
        error: {
          main: '#ef9a9a',
          light: '#ffcccb',
          dark: '#ba6b6c',
          contrastText: '#000000',
        },
        warning: {
          main: '#ffb74d',
          light: '#ffe97d',
          dark: '#f57c00',
          contrastText: '#000000',
        },
        info: {
          main: '#64b5f6',
          light: '#9be7ff',
          dark: '#2286c3',
          contrastText: '#000000',
        },
        success: {
          main: '#81c784',
          light: '#b2fab4',
          dark: '#519657',
          contrastText: '#000000',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  zIndex: {
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});
