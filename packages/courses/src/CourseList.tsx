/** @format */
import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem/CourseItem";
import { Scroller, useNavigationStore } from "mui-toolpad-extended-tuni";
import { useNavigate } from "mui-toolpad-extended-tuni";
import { Box } from "@mui/material";

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
  // Subscribe to navigation store to get visible sections from the navigation filter
  const { visibleSections } = useNavigationStore();
  const minHeight = 200;
  const minWidth = 300;
  
  // Map navigation section names to course list sections
  // Navigation sections: "Courses", "Courses (Old)", "Teaching Courses", "Teaching Courses (Old)", "Available Courses"
  const isCoursesVisible = visibleSections["Courses"] === true;
  const isCoursesOldVisible = visibleSections["Courses (Old)"] === true;
  const isTeachingVisible = visibleSections["Teaching Courses"] === true;
  const isTeachingOldVisible = visibleSections["Teaching Courses (Old)"] === true;
  const isAvailableVisible = visibleSections["Available Courses"] === true;

  const handleCourseClick = (course: Course) => {
    navigate(`/${course.code}/${course.instance}`);
  };

  // Render a section with a header and a horizontal scroller
  const renderCourseSection = (
    title: string,
    courseList: Course[],
    prio: "high" | "low" | "normal"
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
      }}
    >
      <Scroller
        direction="vertical"
        itemSize={minHeight}
        containerSize={containerHeight}
      >
        {/* Only render sections that are both visible in navigation filter AND have courses */}
        {/* Navigation filter controls: "Courses", "Courses (Old)", "Teaching Courses", "Teaching Courses (Old)", "Available Courses" */}
        {isCoursesVisible &&
          learningCourses.length > 0 &&
          renderCourseSection("My Enrolled Courses", learningCourses, "high")}
        {isCoursesOldVisible &&
          learningCoursesOld.length > 0 &&
          renderCourseSection(
            "My Completed Courses",
            learningCoursesOld,
            "low"
          )}
        {isTeachingVisible &&
          teachingCourses.length > 0 &&
          renderCourseSection("My Teaching Courses", teachingCourses, "low")}
        {isTeachingOldVisible &&
          teachingCoursesOld.length > 0 &&
          renderCourseSection("My Past Teaching", teachingCoursesOld, "low")}
        {isAvailableVisible &&
          availableCourses.length > 0 &&
          renderCourseSection("Available Courses", availableCourses, "low")}
      </Scroller>
    </Box>
  );
};

export default CourseList;
