/** @format */

import { IconButton, Tooltip } from '@mui/material';
import { Brightness6, Brightness7, Brightness4 } from '@mui/icons-material';
import { useThemeStore } from '../../../../LMSToolpad/store/useThemeStore';

export const ThemeToggle = () => {
  const { setColorSchemePreference, getTheme } = useThemeStore();
  const currentTheme = getTheme();
  const currentMode = currentTheme?.defaultColorScheme || 'light';

  const toggleTheme = () => {
    // Toggle between light and dark (skip system for now, or cycle through all three)
    const newPreference: 'light' | 'dark' = currentMode === 'light' ? 'dark' : 'light';
    
    setColorSchemePreference(newPreference);
  };

  const getThemeIcon = () => {
    switch (currentMode) {
      case 'light':
        return <Brightness7 />;
      case 'dark':
        return <Brightness4 />;
      default:
        return <Brightness6 />;
    }
  };

  const getTooltipTitle = () => {
    switch (currentMode) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <IconButton
        onClick={toggleTheme}
        size="small"
        sx={{
          color: 'text.primary',
        }}
      >
        {getThemeIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
