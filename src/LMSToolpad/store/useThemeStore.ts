/** @format */

import { create } from 'zustand';
import type {
  Components,
  Theme,
  PaletteMode,
  PaletteOptions,
} from '@mui/material/styles';
import { getColorSchemePreference, setColorSchemePreference as setColorSchemeCookie, getEffectiveColorScheme, type ColorSchemePreference } from '../utils/cookieUtils';

// Add type definitions for typography
export interface TypographyVariantStyle extends Partial<React.CSSProperties> {
  // Remove the redundant property type declarations
}

export interface ThemeTypography {
  fontFamily: string;
  h1: TypographyVariantStyle;
  h2: TypographyVariantStyle;
  h3: TypographyVariantStyle;
  h4: TypographyVariantStyle;
  h5: TypographyVariantStyle;
  h6: TypographyVariantStyle;
  subtitle1: TypographyVariantStyle;
  subtitle2: TypographyVariantStyle;
  body1: TypographyVariantStyle;
  body2: TypographyVariantStyle;
  button: TypographyVariantStyle;
  caption: TypographyVariantStyle;
  overline: TypographyVariantStyle;
}

export interface shape {
  borderRadius: number;
}

export interface colorScheme {
  palette: PaletteOptions & {
    mode: PaletteMode;
    background: {
      default: string;
      paper: string;
    };
    primary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    success: {
      main: string;
      light: string;
      dark: string;
      contrastText: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    divider: string;
  };
}

export interface ThemeBreakpoints {
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

export interface ThemeComponents {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: string;
        borderRadius: number;
      };
    };
  };
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: string;
      };
    };
  };
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: number;
      };
    };
  };
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: number;
      };
    };
  };
}

export interface ThemeTransitions {
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
}

export interface ThemezIndex {
  mobileStepper: number;
  fab: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}

// Update the ThemeTemplate type
interface ThemeTemplate {
  cssVariables: {
    colorSchemeSelector: string;
  };
  defaultColorScheme: 'light' | 'dark'; // Add this line
  typography: ThemeTypography;
  shape: shape;
  spacing: number;
  colorSchemes: {
    light: colorScheme;
    dark: colorScheme;
  };
  breakpoints: ThemeBreakpoints;
  components: Partial<Components<Theme>>; // Update this line
  transitions: ThemeTransitions;
  zIndex: ThemezIndex;
}

export const ThemeTemplate: ThemeTemplate = {
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  defaultColorScheme: 'light', // Add this line
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
    subtitle1: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 500 },
    subtitle2: { fontSize: '0.75rem', lineHeight: 1.5, fontWeight: 500 },
    body1: { fontSize: '0.875rem', lineHeight: 1.5, fontWeight: 400 },
    body2: { fontSize: '0.75rem', lineHeight: 1.5, fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 500, fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem', lineHeight: 1.66, fontWeight: 400 },
    overline: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  colorSchemes: {
    light: {
      palette: {
        mode: 'light' as PaletteMode,
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
        mode: 'dark' as PaletteMode,
        background: {
          default: '#121212',
          paper: '#121212',
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
        root: ({}) => ({
          textTransform: 'none',
          borderRadius: 8,
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({}) => ({
          backgroundImage: 'none',
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({}) => ({
          borderRadius: 12,
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({}) => ({
          borderRadius: 12,
        }),
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
};

export type AppTheme = ThemeTemplate;

interface ThemeStore {
  colorSchemePreference: ColorSchemePreference;
  setColorSchemePreference: (preference: ColorSchemePreference) => void;
  getTheme: () => AppTheme; // Always returns ThemeTemplate with current color scheme preference
  updateTheme: (updates: AppTheme) => void; // For theme customization (colors, typography, etc.)
  resetTheme: () => void;
}

/**
 * Theme management store with support for custom themes and dark mode.
 *
 * @version 2.0.0
 * @updates
 * - Color scheme preference stored in cookie (light/dark/system)
 * - Theme colors always come from ThemeTemplate (not persisted)
 * - System preference detection for 'system' mode
 *
 * @features
 * - Theme customization (colors, typography, etc.)
 * - Color scheme preference management (cookie-based)
 * - System preference detection
 * - Always uses ThemeTemplate for base colors
 */
export const useThemeStore = create<ThemeStore>()((set, get) => {
  // Initialize with cookie value
  const initialPreference = getColorSchemePreference();
  
  return {
    colorSchemePreference: initialPreference,
    setColorSchemePreference: (preference: ColorSchemePreference) => {
      setColorSchemeCookie(preference);
      set({ colorSchemePreference: preference });
    },
    getTheme: () => {
      const { colorSchemePreference } = get();
      const effectiveScheme = getEffectiveColorScheme(colorSchemePreference);
      return {
        ...ThemeTemplate,
        defaultColorScheme: effectiveScheme,
      } as AppTheme;
    },
    updateTheme: (updatedTheme) => {
      // This is for theme customization (colors, typography, etc.)
      // We merge customizations with ThemeTemplate but keep color scheme preference separate
      const { colorSchemePreference } = get();
      const effectiveScheme = getEffectiveColorScheme(colorSchemePreference);
      const mergedTheme: AppTheme = {
        ...ThemeTemplate,
        ...updatedTheme,
        defaultColorScheme: effectiveScheme,
        // Ensure color schemes come from ThemeTemplate, not custom theme
        colorSchemes: ThemeTemplate.colorSchemes,
      };
      // Note: We don't persist the full theme anymore, only the color scheme preference
      // Custom theme changes would need to be handled differently if needed
    },
    resetTheme: () => {
      setColorSchemeCookie('system');
      set({ colorSchemePreference: 'system' });
    },
  };
});
