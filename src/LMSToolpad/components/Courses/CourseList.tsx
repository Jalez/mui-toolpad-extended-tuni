/** @format */
import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem/CourseItem";
import { useUserStore } from "../../store/useUserStore";
import Scroller from "../Common/Panel/Scroller"; // Our unified scroller
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSetSnapDimensions } from "../Common/Panel/Resizable/Context/ResizeContext";

export type priority = "high" | "low" | "normal";

type CourseListProps = {
  displayMode?: "course" | "instance" | "instanceList";
  containerHeight?: string | number;
};

const CourseList = ({
  displayMode = "instance",
  containerHeight = "100%",
}: CourseListProps) => {
  const {
    currentCourse,
    learningCourses,
    learningCoursesOld,
    teachingCourses,
    teachingCoursesOld,
    availableCourses,
  } = useCourseStore();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const setSnapDimensions = useSetSnapDimensions();
  const visibleLists = user?.preferences.visibleCourseLists;

  const itemReelHeight = 200;
  const itemReelWidth = 300;

  useEffect(() => {
    setSnapDimensions({
      width: itemReelWidth, // Account for padding/margins if needed
      height: itemReelHeight,
    });
  }, [itemReelWidth, itemReelHeight, setSnapDimensions]);

  const handleCourseClick = (course: Course) => {
    navigate(`/${course.code}/${course.instance}`);
  };

  // Render a section with a header and a horizontal scroller
  const renderCourseSection = (
    title: string,
    courseList: Course[],
    prio: priority
  ) => {
    return (
      <Scroller
        direction="horizontal"
        itemSize={itemReelWidth}
        containerSize={itemReelHeight}
        title={title}
        priority={prio}
      >
        {courseList.map((course) => (
          <CourseItem
            onClick={handleCourseClick}
            key={course.id}
            course={course}
            isSelected={currentCourse?.id === course.id}
            displayMode={displayMode}
          />
        ))}
      </Scroller>
    );
  };

  return (
    <Scroller
      direction="vertical"
      itemSize={itemReelHeight}
      containerSize={containerHeight}
    >
      {visibleLists?.isStudent &&
        learningCourses.length !== 0 &&
        renderCourseSection("My Enrolled Courses", learningCourses, "high")}
      {visibleLists?.isStudentOld &&
        learningCoursesOld.length !== 0 &&
        renderCourseSection("My Completed Courses", learningCoursesOld, "low")}
      {visibleLists?.isTeacher &&
        teachingCourses.length !== 0 &&
        renderCourseSection("My Teaching Courses", teachingCourses, "low")}
      {visibleLists?.isTeacherOld &&
        teachingCoursesOld.length !== 0 &&
        renderCourseSection("My Past Teaching", teachingCoursesOld, "low")}
      {visibleLists?.available &&
        availableCourses.length !== 0 &&
        renderCourseSection("Available Courses", availableCourses, "low")}
    </Scroller>
  );
};

export default CourseList;
