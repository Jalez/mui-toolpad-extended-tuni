/** @format */

import { Box, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number; // Add step property
}

const EditableNumber = ({
  value,
  onChange,
  label,
  min,
  max,
  step,
}: EditableNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isEditing) {
    return (
      <TextField
        type='number'
        fullWidth
        value={value}
        label={label}
        inputProps={{ min, max, step }} // Add step to inputProps
        autoFocus
        onBlur={() => setIsEditing(false)}
        onChange={(e) => {
          const parsed = parseFloat(e.target.value);
          onChange(isNaN(parsed) ? 0 : parsed);
        }}
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
          alignItems: 'center',
        }}>
        <IconButton
          size='small'
          onClick={() => setIsEditing(true)}
          sx={{
            opacity: isHovered ? 1 : 0,
          }}>
          <EditIcon fontSize='small' />
        </IconButton>
        <Typography variant='body1'>{value}</Typography>
      </Box>
    </Box>
  );
};

export default EditableNumber;
