/** @format */

import { Stack } from '@mui/system';

import { TypographySettings } from './components/TypographySettings';
import { ColorSettings } from './components/ColorSettings';
import { AppTheme } from '../../../store/useThemeStore';
import { Tab, Tabs } from '@mui/material';
import { TabPanel } from '../PlatformSettingsTabs';
import { useState } from 'react';

interface ThemeTabProps {
  theme: AppTheme;
  onUpdate: (theme: AppTheme) => void;
}

export default function ThemeTab({ theme, onUpdate }: ThemeTabProps) {
  const [value, setValue] = useState(1);

  return (
    <Stack spacing={3} sx={{ width: '100%' }}>
      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab label='Color Settings' value={1} />
        <Tab label='Typography Settings' value={2} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <ColorSettings theme={theme} onUpdate={onUpdate} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TypographySettings theme={theme} onUpdate={onUpdate} />
      </TabPanel>
    </Stack>
  );
}
