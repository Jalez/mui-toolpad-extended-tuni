/** @format */

import { http, HttpResponse } from "msw";
import { baseUrl, dataStore, saveDataStore } from "mui-toolpad-extended-tuni";
import { UserBackendData } from "./types";

// Type for response data
type JsonResponse = {
  data?: UserBackendData | UserBackendData[] | Record<string, never>;
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
    const newUser: UserBackendData = {
      id: (dataStore.users.length + 1).toString(),
      name: requestData.name as string,
      email: requestData.email as string,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      platform_roles:
        (requestData.platform_roles as UserBackendData["platform_roles"]) || [
          "user",
        ],
      privacy_settings:
        requestData.privacy_settings as UserBackendData["privacy_settings"],
      gdpr_consent: requestData.gdpr_consent as UserBackendData["gdpr_consent"],
      data_retention:
        requestData.data_retention as UserBackendData["data_retention"],
      preferences: requestData.preferences as UserBackendData["preferences"],
    };

    dataStore.users.push(newUser);
    return HttpResponse.json(newUser);
  } catch (error) {
    return createErrorResponse("Failed to create user");
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
      return createErrorResponse("User not found", 404);
    }

    const updatedUser = {
      ...dataStore.users[userIndex],
      ...requestData,
    } as UserBackendData;

    dataStore.users[userIndex] = updatedUser;
    saveDataStore(dataStore);
    return HttpResponse.json(updatedUser);
  } catch (error) {
    return createErrorResponse("Failed to update user");
  }
};

const handleDeleteUser = async (userId: string): Promise<HttpResponse> => {
  try {
    const userIndex = dataStore.users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return createErrorResponse("User not found", 404);
    }

    //Get the user
    const user = dataStore.users[userIndex];
    //Remove the user from the data store
    dataStore.users = dataStore.users.filter((u) => u.id !== userId);

    // Clean up course enrollments instead of userCourseConnections
    Object.keys(dataStore.enrollmentsByCourse).forEach((courseId) => {
      dataStore.enrollmentsByCourse[courseId] = dataStore.enrollmentsByCourse[
        courseId
      ].filter((enrollment) => enrollment.user_id !== userId);
    });

    return HttpResponse.json(user);
  } catch (error) {
    return createErrorResponse("Failed to delete user");
  }
};

const handleGetCurrentUser = (): HttpResponse => {
  const userId = dataStore.users[0].id;
  const user = dataStore.users.find((u) => u.id === userId);
  return HttpResponse.json(user);
};

const handleGetAllUsers = (): HttpResponse => {
  return HttpResponse.json(dataStore.users);
};

// Main handlers
export const userHandlers = [
  http.get(baseUrl + "api/users/current/", () => {
    return handleGetCurrentUser();
  }),

  http.get(baseUrl + "api/users/", () => {
    return handleGetAllUsers();
  }),

  http.post(baseUrl + "api/users/", async ({ request }) => {
    return handleCreateUser(request);
  }),

  http.put(baseUrl + "api/users/:userId/", async ({ request, params }) => {
    return handleUpdateUser(request, params.userId as string);
  }),

  http.delete(baseUrl + "api/users/:userId/", async ({ params }) => {
    return handleDeleteUser(params.userId as string);
  }),
];

// Helper function for getting user data
export const getUserDataResponse = (userId?: string): HttpResponse => {
  try {
    const user = userId
      ? dataStore.users.find((u) => u.id === userId)
      : dataStore.users[0];

    if (user) {
      return HttpResponse.json(user);
    }
    return createErrorResponse("User not found", 404);
  } catch (error) {
    return createErrorResponse("Internal server error", 500);
  }
};
