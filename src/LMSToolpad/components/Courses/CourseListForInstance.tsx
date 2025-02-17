/** @format */

import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem";
import { useNavigate } from "react-router-dom";
import Scroller from "../Common/Panel/Scroller";

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

  const itemHeight = 100;

  return (
    <Scroller
      direction="vertical"
      itemSize={itemHeight}
      containerSize={containerHeight}
    >
      {filteredCourses.map((course) => (
        <CourseItem
          key={course.id}
          course={course}
          isSelected={currentCourse?.id === course.id}
          displayMode={displayMode}
          onClick={handleCourseClick}
        />
      ))}
    </Scroller>
  );
};

export default CourseListForInstance;
