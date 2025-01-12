/** @format */

import { basicCourses, CourseBackendData } from './toolpad/data/courses';
import {
  basicUserCourseConnections,
  basicUsersDataResponse,
  UserCourseConnection,
  UserRawBackendData,
} from './toolpad/data/users';

interface DataStore {
  users: UserRawBackendData[];
  userCourseConnections: UserCourseConnection[];

  courses: CourseBackendData[];
  lastReportId: number;
  lastMessageId: number;
  lastCourseId: number;
  lastChannelId: number;
  lastUserId: number;
  lastArticleId: number;
}

// Path to the data store JSON file (optional persistence)

const dataStoreKey = 'dataStore';

export let dataStore: DataStore;
export const savedDataStore = localStorage.getItem(dataStoreKey);
if (savedDataStore) {
  dataStore = JSON.parse(savedDataStore);
} else {
  dataStore = {
    users: [...basicUsersDataResponse],
    userCourseConnections: [...basicUserCourseConnections],

    courses: [...basicCourses],
    lastReportId: 4,
    lastMessageId: 7,
    lastCourseId: 2,
    lastChannelId: 2,
    lastUserId: 1,
    lastArticleId: 2,
  };
  saveDataStore(dataStore);
}

// Function to save data store to JSON file
// Function to save data store to LocalStorage
export function saveDataStore(dataStore: DataStore) {
  localStorage.setItem(dataStoreKey, JSON.stringify(dataStore));
}

// Function to reset data store to initial state
export function resetDataStore() {
  dataStore = {
    users: [...basicUsersDataResponse],
    userCourseConnections: [...basicUserCourseConnections],
    courses: [...basicCourses],
    lastReportId: 3,
    lastMessageId: 3,
    lastCourseId: 2,
    lastChannelId: 2,
    lastUserId: 1,
    lastArticleId: 2,
  };
  saveDataStore(dataStore);
}
