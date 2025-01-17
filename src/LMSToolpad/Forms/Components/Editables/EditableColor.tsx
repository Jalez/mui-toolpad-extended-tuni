/** @format */

import { Box, IconButton, TextField, Typography, Popover } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface EditableColorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const EditableColor = ({ value, onChange, label }: EditableColorProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ position: 'relative' }}>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          size='small'
          onClick={handleOpen}
          sx={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
          }}>
          <EditIcon fontSize='small' />
        </IconButton>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: value,
            border: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
          }}
          onClick={handleOpen}
        />
        <Typography variant='body2'>{value}</Typography>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Box sx={{ p: 2 }}>
          <HexColorPicker color={value} onChange={onChange} />
          <TextField
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            size='small'
            sx={{ mt: 2 }}
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default EditableColor;
