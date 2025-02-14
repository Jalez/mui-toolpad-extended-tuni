/** @format */

import { generateCourses } from './toolpad/courses/generators';
import {
  CourseBackendData,
  CourseEnrollmentBackendData,
} from './toolpad/courses/types';
import { generateUsers } from './toolpad/users/generators';
import { UserBackendData } from './toolpad/users/types';

interface DataStore {
  users: UserBackendData[];
  courses: CourseBackendData[];
  enrollmentsByCourse: { [key: string]: CourseEnrollmentBackendData[] };
  lastCourseId: number;
  lastUserId: number;
}

// Path to the data store JSON file (optional persistence)

const dataStoreKey = 'dataStore';

export let dataStore: DataStore;
export const savedDataStore = localStorage.getItem(dataStoreKey);
const setupDataStore = async () => {
  if (savedDataStore) {
    dataStore = JSON.parse(savedDataStore);
  } else {
    const users = await generateUsers({
      teacherCount: 5,
      studentCount: 50,
      adminCount: 2,
    });
    const { courses, enrollmentsByCourse } = generateCourses({
      coursesPerYear: 20,
      startYear: 2021,
      numberOfYears: 5,
      users: users,
    });
    dataStore = {
      users: users,
      courses: courses,
      enrollmentsByCourse: enrollmentsByCourse,
      lastCourseId: courses.length,
      lastUserId: users.length,
    };
    saveDataStore(dataStore);
  }
};

setupDataStore();

// Function to save data store to JSON file
// Function to save data store to LocalStorage
export function saveDataStore(dataStore: DataStore) {
  localStorage.setItem(dataStoreKey, JSON.stringify(dataStore));
}

// Function to reset data store to initial state
export async function resetDataStore() {
  // Generate mock data
  const users = await generateUsers({
    teacherCount: 5,
    studentCount: 50,
    adminCount: 2,
  });
  const { courses, enrollmentsByCourse } = generateCourses({
    coursesPerYear: 20,
    startYear: 2021,
    numberOfYears: 4,
    users: users,
  });

  dataStore = {
    users: users,
    courses: courses,
    enrollmentsByCourse: enrollmentsByCourse,
    lastCourseId: courses.length,
    lastUserId: users.length,
  };
  saveDataStore(dataStore);
}
