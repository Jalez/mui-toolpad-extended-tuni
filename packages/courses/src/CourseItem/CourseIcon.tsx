/** @format */

import { SvgIcon, SvgIconProps } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

export interface SubjectConfig {
  icon: string; // URL of the icon
  baseColor: string;
  levelShades: Record<string, string>;
}

export const createCourseIcon = (
  courseColor: string,
  config: SubjectConfig
): SvgIconComponent => {
  const CourseIcon: SvgIconComponent = (props: SvgIconProps) => {
    return (
      <SvgIcon
        {...props}
        sx={{
          backgroundColor: courseColor,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& image': {
            transform: 'scale(1)', // Remove scale transform
          },
        }}
        viewBox='0 0 24 24'>
        <image
          href={config.icon}
          width='20' // Increase size
          height='20' // Increase size
          x='2' // Recenter: (24 - 20) / 2
          y='2' // Recenter: (24 - 20) / 2
          preserveAspectRatio='xMidYMid meet'
        />
      </SvgIcon>
    );
  };

  CourseIcon.muiName = 'SvgIcon';
  return CourseIcon;
};

export default createCourseIcon;
