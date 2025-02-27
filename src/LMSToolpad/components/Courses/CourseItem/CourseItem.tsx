/** @format */

import React, { useState } from "react";
import { Card, Box, Skeleton } from "@mui/material";
import { Course } from "../store/useCourseStore";
import useDialogStore from "../../../store/useDialogStore";
import useCourseStore from "../store/useCourseStore";
import { subjectConfig } from "../config/subjectConfig";
import { CourseHeader } from "./CourseHeader";
import { CourseInfo } from "./CourseInfo";
import { CourseHeaderActions } from "./CourseHeaderActions";

type CourseItemProps = {
  course: Course;
  isSelected?: boolean;
  displayMode?: "course" | "instance" | "instanceList";
  onClick: (course: Course) => void;
};

const CourseItem = ({
  course,
  displayMode = "course",
  onClick,
}: CourseItemProps) => {
  const { setOpenDialog } = useDialogStore();
  const { setCourseToUpdate, setCurrentCourse } = useCourseStore();

  const subject = course.code.split(".")[0];
  const config = subjectConfig[subject] || subjectConfig["COMP.CS"];
  const level = course.studyModule?.level || "basic";
  const courseColor = config.levelShades[level];

  const isTeacher = course.data?.myData?.role === "teacher";
  const isEnrolled = course.data?.myData?.status === "enrolled";
  const showEnrollmentOpen = Boolean(
    !isEnrolled && course.enrollment?.status.open
  );
  const hasUpcomingEvents = Boolean(
    course.events.lecture.some(
      (event) => new Date(event.startTime) > new Date()
    )
  );

  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSettingsClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCourseToUpdate(course);
    setOpenDialog("CourseSettings");
  };

  const handleTeacherEnroll = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpenDialog("ManageEnrollments"); // Or whatever dialog you use for this
  };

  const handleCourseSelect = () => {
    setCurrentCourse(course);
    onClick(course);
  };

  return (
    <Card
      elevation={0}
      sx={{
        marginLeft: 2,
        marginRight: 2,
        boxSizing: "border-box",
        position: "relative",
        cursor: "pointer",
        flex: "1",
        backgroundColor: `${courseColor}08`,
        borderLeft: `4px solid ${courseColor}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        height: "100%",
        "&:hover": {
          backgroundColor: `${courseColor}15`,
          "& .subject-icon": {
            opacity: 0.15,
            transform: "scale(1.1)",
          },
        },
      }}
      onClick={handleCourseSelect}
    >
      {!imgLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            right: -10,
            bottom: -10,
            width: "80px",
            height: "80px",
            opacity: 0.08,
            transition: "all 0.3s ease-in-out",
          }}
          animation="wave"
        />
      )}
      <Box
        component="img"
        className="subject-icon"
        src={config.icon}
        alt={subject}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        sx={{
          position: "absolute",
          right: -10,
          bottom: -10,
          width: "80px",
          height: "80px",
          transition: "opacity 0.3s ease-in-out",
          filter: `drop-shadow(0 0 1px ${courseColor})`,
          opacity: 0.08,
        }}
      />
      <Box
        sx={{
          p: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <CourseHeader course={course} />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <CourseInfo
              course={course}
              displayMode={displayMode}
              hasUpcomingEvents={hasUpcomingEvents}
            />
            <CourseHeaderActions
              course={course}
              courseColor={courseColor}
              isTeacher={isTeacher}
              showEnrollmentOpen={showEnrollmentOpen}
              onSettingsClick={handleSettingsClick}
              onEnroll={(e) => {
                e.stopPropagation();
                setOpenDialog("EnrollInCourse");
              }}
              onTeacherEnroll={handleTeacherEnroll}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseItem;
