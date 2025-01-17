/** @format */

import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import GeneralTab from './tabs/GeneralTab';
import ThemeTab from './tabs/ThemeTab';
import AITab from './tabs/AITab';
import AuthTab from './tabs/AuthTab';
import CoursesTab from './tabs/CoursesTab';
import FeaturesTab from './tabs/FeaturesTab';
import { Platform } from '../../store/usePlatformSettingsStore';
import { AppTheme } from '../../store/useThemeStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      {...other}
      sx={{ flex: 1, overflow: 'auto' }}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

interface PlatformSettingsTabsProps {
  platformSettings: Platform;
  themeSettings: AppTheme;
  handleUpdatePlatformSettings: (settings: Platform) => void;
  handleUpdateThemeSettings: (settings: AppTheme) => void;
}

export default function PlatformSettingsTabs({
  platformSettings,
  themeSettings,
  handleUpdatePlatformSettings,
  handleUpdateThemeSettings,
}: PlatformSettingsTabsProps) {
  const [value, setValue] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Tabs value={value} onChange={(_, newValue) => setValue(newValue)}>
        <Tab label='General' />
        <Tab label='Theme' />
        <Tab label='AI' />
        <Tab label='Authentication' />
        <Tab label='Courses' />
        <Tab label='Features' />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GeneralTab
          settings={platformSettings}
          onUpdate={handleUpdatePlatformSettings}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ThemeTab theme={themeSettings} onUpdate={handleUpdateThemeSettings} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AITab
          settings={platformSettings}
          onUpdate={handleUpdatePlatformSettings}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <AuthTab
          settings={platformSettings}
          onUpdate={handleUpdatePlatformSettings}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CoursesTab
          settings={platformSettings}
          onUpdate={handleUpdatePlatformSettings}
        />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <FeaturesTab
          settings={platformSettings}
          onUpdate={handleUpdatePlatformSettings}
        />
      </TabPanel>
    </Box>
  );
}
