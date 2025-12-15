/** @format */

import { Box } from "@mui/material";
import FormDialog from "../../components/Dialogs/FormDialog";
import useDialogStore from "../../store/useDialogStore";
import { Platform, usePlatformStore } from "../../store/usePlatformStore";
import { useNotificationStore } from "../../components/Notifications/store/useNotificationsStore";
import PlatformSettingsTabs from "./PlatformSettingsTabs";
import { useState, useEffect, useCallback } from "react";
import isEqual from "lodash/isEqual";
import { AppTheme, useThemeStore } from "../../store/useThemeStore";

/**
 * PlatformSettings Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Updated notification store path to feature-based structure
 * - Enhanced form state management with isDirty tracking
 * - Improved TypeScript strict mode compliance
 * - Standardized string literals
 * - Enhanced layout structure without fixed heights
 * - Added unsaved changes warning system
 *
 * Provides interface for:
 * - Managing platform-wide settings
 * - Configuring global features
 * - Setting platform defaults
 * - Managing AI configurations
 */
const PlatformSettings = () => {
  const { closeDialog } = useDialogStore();
  const { platform, updatePlatform } = usePlatformStore();
  const { addNotificationData } = useNotificationStore();
  const { getTheme, updateTheme } = useThemeStore();
  const [localPlatformSettings, setLocalPlatformSettings] = useState(platform); // Initialize with current settings
  const [localThemeSettings, setLocalThemeSettings] = useState(getTheme());
  const [isDirty, setIsDirty] = useState(false);

  // Store initial settings
  useEffect(() => {
    setLocalPlatformSettings(platform);
    setLocalThemeSettings(getTheme());
  }, [platform, getTheme]);

  // Compare current settings with original settings
  const checkIfPlatformDirty = useCallback(
    (updatedSettings: any) => {
      return !isEqual(updatedSettings, platform);
    },
    [platform]
  );

  const checkIfThemeDirty = useCallback(
    (updatedTheme: any) => {
      return !isEqual(updatedTheme, getTheme());
    },
    [getTheme]
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
      type: "success",
      message: "Settings updated successfully",
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

  if (!localPlatformSettings || !localThemeSettings) {
    return null;
  }

  return (
    <FormDialog
      title="Platform Settings"
      submitText="Save"
      onSubmit={handleSave}
      maxWidth="lg"
      fullWidth
      showUnsavedChangesWarning={true}
      isDirty={isDirty}
    >
      <Box sx={{ height: "70vh", display: "flex", flexDirection: "column" }}>
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
