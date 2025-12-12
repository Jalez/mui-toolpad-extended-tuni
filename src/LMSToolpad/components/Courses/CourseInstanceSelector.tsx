/** @format */

import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CenteredHeading from "../../../common/components/ui/CenteredHeading/CenteredHeading";
import useCourseStore, { Course } from "./store/useCourseStore";
import CourseItem from "./CourseItem/CourseItem";

/**
 * Component for selecting course instances from a filtered list.
 *
 * @version 2.1.0
 * @new-component
 * - Provides instance selection UI for courses
 * - Groups instances by course code
 * - Handles active/inactive instance states
 * - Supports nested navigation structure
 *
 * @param {Course[]} courses - Available course instances
 */
const CourseInstanceSelector = () => {
  const { code } = useParams();

  const navigate = useNavigate();
  const { courses, currentCourse } = useCourseStore();
  const filteredCourses = courses.filter((course) => course.code === code);

  const handleCourseClick = (course: Course) => {
    navigate(`${course.instance}`);
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CenteredHeading
        heading="Course Instances"
        subheading="Below are all the instances of the selected course. Select an instance to view its content."
      />
      {filteredCourses.map((course) => (
        <CourseItem
          key={course.id}
          course={course}
          isSelected={currentCourse?.id === course.id}
          displayMode={"course"}
          onClick={handleCourseClick}
        />
      ))}{" "}
    </Box>
  );
};

export default CourseInstanceSelector;
