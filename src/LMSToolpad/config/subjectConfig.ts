/** @format */

import { courseLevel } from '../store/useCourseStore';

export const subjectConfig: {
  [key: string]: {
    icon: string;
    baseColor: string;
    levelShades: { [K in courseLevel]: string };
  };
} = {
  'COMP.CS': {
    icon: '/static/images/icons/code.svg',
    baseColor: '#2196f3',
    levelShades: {
      basic: '#90caf9',
      intermediate: '#2196f3',
      advanced: '#1565c0',
    },
  },
  // ...existing subject configs...
};
