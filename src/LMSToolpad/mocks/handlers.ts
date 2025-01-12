/** @format */

import { courseHandlers } from './toolpad/endpoints/courses';
import { userHandlers } from './toolpad/endpoints/users';

export const handlers = [...courseHandlers, ...userHandlers];
