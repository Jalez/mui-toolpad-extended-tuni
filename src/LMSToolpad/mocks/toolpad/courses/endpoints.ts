/** @format */

import { http, HttpResponse } from 'msw';

import { dataStore, saveDataStore } from '../../store';
import { baseUrl } from '../../../constants';
import {
  CourseBackendData,
  CourseBackendDataWithEnrollments,
  CourseRawBackendData,
} from './types';
// import { useUserStore } from '../../../store/useUserStore';

const hasAccessToCourse = (
  course: CourseBackendData,
  userId: string | undefined
): boolean => {
  if (!userId) return course.visibility.mode === 'public';
  if (course.visibility.mode === 'public') return true;

  const enrollments = dataStore.enrollmentsByCourse[course.id] || [];
  const userEnrollment = enrollments.find((e) => e.user_id === userId);

  if (!userEnrollment) return false;
  if (course.visibility.mode === 'enrolled') return true;
  if (course.visibility.mode === 'private')
    return userEnrollment.role === 'teacher';

  return false;
};

const enrichCourseWithData = (
  course: CourseBackendData,
  userId: string | undefined
): CourseBackendDataWithEnrollments => {
  const enrollments = dataStore.enrollmentsByCourse[course.id] || [];
  const userEnrollment = userId
    ? enrollments.find((e) => e.user_id === userId)
    : undefined;

  return {
    ...course,
    data: {
      my_data: userEnrollment
        ? {
            role: userEnrollment.role,
            status: userEnrollment.status,
          }
        : undefined,
      enrollment_data: enrollments,
    },
  };
};

export const getCourseByIdResponse = (courseId: string): HttpResponse => {
  const course = dataStore.courses.find((course) => course.id === courseId);
  // const { user } = useUserStore.getState();

  // Get the first user from the store
  // We'd usually get the users information from the lti context, but for the sake of this mock we'll just get the first user
  const user = dataStore.users[0];

  if (!course) {
    return HttpResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  if (!hasAccessToCourse(course, user?.id)) {
    return HttpResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  return HttpResponse.json(enrichCourseWithData(course, user?.id));
};

export const getCoursesResponse = (): HttpResponse => {
  // const { user } = useUserStore.getState();
  // We'd usually get the users information from the lti context, but for the sake of this mock we'll just get the first user
  const user = dataStore.users[0];

  const accessibleCourses = dataStore.courses
    .filter((course) => hasAccessToCourse(course, user?.id))
    .map((course) => enrichCourseWithData(course, user?.id));

  return HttpResponse.json(accessibleCourses);
};

export const createCourseResponse = (
  newCourse: CourseRawBackendData
): HttpResponse => {
  dataStore.lastCourseId += 1;
  const course: CourseBackendData = {
    id: dataStore.lastCourseId.toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...newCourse,
  };

  dataStore.courses.push(course);
  saveDataStore(dataStore);
  return HttpResponse.json(course);
};

export const updateCourseResponse = (
  updatedCourse: CourseBackendData
): HttpResponse => {
  const index = dataStore.courses.findIndex(
    (course) => course.id === updatedCourse.id
  );
  if (index !== -1) {
    updatedCourse.updated_at = new Date().toISOString();
    dataStore.courses[index] = updatedCourse;
    saveDataStore(dataStore);
    return HttpResponse.json(updatedCourse);
  } else {
    return HttpResponse.json({ error: 'Course not found' }, { status: 404 });
  }
};

export const deleteCourseResponse = (courseId: string): HttpResponse => {
  const index = dataStore.courses.findIndex((course) => course.id === courseId);
  if (index !== -1) {
    const deletedCourse = dataStore.courses.splice(index, 1)[0];
    saveDataStore(dataStore);
    return HttpResponse.json(deletedCourse);
  } else {
    return HttpResponse.json({ error: 'Course not found' }, { status: 404 });
  }
};

export const courseHandlers = [
  http.get(baseUrl + 'api/courses', async () => getCoursesResponse()),
  http.get(baseUrl + 'api/courses/:courseId', async ({ params }) =>
    getCourseByIdResponse(params.courseId as string)
  ),
  http.post(baseUrl + 'api/courses', async ({ request }) => {
    return createCourseResponse((await request.json()) as CourseRawBackendData);
  }),
  http.put(baseUrl + 'api/courses/:courseId', async ({ request }) => {
    return updateCourseResponse((await request.json()) as CourseBackendData);
  }),
  http.delete(baseUrl + 'api/courses/:courseId', async ({ params }) => {
    return deleteCourseResponse(params.courseId as string);
  }),
];
