/** @format */
import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem/CourseItem";
import { useUserStore } from "../../store/useUserStore";
import Scroller from "../Common/Panel/Scrollable/Scroller"; // Our unified scroller
import { useNavigate } from "react-router-dom";

import { usePanelContext } from "../Common/Panel/Main/Context/PanelContextProvider";
import { Box, useTheme } from "@mui/material";

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
  const theme = useTheme();
  // const { minHeight, minWidth } = usePanelContext();
  const minHeight = 200;
  const minWidth = 300;
  const visibleLists = user?.preferences.visibleCourseLists;

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
        itemSize={minWidth}
        containerSize={minHeight}
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
    <Box
      sx={{
        width: "100%",
        height: containerHeight,
        backgroundColor: "background.default",
      }}
    >
      <Scroller
        direction="vertical"
        itemSize={minHeight}
        containerSize={containerHeight}
      >
        {visibleLists?.isStudent &&
          learningCourses.length !== 0 &&
          renderCourseSection("My Enrolled Courses", learningCourses, "high")}
        {visibleLists?.isStudentOld &&
          learningCoursesOld.length !== 0 &&
          renderCourseSection(
            "My Completed Courses",
            learningCoursesOld,
            "low"
          )}
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
    </Box>
  );
};

export default CourseList;
