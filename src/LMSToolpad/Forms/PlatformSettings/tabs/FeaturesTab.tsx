/** @format */

import { Grid, Stack, Typography } from '@mui/material';
import { Platform } from '../../../store/usePlatformStore';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableText from '../../Components/Editables/EditableText';
import EditableSelect from '../../Components/Editables/EditableSelect';

interface FeaturesTabProps {
  settings: Platform;
  onUpdate: (settings: Platform) => void;
}

export default function FeaturesTab({ settings, onUpdate }: FeaturesTabProps) {
  const handleFeatureUpdate = (
    key: keyof Platform['features'],
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
      <Typography variant='h6' gutterBottom>
        Platform Features
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Forums'
            value={settings.features.forums}
            onChange={(value) => handleFeatureUpdate('forums', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Wiki'
            value={settings.features.wiki}
            onChange={(value) => handleFeatureUpdate('wiki', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Chat'
            value={settings.features.chat}
            onChange={(value) => handleFeatureUpdate('chat', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Video Conference'
            value={settings.features.videoConference}
            onChange={(value) => handleFeatureUpdate('videoConference', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Peer Review'
            value={settings.features.peerReview}
            onChange={(value) => handleFeatureUpdate('peerReview', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Gamification'
            value={settings.features.gamification}
            onChange={(value) => handleFeatureUpdate('gamification', value)}
          />
        </Grid>
      </Grid>

      <Typography variant='h6' gutterBottom>
        Analytics Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Enable Analytics'
            value={settings.analytics.enabled}
            onChange={(value) => handleAnalyticsUpdate('enabled', value)}
          />
        </Grid>
        {settings.analytics.enabled && (
          <>
            <Grid item xs={12} md={6}>
              <EditableSelect
                label='Analytics Provider'
                value={settings.analytics.provider || ''}
                onChange={(value) => handleAnalyticsUpdate('provider', value)}
                options={[
                  { value: 'google', label: 'Google Analytics' },
                  { value: 'matomo', label: 'Matomo' },
                  { value: 'custom', label: 'Custom' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <EditableText
                label='Tracking ID'
                value={settings.analytics.trackingId || ''}
                onChange={(value) => handleAnalyticsUpdate('trackingId', value)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Stack>
  );
}
