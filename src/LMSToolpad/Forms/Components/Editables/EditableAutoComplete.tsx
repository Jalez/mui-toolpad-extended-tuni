/** @format */

import {
  Autocomplete,
  Chip,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/system';
import { useState } from 'react';

interface EditableAutocompleteProps {
  value: string[];
  onChange: (value: string[]) => void;
  label: string;
}

const EditableAutocomplete = ({
  value,
  onChange,
  label,
}: EditableAutocompleteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isEditing) {
    return (
      <Autocomplete
        multiple
        options={[]}
        freeSolo
        value={value}
        autoFocus
        onBlur={() => setIsEditing(false)}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...otherProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                {...otherProps}
                label={option}
                variant='outlined'
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={`Add ${label.toLowerCase()}`}
          />
        )}
      />
    );
  }

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: 'relative' }}>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {label}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 1,
        }}>
        <IconButton
          size='small'
          onClick={() => setIsEditing(true)}
          sx={{
            opacity: isHovered ? 1 : 0,
          }}>
          <EditIcon fontSize='small' />
        </IconButton>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {value.length > 0 ? (
            value.map((tag) => (
              <Chip key={tag} label={tag} variant='outlined' />
            ))
          ) : (
            <Typography variant='body1'>
              {`No ${label.toLowerCase()} set`}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EditableAutocomplete;
