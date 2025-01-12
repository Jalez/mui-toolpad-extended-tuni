/** @format */

import { http, HttpResponse } from 'msw';
// Correctly import getUserRole from '../data/users'
import { getUserRole, UserRawBackendData } from '../data/users';
import { dataStore } from '../../store';
import { baseUrl } from '../../../constants';

export const getUserDataResponse = (
  userId?: string,
  courseId?: string
): HttpResponse => {
  try {
    const user = userId
      ? dataStore.users.find((u) => u.id === userId)
      : dataStore.users[0];
    if (user) {
      if (courseId) {
        const role = getUserRole(user.id, courseId);
        if (role) {
          user.role = role;
        }
      }
      return HttpResponse.json(user);
    } else {
      return HttpResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    return HttpResponse.json({ error: 'User not found' }, { status: 404 });
  }
};

//gets all users, possibly for a specific course if course id is provided as a query parameter
const getAllUsersDataResponse = (courseId?: string): HttpResponse => {
  //At first, assume all users are returned
  let returnedUsers = dataStore.users;
  if (courseId) {
    const userCourseConnections = dataStore.userCourseConnections.filter(
      (ucc) => ucc.courseId === courseId
    );
    //Need to find the users role for this course user and add it to the user object, if they are not connected to the course, they should not be returned
    // Filter out undefined values after mapping
    returnedUsers = userCourseConnections
      .map((ucc) => {
        const user = dataStore.users.find((u) => u.id === ucc.userId);
        if (user) {
          user.role = ucc.role;
          return user;
        }
        return undefined;
      })
      .filter((user): user is UserRawBackendData => user !== undefined);
  }
  return HttpResponse.json(returnedUsers);
};

export const getUserRoleForCourseResponse = (
  userId: string,
  courseId: string
): HttpResponse => {
  const connection = dataStore.userCourseConnections.find(
    (ucc) => ucc.userId === userId && ucc.courseId === courseId
  );
  if (connection) {
    return HttpResponse.json({ role: connection.role });
  } else {
    return HttpResponse.json({ error: 'Role not found' }, { status: 404 });
  }
};

export const userHandlers = [
  http.get(baseUrl + 'api/users/current/', async ({ request }) => {
    const courseId = new URL(request.url).searchParams.get('course_id');
    const userId = dataStore.users[0].id; // Assuming the first user is the current user
    return getUserDataResponse(userId, courseId || '');
  }),
  http.get(baseUrl + 'api/users/', async ({ request }) => {
    const courseId = new URL(request.url).searchParams.get('course_id') || '';
    return getAllUsersDataResponse(courseId);
  }),
];
