/** @format */

export const getApiPrefix = () => {
  if (import.meta.env.MODE === 'development') {
    return 'lms-toolpad/';
  }
  return '';
};

// Export as apiPrefix for backward compatibility
export { getApiPrefix as apiPrefix };
