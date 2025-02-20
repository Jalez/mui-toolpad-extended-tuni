/** @format */

import { generateCourses } from "./toolpad/courses/generators";
import {
  CourseBackendData,
  CourseEnrollmentBackendData,
} from "./toolpad/courses/types";
import { generateUsers } from "./toolpad/users/generators";
import { UserBackendData } from "./toolpad/users/types";

interface DataStore {
  users: UserBackendData[];
  courses: CourseBackendData[];
  enrollmentsByCourse: { [key: string]: CourseEnrollmentBackendData[] };
  lastCourseId: number;
  lastUserId: number;
}

interface MockDataConfig {
  teacherCount: number;
  studentCount: number;
  adminCount: number;
  coursesPerYear: number;
  startYear: number;
  numberOfYears: number;
}

const defaultConfig: MockDataConfig = {
  teacherCount: 5,
  studentCount: 50,
  adminCount: 2,
  coursesPerYear: 20,
  startYear: 2021,
  numberOfYears: 4,
};

const dataStoreKey = "dataStore";

export let dataStore: DataStore;
export const savedDataStore = localStorage.getItem(dataStoreKey);

const setupDataStore = async (config: MockDataConfig = defaultConfig) => {
  if (savedDataStore) {
    dataStore = JSON.parse(savedDataStore);
  } else {
    const users = await generateUsers({
      teacherCount: config.teacherCount,
      studentCount: config.studentCount,
      adminCount: config.adminCount,
    });
    const { courses, enrollmentsByCourse } = generateCourses({
      coursesPerYear: config.coursesPerYear,
      startYear: config.startYear,
      numberOfYears: config.numberOfYears,
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

export function saveDataStore(dataStore: DataStore) {
  localStorage.setItem(dataStoreKey, JSON.stringify(dataStore));
}

export async function resetDataStore(config: MockDataConfig = defaultConfig) {
  localStorage.removeItem(dataStoreKey);
  await setupDataStore(config);
}
