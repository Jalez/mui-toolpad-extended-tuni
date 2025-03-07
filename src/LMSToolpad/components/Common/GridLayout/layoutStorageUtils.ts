/** @format */
import { Layouts } from "react-grid-layout";

/**
 * Helper function to get layout from localStorage
 * @param key Storage key for the layout
 * @returns The stored layout or null if not found
 */
export function getFromLS(key: string): Layouts | null {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : null;
  } catch (e) {
    console.error("Error loading from localStorage:", e);
    return null;
  }
}

/**
 * Helper function to save layout to localStorage
 * @param key Storage key for the layout
 * @param value The layout to store
 */
export function saveToLS(key: string, value: Layouts): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

// Define user presets storage key
export const USER_PRESETS_KEY = "user-layout-presets";

/**
 * Layout preset interface
 */
export interface LayoutPreset {
  id: string;
  name: string;
  layouts: Layouts;
  createdAt?: number; // Timestamp
  updatedAt?: number; // Timestamp
}

/**
 * Helper function to get user presets from localStorage
 * @returns Array of user-defined layout presets
 */
export function getUserPresets(): LayoutPreset[] {
  try {
    const userPresetsJson = localStorage.getItem(USER_PRESETS_KEY);
    return userPresetsJson ? JSON.parse(userPresetsJson) : [];
  } catch (e) {
    console.error("Failed to load user presets:", e);
    return [];
  }
}

/**
 * Helper function to save a user preset to localStorage
 * @param name Name of the preset
 * @param layouts Layout configuration to save
 * @returns ID of the newly created preset
 */
export function saveUserPreset(name: string, layouts: Layouts): string {
  try {
    const userPresets = getUserPresets();
    const presetId = `preset-${Date.now()}`;
    const timestamp = Date.now();

    // Create a deep copy of layouts
    const layoutsCopy = JSON.parse(JSON.stringify(layouts));

    // Add new preset
    userPresets.push({
      id: presetId,
      name,
      layouts: layoutsCopy,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    // Save to localStorage
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(userPresets));

    return presetId;
  } catch (e) {
    console.error("Failed to save user preset:", e);
    return "";
  }
}

/**
 * Helper function to delete a user preset from localStorage
 * @param presetId ID of the preset to delete
 * @returns true if deletion was successful, false otherwise
 */
export function deleteUserPreset(presetId: string): boolean {
  try {
    // Get current presets
    const presets = getUserPresets();

    // Check if the preset exists
    const presetExists = presets.some((p) => p.id === presetId);
    if (!presetExists) return false;

    // Filter out the preset to delete
    const filteredPresets = presets.filter((p) => p.id !== presetId);

    // Save updated presets
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(filteredPresets));

    return true;
  } catch (e) {
    console.error("Failed to delete user preset:", e);
    return false;
  }
}

/**
 * Helper function to update a user preset in localStorage
 * @param presetId ID of the preset to update
 * @param updates Object with properties to update
 * @returns true if update was successful, false otherwise
 */
export function updateUserPreset(
  presetId: string,
  updates: Partial<{ name: string; layouts: Layouts }>
): boolean {
  try {
    // Get current presets
    const presets = getUserPresets();

    // Find the preset to update
    const presetIndex = presets.findIndex((p) => p.id === presetId);
    if (presetIndex === -1) return false;

    // Update the preset
    presets[presetIndex] = {
      ...presets[presetIndex],
      ...updates,
      updatedAt: Date.now(),
    };

    // Save updated presets
    localStorage.setItem(USER_PRESETS_KEY, JSON.stringify(presets));

    return true;
  } catch (e) {
    console.error("Failed to update user preset:", e);
    return false;
  }
}
