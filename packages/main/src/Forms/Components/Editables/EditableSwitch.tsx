/** @format */

import { Box, FormControlLabel, Switch, Typography } from '@mui/material';

interface EditableSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}

const EditableSwitch = ({ value, onChange, label }: EditableSwitchProps) => {
  return (
    <Box>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {label}
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        }
        label={value ? 'Enabled' : 'Disabled'}
      />
    </Box>
  );
};

export default EditableSwitch;
