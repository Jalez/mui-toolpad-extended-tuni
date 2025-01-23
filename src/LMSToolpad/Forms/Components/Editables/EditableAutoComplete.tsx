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

interface EditableAutocompleteProps<T> {
  value: T[];
  onChange: (value: T[]) => void;
  label: string;
  getOptionLabel?: (option: T) => string;
  helperText?: string;
}

const EditableAutocomplete = <T extends string | { [key: string]: any }>({
  value,
  onChange,
  label,
  getOptionLabel,
  helperText,
}: EditableAutocompleteProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Updated getLabel function to handle both string and object types
  const getLabel = (option: string | T) => {
    if (typeof option === 'string') {
      return option;
    }
    if (getOptionLabel) {
      return getOptionLabel(option as T);
    }
    return String(option);
  };

  // Add function to generate unique keys
  const getKey = (option: T): string => {
    if (typeof option === 'string') {
      return option;
    }
    // For objects, create a key from their properties
    return JSON.stringify(option);
  };

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
          onChange(newValue as T[]);
        }}
        getOptionLabel={getLabel}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...otherProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                {...otherProps}
                label={getLabel(option)}
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
            helperText={helperText}
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
              <Chip
                key={getKey(tag)}
                label={getLabel(tag)}
                variant='outlined'
              />
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
