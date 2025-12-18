/** @format */

import { Typography } from '@mui/material';

type CenteredHeadingProps = {
  heading: string;
  subheading?: string;
};

const CenteredHeading = ({ heading, subheading }: CenteredHeadingProps) => {
  return (
    <>
      <Typography
        variant='h1'
        sx={{ textAlign: 'center', mt: 5, color: 'text.secondary' }}>
        {heading}
      </Typography>
      {subheading && (
        <Typography
          variant='h4'
          sx={{ textAlign: 'center', mt: 2, color: 'text.secondary' }}>
          {subheading}
        </Typography>
      )}
    </>
  );
};

export default CenteredHeading;
