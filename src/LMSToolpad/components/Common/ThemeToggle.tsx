/** @format */

import { IconButton, Tooltip } from '@mui/material';
import { Brightness6, Brightness7, Brightness4 } from '@mui/icons-material';
import { useThemeStore } from '../../store/useThemeStore';
import { AppTheme } from '../../store/useThemeStore';

export const ThemeToggle = () => {
  const { theme: currentTheme, updateTheme } = useThemeStore();

  const currentMode = currentTheme?.defaultColorScheme || 'light';

  const toggleTheme = () => {
    const newMode = currentMode === 'light' ? 'dark' : 'light';

    console.log('Current mode:', currentMode, 'New mode:', newMode);

    // Update the default color scheme and the active color scheme
    const updatedTheme: AppTheme = {
      ...currentTheme,
      defaultColorScheme: newMode,
      colorSchemes: {
        ...currentTheme.colorSchemes,
        [newMode]: currentTheme.colorSchemes[newMode],
        [currentMode === 'light' ? 'dark' : 'light']: currentTheme.colorSchemes[currentMode === 'light' ? 'dark' : 'light'],
      }
    };

    console.log('Updating theme:', updatedTheme);
    updateTheme(updatedTheme);
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
