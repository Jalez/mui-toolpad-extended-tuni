/** @format */

import { Stack } from '@mui/system';

import { TypographySettings } from './components/TypographySettings';
import { AppTheme } from '../../../store/useThemeStore';

const colorControls = [
  { label: 'Primary', path: ['palette', 'primary', 'main'] },
  { label: 'Secondary', path: ['palette', 'secondary', 'main'] },
  { label: 'Background', path: ['palette', 'background', 'default'] },
  { label: 'Text', path: ['palette', 'text', 'primary'] },
];

interface ThemeTabProps {
  theme: AppTheme;
  onUpdate: (theme: AppTheme) => void;
}

export default function ThemeTab({ theme, onUpdate }: ThemeTabProps) {
  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <TypographySettings theme={theme} onUpdate={onUpdate} />
    </Stack>
  );
}
