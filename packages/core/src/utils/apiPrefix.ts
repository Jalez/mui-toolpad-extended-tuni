/** @format */

export const getApiPrefix = () => {
  if (import.meta.env.MODE === 'development') {
    return 'lms-toolpad/';
  }
  return '';
};
