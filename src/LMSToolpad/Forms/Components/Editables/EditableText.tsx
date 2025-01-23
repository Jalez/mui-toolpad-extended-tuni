/** @format */

import { Box, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  multiline?: boolean;
  helperText?: string;
}

const EditableText = ({
  value,
  onChange,
  label,
  multiline,
  helperText,
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isEditing) {
    return (
      <TextField
        fullWidth
        value={value}
        label={label}
        multiline={multiline}
        rows={multiline ? 4 : 1}
        autoFocus
        onBlur={() => setIsEditing(false)}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
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
            //Make it still in the dom but invisible if not hovered
            opacity: isHovered ? 1 : 0,
          }}>
          <EditIcon fontSize='small' />
        </IconButton>

        <Typography variant={label === 'Title' ? 'h6' : 'body1'}>
          {value || `No ${label.toLowerCase()} set`}
        </Typography>
      </Box>
      <Typography variant='caption' color='text.secondary'>
        {helperText}
      </Typography>
    </Box>
  );
};

export default EditableText;
