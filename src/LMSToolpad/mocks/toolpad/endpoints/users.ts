/** @format */

import { http, HttpResponse } from 'msw';
import { getUserRole, UserRawBackendData } from '../data/users';
import { dataStore } from '../../store';
import { baseUrl } from '../../../constants';

// Type for response data
type JsonResponse = {
  data?:
    | UserRawBackendData
    | UserRawBackendData[]
    | Record<string, never>
    | { role: 'student' | 'teacher' };
  error?: string;
};

// Helper functions for responses
const createErrorResponse = (
  message: string,
  status: number = 400
): HttpResponse => {
  const response: JsonResponse = { error: message };
  return HttpResponse.json(response, { status });
};

// Handler helper functions
const handleCreateUser = async (request: Request): Promise<HttpResponse> => {
  try {
    const requestData = (await request.json()) as Record<string, unknown>;
    const newUser: UserRawBackendData = {
      id: (dataStore.users.length + 1).toString(),
      name: requestData.name as string,
      email: requestData.email as string,
      role: requestData.role as UserRawBackendData['role'],
      privacy_settings:
        requestData.privacy_settings as UserRawBackendData['privacy_settings'],
      gdpr_consent:
        requestData.gdpr_consent as UserRawBackendData['gdpr_consent'],
      data_retention:
        requestData.data_retention as UserRawBackendData['data_retention'],
    };

    dataStore.users.push(newUser);
    return HttpResponse.json(newUser);
  } catch (error) {
    return createErrorResponse('Failed to create user');
  }
};

const handleUpdateUser = async (
  request: Request,
  userId: string
): Promise<HttpResponse> => {
  try {
    const requestData = (await request.json()) as Record<string, unknown>;
    const userIndex = dataStore.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return createErrorResponse('User not found', 404);
    }

    const updatedUser = {
      ...dataStore.users[userIndex],
      ...requestData,
    } as UserRawBackendData;

    dataStore.users[userIndex] = updatedUser;
    return HttpResponse.json(updatedUser);
  } catch (error) {
    return createErrorResponse('Failed to update user');
  }
};

const handleDeleteUser = async (userId: string): Promise<HttpResponse> => {
  try {
    const userIndex = dataStore.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return createErrorResponse('User not found', 404);
    }

    //Get the user
    const user = dataStore.users[userIndex];
    //Remove the user from the data store
    dataStore.users = dataStore.users.filter((u) => u.id !== userId);
    // Clean up course connections
    dataStore.userCourseConnections = dataStore.userCourseConnections.filter(
      (ucc) => ucc.userId !== userId
    );

    return HttpResponse.json(user);
  } catch (error) {
    return createErrorResponse('Failed to delete user');
  }
};

const handleGetCurrentUser = (courseId: string | null): HttpResponse => {
  const userId = dataStore.users[0].id;
  return getUserDataResponse(userId, courseId || '');
};

const handleGetAllUsers = (courseId: string | null): HttpResponse => {
  let returnedUsers = dataStore.users;

  if (courseId) {
    const userCourseConnections = dataStore.userCourseConnections.filter(
      (ucc) => ucc.courseId === courseId
    );

    returnedUsers = userCourseConnections
      .map((ucc) => {
        const user = dataStore.users.find((u) => u.id === ucc.userId);
        if (user) {
          return {
            ...user,
            role: ucc.role,
          } as UserRawBackendData;
        }
        return undefined;
      })
      .filter((user): user is UserRawBackendData => user !== undefined);
  }

  return HttpResponse.json(returnedUsers);
};

// Main handlers
export const userHandlers = [
  http.get(baseUrl + 'api/users/current/', async ({ request }) => {
    const courseId = new URL(request.url).searchParams.get('course_id');
    return handleGetCurrentUser(courseId);
  }),

  http.get(baseUrl + 'api/users/', async ({ request }) => {
    const courseId = new URL(request.url).searchParams.get('course_id');
    return handleGetAllUsers(courseId);
  }),

  http.post(baseUrl + 'api/users/', async ({ request }) => {
    return handleCreateUser(request);
  }),

  http.put(baseUrl + 'api/users/:userId/', async ({ request, params }) => {
    return handleUpdateUser(request, params.userId as string);
  }),

  http.delete(baseUrl + 'api/users/:userId/', async ({ params }) => {
    return handleDeleteUser(params.userId as string);
  }),
];

// Keep existing helper functions
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
      return createErrorResponse('User not found', 404);
    }
  } catch (error) {
    return createErrorResponse('User not found', 404);
  }
};

export const getUserRoleForCourseResponse = (
  userId: string,
  courseId: string
): HttpResponse => {
  const connection = dataStore.userCourseConnections.find(
    (ucc) => ucc.userId === userId && ucc.courseId === courseId
  );

  if (connection) {
    // Cast the role response to satisfy the type system
    const roleResponse = { role: connection.role } as const;
    return HttpResponse.json(roleResponse);
  } else {
    return createErrorResponse('Role not found', 404);
  }
};
