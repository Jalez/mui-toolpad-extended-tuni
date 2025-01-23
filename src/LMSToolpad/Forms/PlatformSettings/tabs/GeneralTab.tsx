/** @format */

import { Grid, Stack, Typography, Divider } from '@mui/material';
import { Platform } from '../../../store/usePlatformStore';
import EditableText from '../../Components/Editables/EditableText';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableAutoComplete from '../../Components/Editables/EditableAutoComplete';

interface GeneralTabProps {
  settings: Platform;
  onUpdate: (settings: Partial<Platform>) => void;
}

export default function GeneralTab({ settings, onUpdate }: GeneralTabProps) {
  const handleUpdate = (key: keyof Platform, value: any) => {
    onUpdate({ [key]: value });
  };

  const handleStorageUpdate = (key: string, value: any) => {
    onUpdate({
      storage: {
        ...settings.storage,
        [key]: value,
      },
    });
  };

  const handleMaintenanceUpdate = (key: string, value: any) => {
    onUpdate({
      maintenance: {
        ...settings.maintenance,
        [key]: value,
      },
    });
  };

  const handleAdminsUpdate = (value: string[]) => {
    onUpdate({
      admins: {
        ...settings.admins,
        emails: value,
      },
    });
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
            onChange={(value) => handleStorageUpdate('maxFileSize', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Total Storage Limit (GB)'
            value={settings.storage.totalStorageLimit}
            onChange={(value) =>
              handleStorageUpdate('totalStorageLimit', value)
            }
          />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant='h6'>Administrator Management</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EditableAutoComplete
            label='Admin Emails'
            value={settings.admins.emails}
            onChange={(value) => handleAdminsUpdate(value)}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Maintenance Mode'
            value={settings.maintenance.enabled}
            onChange={(value) => handleMaintenanceUpdate('enabled', value)}
          />
        </Grid>
        {settings.maintenance.enabled && (
          <Grid item xs={12}>
            <EditableText
              label='Maintenance Message'
              value={settings.maintenance.message}
              onChange={(value) => handleMaintenanceUpdate('message', value)}
              multiline
            />
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}
