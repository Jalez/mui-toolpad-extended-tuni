/** @format */

import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem";
import VerticalScroller from "../Common/Panel/VerticalScroller";
import { useNavigate } from "react-router-dom";

type CourseListForInstanceProps = {
  code: string;
  displayMode?: "course" | "instance" | "instanceList";
  containerHeight?: string | number;
};

const CourseListForInstance = ({
  code,
  displayMode = "course",
  containerHeight = "100%",
}: CourseListForInstanceProps) => {
  const navigate = useNavigate();
  const { courses, currentCourse } = useCourseStore();
  const filteredCourses = courses.filter((course) => course.code === code);

  const handleCourseClick = (course: Course) => {
    navigate(`${course.instance}`);
  };

  return (
    <VerticalScroller itemHeight={200} containerHeight={containerHeight}>
      {filteredCourses.map((course) => (
        <CourseItem
          key={course.id}
          course={course}
          isSelected={currentCourse?.id === course.id}
          displayMode={displayMode}
          onClick={handleCourseClick}
        />
      ))}
    </VerticalScroller>
  );
};

export default CourseListForInstance;
