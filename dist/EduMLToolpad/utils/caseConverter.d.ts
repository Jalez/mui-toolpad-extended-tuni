/** @format */
/**
 * Converts a camelCase string to underscore_case
 */
export declare const camelCaseToUnderscore: (str: string) => string;
/**
 * Converts an underscore_case string to camelCase
 */
export declare const underscoreToCamelCase: (str: string) => string;
/**
 * Deep converts object keys from camelCase to underscore_case
 */
export declare const convertObjectKeysToCamelCase: <T>(obj: T) => T;
/**
 * Deep converts object keys from underscore_case to camelCase
 */
export declare const convertObjectKeysToUnderscore: <T>(obj: T) => T;
