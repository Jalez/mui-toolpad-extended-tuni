/** @format */

import { HttpResponse, http } from "msw";
import { courseHandlers } from "../components/Courses/mocks/endpoints";
import { resetDataStore } from "./store";
import { userHandlers } from "../components/Users/mocks/endpoints";

interface MockDataConfig {
  teacherCount: number;
  studentCount: number;
  adminCount: number;
  coursesPerYear: number;
  startYear: number;
  numberOfYears: number;
}

const devHandlers = [
  http.post("/api/dev/reset", async ({ request }) => {
    try {
      const config = (await request.json()) as MockDataConfig;
      await resetDataStore(config);
      return HttpResponse.json({ success: true });
    } catch (error) {
      console.error("Error resetting data store:", error);
      return HttpResponse.json({ success: false });
    }
  }),
];

export const handlers = [...courseHandlers, ...userHandlers, ...devHandlers];
