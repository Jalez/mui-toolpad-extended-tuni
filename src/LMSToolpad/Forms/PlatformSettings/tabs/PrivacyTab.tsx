/** @format */

import { Grid, Stack, Typography, Divider } from '@mui/material';
import { Platform } from '../../../store/usePlatformStore';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableNumber from '../../Components/Editables/EditableNumber';

interface PrivacyTabProps {
  settings: Platform;
  onUpdate: (settings: Partial<Platform>) => void;
}

export default function PrivacyTab({ settings, onUpdate }: PrivacyTabProps) {
  const handlePrivacyUpdate = (key: string, value: any) => {
    onUpdate({
      privacy: {
        ...settings.privacy,
        [key]: value,
      },
    });
  };

  const handleDefaultSettingsUpdate = (key: string, value: boolean) => {
    onUpdate({
      privacy: {
        ...settings.privacy,
        defaultPrivacySettings: {
          ...settings.privacy.defaultPrivacySettings,
          [key]: value,
        },
      },
    });
  };

  return (
    <Stack spacing={3}>
      <Typography variant='h6'>GDPR Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='GDPR Compliance Mode'
            value={settings.privacy.gdprEnabled}
            onChange={(value) => handlePrivacyUpdate('gdprEnabled', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Data Retention Period (days)'
            value={settings.privacy.dataRetentionPeriod}
            onChange={(value) =>
              handlePrivacyUpdate('dataRetentionPeriod', value)
            }
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant='h6'>Default Privacy Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Allow Analytics'
            value={settings.privacy.defaultPrivacySettings.allowAnalytics}
            onChange={(value) =>
              handleDefaultSettingsUpdate('allowAnalytics', value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Allow Personalization'
            value={settings.privacy.defaultPrivacySettings.allowPersonalization}
            onChange={(value) =>
              handleDefaultSettingsUpdate('allowPersonalization', value)
            }
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant='h6'>Cookie Settings</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Analytics Cookies'
            value={settings.privacy.cookieSettings.analytics}
            onChange={(value) =>
              onUpdate({
                privacy: {
                  ...settings.privacy,
                  cookieSettings: {
                    ...settings.privacy.cookieSettings,
                    analytics: value,
                  },
                },
              })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Cookie Expiry (days)'
            value={settings.privacy.cookieSettings.expiryDays}
            onChange={(value) =>
              onUpdate({
                privacy: {
                  ...settings.privacy,
                  cookieSettings: {
                    ...settings.privacy.cookieSettings,
                    expiryDays: value,
                  },
                },
              })
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
