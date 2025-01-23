/** @format */

import { Box } from '@mui/material';
import FormDialog from '../../components/Dialogs/FormDialog';
import useDialogStore from '../../store/useDialogStore';
import { Platform, usePlatformStore } from '../../store/usePlatformStore';
import { useNotificationStore } from '../../store/useNotificationsStore';
import PlatformSettingsTabs from './PlatformSettingsTabs';
import { useState, useEffect, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { AppTheme, useThemeStore } from '../../store/useThemeStore';

const PlatformSettings = () => {
  const { closeDialog } = useDialogStore();
  const { platform, updatePlatform } = usePlatformStore();
  const { addNotificationData } = useNotificationStore();
  const { theme, updateTheme } = useThemeStore();
  const [localPlatformSettings, setLocalPlatformSettings] = useState(platform); // Initialize with current settings
  const [localThemeSettings, setLocalThemeSettings] = useState(theme);
  const [isDirty, setIsDirty] = useState(false);

  // Store initial settings
  useEffect(() => {
    setLocalPlatformSettings(platform);
    setLocalThemeSettings(theme);
  }, [platform, theme]);

  // Compare current settings with original settings
  const checkIfPlatformDirty = useCallback(
    (updatedSettings: any) => {
      return !isEqual(updatedSettings, platform);
    },
    [platform]
  );

  const checkIfThemeDirty = useCallback(
    (updatedTheme: any) => {
      return !isEqual(updatedTheme, theme);
    },
    [theme]
  );

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Update platform settings (non-theme)
    if (!localPlatformSettings) return;
    if (!localThemeSettings) return;
    updatePlatform(localPlatformSettings);
    updateTheme(localThemeSettings);
    // Theme changes are already applied through useThemeStore
    setIsDirty(false);

    addNotificationData({
      type: 'success',
      message: 'Settings updated successfully',
    });
    closeDialog();
  };

  const handlePlatformUpdate = (newSettings: Partial<Platform>) => {
    setLocalPlatformSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
    setIsDirty(
      checkIfPlatformDirty({
        ...localPlatformSettings,
        ...newSettings,
      })
    );
  };

  const handleThemeUpdate = (newThemeSettings: AppTheme) => {
    setLocalThemeSettings(newThemeSettings);
    setIsDirty(checkIfThemeDirty(newThemeSettings));
  };

  console.log('localPlatformSettings', localPlatformSettings);
  if (!localPlatformSettings || !localThemeSettings) {
    return null;
  }

  return (
    <FormDialog
      title='Platform Settings'
      submitText='Save'
      onSubmit={handleSave}
      maxWidth='lg'
      fullWidth
      showUnsavedChangesWarning={true}
      isDirty={isDirty}>
      <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
        <PlatformSettingsTabs
          platformSettings={localPlatformSettings}
          themeSettings={localThemeSettings}
          handleUpdatePlatformSettings={handlePlatformUpdate}
          handleUpdateThemeSettings={handleThemeUpdate}
        />
      </Box>
    </FormDialog>
  );
};

export default PlatformSettings;
