/** @format */

import { Grid, Stack } from '@mui/material';
import { PlatformSettings } from '../../../store/usePlatformSettingsStore';
import EditableText from '../../Components/Editables/EditableText';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSwitch from '../../Components/Editables/EditableSwitch';

interface GeneralTabProps {
  settings: PlatformSettings;
  onUpdate: (settings: Partial<PlatformSettings>) => void;
}

export default function GeneralTab({ settings, onUpdate }: GeneralTabProps) {
  const handleUpdate = (key: keyof PlatformSettings, value: any) => {
    onUpdate({ [key]: value });
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableText
            label='Platform Name'
            value={settings.name}
            onChange={(value) => handleUpdate('name', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableText
            label='Contact Email'
            value={settings.contactEmail}
            onChange={(value) => handleUpdate('contactEmail', value)}
          />
        </Grid>
        <Grid item xs={12}>
          <EditableText
            label='Description'
            value={settings.description}
            onChange={(value) => handleUpdate('description', value)}
            multiline
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableText
            label='Support URL'
            value={settings.supportUrl}
            onChange={(value) => handleUpdate('supportUrl', value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Max File Size (MB)'
            value={settings.storage.maxFileSize}
            onChange={(value) =>
              onUpdate({ storage: { ...settings.storage, maxFileSize: value } })
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Total Storage Limit (GB)'
            value={settings.storage.totalStorageLimit}
            onChange={(value) =>
              onUpdate({
                storage: { ...settings.storage, totalStorageLimit: value },
              })
            }
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Maintenance Mode'
            value={settings.maintenance.enabled}
            onChange={(value) =>
              onUpdate({
                maintenance: { ...settings.maintenance, enabled: value },
              })
            }
          />
        </Grid>
        {settings.maintenance.enabled && (
          <Grid item xs={12}>
            <EditableText
              label='Maintenance Message'
              value={settings.maintenance.message}
              onChange={(value) =>
                onUpdate({
                  maintenance: { ...settings.maintenance, message: value },
                })
              }
              multiline
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}
