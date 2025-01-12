/** @format */

import { http, HttpResponse } from 'msw';

import { CourseBackendData, CourseRawBackendData } from '../data/courses';
import { dataStore, saveDataStore } from '../../store';
import { baseUrl } from '../../../constants';

export const getCurrentCourseResponse = (): HttpResponse => {
  // return HttpResponse.json(dataStore.courses[0]);
  //By default, there is no current course, so we return {
  // "error": "Course not found"
  // } with 404 status code
  return HttpResponse.json({ error: 'Course not found' }, { status: 404 });
};

export const getCourseByIdResponse = (courseId: string): HttpResponse => {
  const course = dataStore.courses.find((course) => course.id === courseId);
  if (course) {
    return HttpResponse.json(course);
  } else {
    return HttpResponse.json({ error: 'Course not found' }, { status: 404 });
  }
};

export const getCoursesResponse = (): HttpResponse => {
  return HttpResponse.json(dataStore.courses);
};

export const createCourseResponse = (
  newCourse: CourseRawBackendData
): HttpResponse => {
  dataStore.lastCourseId += 1;
  const course: CourseBackendData = {
    id: dataStore.lastCourseId.toString(),
    title: newCourse.title,
    description: newCourse.description,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    code: newCourse.code || '',
    instance: newCourse.instance || '',
    lti_login_url: newCourse.lti_login_url || '',
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
  http.get(baseUrl + 'api/courses/current', async () =>
    getCurrentCourseResponse()
  ),
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
