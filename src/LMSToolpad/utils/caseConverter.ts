/** @format */

// utils/caseConverter.ts

/**
 * Converts a camelCase string to underscore_case
 */
export const camelCaseToUnderscore = (str: string): string => {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_/, '');
};

/**
 * Converts an underscore_case string to camelCase
 */
export const underscoreToCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

/**
 * Deep converts object keys from camelCase to underscore_case
 */
export const convertObjectKeysToCamelCase = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysToCamelCase(item)) as T;
  }
  if (typeof obj !== 'object') return obj;

  const newObj = {} as T;
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = underscoreToCamelCase(key) as keyof T;
    newObj[newKey] = convertObjectKeysToCamelCase(value);
  });
  return newObj;
};

/**
 * Deep converts object keys from underscore_case to camelCase
 */
export const convertObjectKeysToUnderscore = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeysToUnderscore(item)) as T;
  }
  if (typeof obj !== 'object') return obj;

  const newObj = {} as T;
  Object.entries(obj).forEach(([key, value]) => {
    const newKey = camelCaseToUnderscore(key) as keyof T;
    newObj[newKey] = convertObjectKeysToUnderscore(value);
  });
  return newObj;
};
