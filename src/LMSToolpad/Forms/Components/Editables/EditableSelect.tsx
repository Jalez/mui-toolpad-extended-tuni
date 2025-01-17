/** @format */

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
interface EditableSelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options: { value: string; label: string }[];
  explanation?: string;
}

const EditableSelect = ({
  value,
  onChange,
  label,
  options,
  explanation,
}: EditableSelectProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (isEditing) {
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          autoFocus
          onBlur={() => setIsEditing(false)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsEditing(false);
          }}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {explanation && (
          <Typography
            variant='body2'
            color='text.secondary'
            sx={{ mt: 1, ml: 1 }}>
            {explanation}
          </Typography>
        )}
      </FormControl>
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
        <Typography variant='body1'>
          {options.find((opt) => opt.value === value)?.label ||
            `No ${label.toLowerCase()} set`}
        </Typography>
      </Box>
      {explanation && (
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          {explanation}
        </Typography>
      )}
    </Box>
  );
};

export default EditableSelect;
