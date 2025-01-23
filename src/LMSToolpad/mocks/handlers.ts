/** @format */

import { HttpResponse, http } from 'msw';
import { courseHandlers } from './toolpad/courses/endpoints';
import { resetDataStore } from './store';
import { userHandlers } from './toolpad/users/endpoints';

const devHandlers = [
  http.post('/api/dev/reset', async () => {
    try {
      await resetDataStore();
      return HttpResponse.json({ success: true });
    } catch (error) {
      return HttpResponse.json({ success: false });
    }
  }),
];

export const handlers = [...courseHandlers, ...userHandlers, ...devHandlers];
