/** @format */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, AppTheme, ColorSchemeMode, ColorScheme } from '../theme/Theme';
import {
  Theme as MuiTheme,
  ThemeOptions,
  createTheme,
  Palette,
} from '@mui/material';
import { TypographyStyle } from '@mui/material/styles/createTypography';
import merge from 'lodash/merge';
import createTypography from '@mui/material/styles/createTypography';

// Add ThemeSettings interface
export interface ThemeSettings {
  customSchemes: Record<ColorSchemeMode, ColorScheme>;
  darkMode: {
    enabled: boolean;
    default: boolean;
  };
  shape: {
    borderRadius: number;
  };
  spacing: number;
  transitions: {
    duration: {
      shortest: number;
      shorter: number;
      short: number;
      standard: number;
      complex: number;
      enteringScreen: number;
      leavingScreen: number;
    };
  };
  typography: Record<string, TypographyStyle>;
  logoUrl?: string;
  favicon?: string;
  customCss?: string;
}

// Add DeepPartial type definition
type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

// Extend MUI's Theme for our complete theme type
interface ExtendedTheme extends AppTheme {
  // ...any additional properties...
}

interface ThemeStore {
  theme: MuiTheme; // Use MuiTheme which now includes our custom properties
  themeToUpdate: MuiTheme | null;
  updateTheme: (updates: DeepPartial<ThemeOptions>) => void;
  resetTheme: () => void;
}

export function getThemeValue(obj: any, path: readonly string[]): any {
  return path.reduce(
    (acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined),
    obj
  );
}

function stripVars(obj: any): any {
  if (obj && typeof obj === 'object') {
    delete obj.vars;
    for (const key of Object.keys(obj)) {
      stripVars(obj[key]);
    }
  }
  return obj;
}

function ensureCompletePalette(palette: Partial<Palette>): Palette {
  const defaultPalette = createTheme().palette;
  const colors = [
    'primary',
    'secondary',
    'error',
    'warning',
    'info',
    'success',
  ] as const;

  colors.forEach((color) => {
    if (palette[color]) {
      palette[color] = {
        main: palette[color]?.main || defaultPalette[color].main,
        light: palette[color]?.light || defaultPalette[color].light,
        dark: palette[color]?.dark || defaultPalette[color].dark,
        contrastText:
          palette[color]?.contrastText || defaultPalette[color].contrastText,
      };
    } else {
      palette[color] = { ...defaultPalette[color] };
    }
  });

  return {
    ...defaultPalette,
    ...palette,
  } as Palette;
}

// Helper function to ensure color scheme structure
function ensureColorScheme(scheme: Partial<ColorScheme>): ColorScheme {
  const defaultScheme = Theme.customSchemes[scheme.palette?.mode || 'light'];
  return merge({}, defaultScheme, scheme);
}

// Helper to ensure typography updates maintain correct type
function ensureTypographyOptions(partialTypo: any): any {
  const defaultTheme = createTheme();
  const fontFamily =
    partialTypo?.fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif"';
  const fontSize = partialTypo?.fontSize || 14;

  // Create a proper typography instance with all required functions
  const typography = createTypography(defaultTheme.palette, {
    ...defaultTheme.typography,
    ...partialTypo,
    fontFamily,
    fontSize,
  });

  return typography;
}

function applyCustomScheme(extendedTheme: ExtendedTheme) {
  const mode = extendedTheme.darkMode?.enabled ? 'dark' : 'light';
  const scheme = extendedTheme.customSchemes?.[mode];
  if (scheme?.palette) {
    const complete = ensureColorScheme(scheme);
    extendedTheme.palette = ensureCompletePalette(complete.palette);
  }

  // Create proper typography instance
  extendedTheme.typography = ensureTypographyOptions(extendedTheme.typography);

  return extendedTheme;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: Theme as ExtendedTheme,
      themeToUpdate: null,
      updateTheme: (updates) =>
        set((state) => {
          const merged = merge({}, state.theme, updates);
          const final = applyCustomScheme(merged);
          return {
            theme: createTheme(stripVars(final)) as ExtendedTheme,
          };
        }),
      resetTheme: () =>
        set(() => ({
          theme: Theme as ExtendedTheme,
        })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
