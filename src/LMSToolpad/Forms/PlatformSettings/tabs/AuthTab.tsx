/** @format */

import { Grid, Stack } from '@mui/material';
import EditableSwitch from '../../Components/Editables/EditableSwitch';
import EditableNumber from '../../Components/Editables/EditableNumber';
import EditableSelect from '../../Components/Editables/EditableSelect';
import EditableAutoComplete from '../../Components/Editables/EditableAutoComplete';
import { Platform } from '../../../store/usePlatformStore';

interface AuthTabProps {
  settings: Platform;
  onUpdate: (settings: Partial<Platform>) => void;
}

export default function AuthTab({ settings, onUpdate }: AuthTabProps) {
  const handleAuthUpdate = (key: keyof Platform['auth'], value: any) => {
    onUpdate({ auth: { ...settings.auth, [key]: value } });
  };

  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableAutoComplete
            label='Authentication Methods'
            value={settings.auth.allowedAuthMethods}
            onChange={(value) => handleAuthUpdate('allowedAuthMethods', value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSelect
            label='Default User Role'
            value={settings.auth.defaultUserRole}
            onChange={(value) => handleAuthUpdate('defaultUserRole', value)}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'guest', label: 'Guest' },
            ]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableNumber
            label='Minimum Password Length'
            value={settings.auth.minimumPasswordLength}
            onChange={(value) =>
              handleAuthUpdate('minimumPasswordLength', value)
            }
            min={6}
            max={32}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Email Verification Required'
            value={settings.auth.requireEmailVerification}
            onChange={(value) =>
              handleAuthUpdate('requireEmailVerification', value)
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <EditableSwitch
            label='Allow Self Registration'
            value={settings.auth.allowSelfRegistration}
            onChange={(value) =>
              handleAuthUpdate('allowSelfRegistration', value)
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
