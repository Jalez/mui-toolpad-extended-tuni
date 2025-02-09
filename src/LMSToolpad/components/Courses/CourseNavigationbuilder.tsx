/** @format */
import React from "react";
import useCourseStore, { courseLevel } from "./store/useCourseStore";
import { NavigationSectionBuilder } from "../Navigation/NavigationBuilder";
import SchoolIcon from "@mui/icons-material/School";
import type { addSectionProps } from "../Navigation/store/useNavigationStore";
import { subjectConfig } from "../../config/subjectConfig";
import { createCourseIcon } from "../Courses/CourseIcon";
import { useMemo } from "react";

const courseToPage = (course: any) => {
  const subject = course.code.split(".")[0];
  const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
  const level: courseLevel = course.studyModule?.level || "basic";
  const courseColor = config.levelShades[level];
  const Icon = createCourseIcon(courseColor, config);

  return {
    segment: course.code,
    title: course.code.toUpperCase(),
    Icon,
    instances: [course.instance],
    description: course.description,
    microservices: course.services,
  };
};

export const CourseNavigationBuilder: React.FC = () => {
  const {
    learningCourses,
    learningCoursesOld,
    teachingCourses,
    teachingCoursesOld,
    availableCourses,
  } = useCourseStore();

  const sections = useMemo<addSectionProps[]>(() => {
    const courseSections = [
      { courses: learningCourses, header: "Learning Courses" },
      { courses: learningCoursesOld, header: "Learning Courses (Old)" },
      { courses: teachingCourses, header: "Teaching Courses" },
      { courses: teachingCoursesOld, header: "Teaching Courses (Old)" },
      { courses: availableCourses, header: "Available Courses" },
    ];

    return courseSections
      .filter(({ courses }) => courses && courses.length > 0)
      .map(({ courses, header }) => ({
        underHeader: header,
        pages: courses.map(courseToPage),
      }));
  }, [
    learningCourses,
    learningCoursesOld,
    teachingCourses,
    teachingCoursesOld,
    availableCourses,
  ]);

  return <NavigationSectionBuilder sections={sections} />;
};
