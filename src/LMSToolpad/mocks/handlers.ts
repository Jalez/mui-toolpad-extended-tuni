/** @format */

import { HttpResponse, http } from 'msw';
import { courseHandlers } from './toolpad/endpoints/courses';
import { userHandlers } from './toolpad/endpoints/users';
import { resetDataStore } from './store';

const devHandlers = [
  http.post('/api/dev/reset', () => {
    resetDataStore();
    return HttpResponse.json({ success: true });
  }),
];

export const handlers = [...courseHandlers, ...userHandlers, ...devHandlers];
