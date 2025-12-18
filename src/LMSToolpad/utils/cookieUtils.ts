/** @format */

/**
 * Cookie utility functions for theme color scheme preference
 */

const COLOR_SCHEME_COOKIE_NAME = 'color-scheme';

export type ColorSchemePreference = 'light' | 'dark' | 'system';

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.substring(0, name.length + 1) === name + '=') {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

/**
 * Set a cookie value
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

/**
 * Get the color scheme preference from cookie
 * Returns 'system' as default if not set
 */
export function getColorSchemePreference(): ColorSchemePreference {
  const cookieValue = getCookie(COLOR_SCHEME_COOKIE_NAME);
  if (cookieValue === 'light' || cookieValue === 'dark' || cookieValue === 'system') {
    return cookieValue;
  }
  return 'system';
}

/**
 * Set the color scheme preference in cookie
 */
export function setColorSchemePreference(preference: ColorSchemePreference): void {
  setCookie(COLOR_SCHEME_COOKIE_NAME, preference);
}

/**
 * Get the effective color scheme (resolves 'system' to actual light/dark based on system preference)
 */
export function getEffectiveColorScheme(preference: ColorSchemePreference): 'light' | 'dark' {
  if (preference === 'system') {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // Default to light if system preference can't be determined
  }
  return preference;
}
