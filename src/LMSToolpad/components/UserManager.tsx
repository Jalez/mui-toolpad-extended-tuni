/** @format */

import { useSyncNavigationFilters } from "./Navigation/useSyncNavigationFilters";

export const UserManager = () => {
  // Use the sync hook to keep navigation filters in sync with user preferences
  useSyncNavigationFilters();

  // ...existing code...
  return null;
};
