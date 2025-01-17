/** @format */

import { Paper, Typography, Box } from '@mui/material';
import defaultCourseImage from '/static/images/default-course.webp';

interface EditableImageProps {
  value?: string;
  onChange: (value: string) => void;
  defaultImage?: string;
  label: string; // Add label prop
}

const EditableImage = ({
  value,
  onChange,
  defaultImage = defaultCourseImage,
  label, // Add label to destructuring
}: EditableImageProps) => {
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
              content: '"Click to change image"',
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
    </Box>
  );
};

export default EditableImage;
