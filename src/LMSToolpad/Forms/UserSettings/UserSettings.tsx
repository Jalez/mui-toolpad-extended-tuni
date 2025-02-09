/** @format */

import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import FormDialog from "../../components/Dialogs/FormDialog";
import useDialogStore from "../../store/useDialogStore";
import { useUserStore, UserData } from "../../store/useUserStore";
import { useNotificationStore } from "../../components/Notifications/store/useNotificationsStore";
import EditableText from "../Components/Editables/EditableText";
import EditableSwitch from "../Components/Editables/EditableSwitch";
import EditableNumber from "../Components/Editables/EditableNumber";
import EditableImage from "../Components/Editables/EditableImage";
import { PlatformRole } from "../../store/usePlatformStore";

/**
 * UserSettings Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Enhanced layout with responsive design patterns
 * - Added platform role management with admin-only access
 * - Improved image handling with multi-size support
 * - Added validation for platform roles
 * - Enhanced styling consistency with theme integration
 * - Removed fixed height constraints for better content flow
 *
 * Provides interface for:
 * - Managing user profile information
 * - Configuring privacy settings
 * - Managing platform roles (admin only)
 * - Setting data retention preferences
 * - Managing notification preferences
 */
const UserSettings = () => {
  const { closeDialog } = useDialogStore();
  const { userToUpdate, updateUser } = useUserStore();
  const { addNotificationData } = useNotificationStore();
  const [formData, setFormData] = useState<UserData | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  console.log("userToUpdate", userToUpdate);
  useEffect(() => {
    if (userToUpdate) {
      setFormData(userToUpdate);
    }
  }, [userToUpdate]);

  // Add change detection
  useEffect(() => {
    if (formData && userToUpdate) {
      const isChanged =
        JSON.stringify(formData) !== JSON.stringify(userToUpdate);
      setIsDirty(isChanged);
    }
  }, [formData, userToUpdate]);

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData) return;

    try {
      const updatedUser = await updateUser(formData);

      // Only show success if we got back the updated user
      if (updatedUser) {
        addNotificationData({
          message: "User settings saved successfully",
          type: "success",
        });
        setFormData(updatedUser); // Update local form data
        setIsDirty(false); // Reset dirty state
        closeDialog();
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      addNotificationData({
        message: "Failed to save user settings",
        type: "error",
      });
    }
  };

  if (!formData) return null;

  return (
    <FormDialog
      title="User Settings"
      submitText="Save Changes"
      onSubmit={handleSave}
      maxWidth="md"
      fullWidth
      isDirty={isDirty}
      showUnsavedChangesWarning
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Main content area with two columns */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left column */}
          <Box sx={{ flex: 1 }}>
            {/* Personal Information Section */}
            <Paper elevation={0} sx={{ p: 2 /* removed height: '100%' */ }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <EditableImage
                  label="Profile Image"
                  value={formData.image?.large || ""}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      image: { large: value, medium: value, thumbnail: value },
                    })
                  }
                />
                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <EditableText
                    label="Name"
                    value={formData.name}
                    onChange={(value) =>
                      setFormData({ ...formData, name: value })
                    }
                  />
                  <EditableText
                    label="Email"
                    value={formData.email}
                    onChange={(value) =>
                      setFormData({ ...formData, email: value })
                    }
                  />
                  <EditableText
                    label="Platform Roles"
                    value={formData.platformRoles.join(", ")}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        platformRoles: value
                          .split(",")
                          .map((role) => role.trim()) as PlatformRole[],
                      })
                    }
                    disabled={!formData.platformRoles.includes("admin")}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>

          {/* Right column */}
          <Box sx={{ flex: 1 }}>
            {/* Privacy and GDPR Section */}
            <Paper elevation={0} sx={{ p: 1 /* removed height: '100%' */ }}>
              <Typography variant="h6" gutterBottom>
                Privacy & Consent
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", sm: "row" },
                  flexWrap: "wrap",
                  flex: 1,
                }}
              >
                <EditableSwitch
                  label="Allow Analytics"
                  value={formData.privacySettings.allowAnalytics}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      privacySettings: {
                        ...formData.privacySettings,
                        allowAnalytics: value,
                      },
                    })
                  }
                />
                <EditableSwitch
                  label="GDPR Consent"
                  value={formData.gdprConsent.accepted}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      gdprConsent: {
                        ...formData.gdprConsent,
                        accepted: value,
                        acceptedDate: value
                          ? new Date().toISOString()
                          : undefined,
                        lastUpdated: new Date().toISOString(),
                      },
                    })
                  }
                />
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Data Retention Section - Full width below */}
        <Paper elevation={0} sx={{ p: 1 }}>
          <Typography variant="h6" gutterBottom>
            Data Retention
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <EditableNumber
                label="Delete Account After Inactivity (days)"
                value={formData.dataRetention.deleteAccountAfterInactivity || 0}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    dataRetention: {
                      ...formData.dataRetention,
                      deleteAccountAfterInactivity: value,
                    },
                  })
                }
                min={0}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <EditableNumber
                label="Delete Data After Account Deletion (days)"
                value={
                  formData.dataRetention.deleteDataAfterAccountDeletion || 0
                }
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    dataRetention: {
                      ...formData.dataRetention,
                      deleteDataAfterAccountDeletion: value,
                    },
                  })
                }
                min={0}
              />
            </Box>
          </Box>
        </Paper>
      </Box>
    </FormDialog>
  );
};

export default UserSettings;
