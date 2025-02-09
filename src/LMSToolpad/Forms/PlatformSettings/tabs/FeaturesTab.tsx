/** @format */

import { Box, Stack, Typography } from "@mui/material";
import { Platform } from "../../../store/usePlatformStore";
import EditableSwitch from "../../Components/Editables/EditableSwitch";
import EditableText from "../../Components/Editables/EditableText";
import EditableSelect from "../../Components/Editables/EditableSelect";

interface FeaturesTabProps {
  settings: Platform;
  onUpdate: (settings: Platform) => void;
}

/**
 * FeaturesTab Component
 *
 * @version 3.0.0
 * @breaking-changes
 * - Replaced Grid system with more flexible Box layout
 * - Enhanced responsive design with flex-based layouts
 * - Improved spacing consistency
 * - Optimized component structure for better performance
 * - Standardized style properties
 *
 * Provides interface for:
 * - Managing platform-wide feature settings
 * - Configuring feature availability
 * - Setting feature-specific parameters
 * - Managing feature dependencies
 */
export default function FeaturesTab({ settings, onUpdate }: FeaturesTabProps) {
  const handleFeatureUpdate = (
    key: keyof Platform["features"],
    value: boolean
  ) => {
    onUpdate({
      ...settings,
      features: { ...settings.features, [key]: value },
    });
  };

  const handleAnalyticsUpdate = (key: string, value: any) => {
    onUpdate({
      ...settings,
      analytics: { ...settings.analytics, [key]: value },
    });
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Platform Features
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Forums"
            value={settings.features.forums}
            onChange={(value) => handleFeatureUpdate("forums", value)}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Wiki"
            value={settings.features.wiki}
            onChange={(value) => handleFeatureUpdate("wiki", value)}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Chat"
            value={settings.features.chat}
            onChange={(value) => handleFeatureUpdate("chat", value)}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Video Conference"
            value={settings.features.videoConference}
            onChange={(value) => handleFeatureUpdate("videoConference", value)}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Peer Review"
            value={settings.features.peerReview}
            onChange={(value) => handleFeatureUpdate("peerReview", value)}
          />
        </Box>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Gamification"
            value={settings.features.gamification}
            onChange={(value) => handleFeatureUpdate("gamification", value)}
          />
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Analytics Settings
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Box sx={{ flex: "1 1 45%" }}>
          <EditableSwitch
            label="Enable Analytics"
            value={settings.analytics.enabled}
            onChange={(value) => handleAnalyticsUpdate("enabled", value)}
          />
        </Box>
        {settings.analytics.enabled && (
          <>
            <Box sx={{ flex: "1 1 45%" }}>
              <EditableSelect
                label="Analytics Provider"
                value={settings.analytics.provider || ""}
                onChange={(value) => handleAnalyticsUpdate("provider", value)}
                options={[
                  { value: "google", label: "Google Analytics" },
                  { value: "matomo", label: "Matomo" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            </Box>
            <Box sx={{ flex: "1 1 45%" }}>
              <EditableText
                label="Tracking ID"
                value={settings.analytics.trackingId || ""}
                onChange={(value) => handleAnalyticsUpdate("trackingId", value)}
              />
            </Box>
          </>
        )}
      </Box>
    </Stack>
  );
}
