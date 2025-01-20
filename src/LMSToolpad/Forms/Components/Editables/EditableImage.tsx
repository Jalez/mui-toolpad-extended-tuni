/** @format */

import { Paper, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import defaultUserImage from '/static/images/guest.png';
import { useState } from 'react';

interface EditableImageProps {
  value?: string;
  onChange: (value: string) => void;
  defaultImage?: string;
  label?: string;
}

const EditableImage = ({
  value,
  onChange,
  defaultImage = defaultUserImage,
  label,
}: EditableImageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onChange(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <Box>
      <Typography variant='body2' color='text.secondary' gutterBottom>
        {label}
      </Typography>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{ position: 'relative', display: 'inline-block' }}>
        <Paper
          onClick={handleImageClick}
          sx={{
            width: {
              xs: 100,
              sm: 120,
              md: 160,
            },
            height: {
              xs: 100,
              sm: 120,
              md: 160,
            },
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative',
            flexShrink: 0,
            '&:hover': {
              '&::after': {
                content: '"Change image"',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 1,
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                textAlign: 'center',
              },
            },
          }}>
          <img
            src={value || defaultImage}
            alt={label}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Paper>
        <IconButton
          size='small'
          onClick={handleImageClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.2s',
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          }}>
          <EditIcon fontSize='small' />
        </IconButton>
      </Box>
    </Box>
  );
};

export default EditableImage;
