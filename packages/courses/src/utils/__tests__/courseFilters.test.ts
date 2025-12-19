/** @format */

import { test, expect, describe } from "vitest";
import {
  groupCoursesByEnrollment,
  type Course,
  courseRole,
  enrollmentStatus,
} from "../..";

describe("groupCoursesByEnrollment", () => {
  const createMockCourse = (override: Partial<Course> = {}): Course => ({
    id: "test-id",
    code: "TEST.101",
    instance: "test-instance",
    title: "Test Course",
    description: "Test Description",
    visibility: { mode: "public", startDate: null, endDate: null },
    endDate: null,
    startDate: null,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
    events: {
      lecture: [],
      exercise: [],
      exam: [],
      deadline: [],
      other: [],
    },
    dataProcessing: {
      purposes: ["course_delivery", "assessment"],
      retention: 365,
      thirdPartyProcessors: [],
      specialCategories: false,
      legalBasis: "consent",
    },
    ...override,
  });

  test("should categorize enrolled student courses correctly", () => {
    const activeCourse = createMockCourse({
      data: {
        myData: {
          role: "student" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });
    const endedCourse = createMockCourse({
      endDate: "2023-01-01",
      data: {
        myData: {
          role: "student" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([activeCourse, endedCourse]);

    expect(result.isStudent).toHaveLength(1);
    expect(result.isStudentOld).toHaveLength(1);
    expect(result.available).toHaveLength(0);
  });

  test("should categorize teacher courses correctly", () => {
    const activeCourse = createMockCourse({
      data: {
        myData: {
          role: "teacher" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });
    const endedCourse = createMockCourse({
      endDate: "2023-01-01",
      data: {
        myData: {
          role: "teacher" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([activeCourse, endedCourse]);

    expect(result.isTeacher).toHaveLength(1);
    expect(result.isTeacherOld).toHaveLength(1);
    expect(result.available).toHaveLength(0);
  });

  test("should categorize available courses correctly", () => {
    const publicCourse = createMockCourse({
      visibility: { mode: "public", startDate: null, endDate: null },
    });
    const privateCourse = createMockCourse({
      visibility: { mode: "private", startDate: null, endDate: null },
    });
    const endedPublicCourse = createMockCourse({
      visibility: { mode: "public", startDate: null, endDate: null },
      endDate: "2023-01-01",
    });
    const pendingEnrollmentCourse = createMockCourse({
      visibility: { mode: "public", startDate: null, endDate: null },
      data: {
        myData: {
          role: "student" as courseRole,
          status: "pending" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([
      publicCourse,
      privateCourse,
      endedPublicCourse,
      pendingEnrollmentCourse,
    ]);

    expect(result.available).toHaveLength(2); // public and pending courses
    expect(result.isStudent).toHaveLength(0);
    expect(result.isTeacher).toHaveLength(0);
  });

  test("should handle courses with pending enrollment correctly", () => {
    const pendingStudentCourse = createMockCourse({
      data: {
        myData: {
          role: "student" as courseRole,
          status: "pending" as enrollmentStatus,
        },
      },
    });
    const rejectedStudentCourse = createMockCourse({
      data: {
        myData: {
          role: "student" as courseRole,
          status: "rejected" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([
      pendingStudentCourse,
      rejectedStudentCourse,
    ]);

    expect(result.available).toHaveLength(2); // Both should be in available
    expect(result.isStudent).toHaveLength(0);
    expect(result.isTeacher).toHaveLength(0);
  });

  test("should prioritize enrolled status over public visibility", () => {
    const enrolledPublicCourse = createMockCourse({
      visibility: { mode: "public", startDate: null, endDate: null },
      data: {
        myData: {
          role: "student" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([enrolledPublicCourse]);

    expect(result.isStudent).toHaveLength(1);
    expect(result.available).toHaveLength(0);
  });

  test("should prioritize teacher role over student role when both exist", () => {
    const dualRoleCourse = createMockCourse({
      data: {
        myData: {
          role: "teacher" as courseRole,
          status: "enrolled" as enrollmentStatus,
        },
      },
    });

    const result = groupCoursesByEnrollment([dualRoleCourse]);

    expect(result.isTeacher).toHaveLength(1);
    expect(result.isStudent).toHaveLength(0);
  });

  test("should handle courses with no role or enrollment status correctly", () => {
    const publicCourse = createMockCourse({
      visibility: { mode: "public", startDate: null, endDate: null },
    });

    const privateCourse = createMockCourse({
      visibility: { mode: "private", startDate: null, endDate: null },
    });

    const result = groupCoursesByEnrollment([publicCourse, privateCourse]);

    expect(result.available).toHaveLength(1);
    expect(result.isStudent).toHaveLength(0);
    expect(result.isTeacher).toHaveLength(0);
  });
});
