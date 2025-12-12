/** @format */
import React from "react";
import useCourseStore, { Course } from "./store/useCourseStore";
import { useUserStore } from "../../store/useUserStore";
import CourseItem from "./CourseItem/CourseItem";
import { useNavigate } from "react-router-dom";
import CompoundPanel, { Section, type CompoundPanelProps } from "../../../common/components/ui/CompoundPanel/CompoundPanel";

export type CourseDisplayMode = "course" | "instance" | "instanceList";

export interface CourseListPanelProps
  extends Omit<CompoundPanelProps, "sections" | "children"> {
  /**
   * Display mode for course items
   */
  displayMode?: CourseDisplayMode;

  /**
   * Whether to respect user's visible lists settings
   */
  respectVisibilitySettings?: boolean;

  /**
   * Optional custom course sections to display
   */
  customSections?: {
    title: string;
    courses: Course[];
    priority?: "high" | "low" | "normal";
  }[];
}

/**
 * CourseListPanel - An extremely simplified panel for displaying course lists
 *
 * This component completely abstracts away all panel and scrolling logic,
 * automatically creating the right sections based on user preferences
 * and course availability.
 *
 * @example - Default usage (shows all sections)
 * ```tsx
 * <CourseListPanel
 *   id="course-panel"
 *   defaultHeight={400}
 *   expandable={true}
 * />
 * ```
 *
 * @example - Custom sections
 * ```tsx
 * <CourseListPanel
 *   id="custom-courses"
 *   customSections={[
 *     {
 *       title: "Featured Courses",
 *       courses: featuredCourses,
 *       priority: "high"
 *     }
 *   ]}
 * />
 * ```
 */
export const CourseListPanel: React.FC<CourseListPanelProps> = ({
  displayMode = "instance",
  respectVisibilitySettings = true,
  customSections,
  ...panelProps
}) => {
  const navigate = useNavigate();
  const {
    currentCourse,
    learningCourses,
    learningCoursesOld,
    teachingCourses,
    teachingCoursesOld,
    availableCourses,
  } = useCourseStore();
  const { user } = useUserStore();
  const visibleLists = user?.preferences.visibleCourseLists;

  const handleCourseClick = (course: Course) => {
    navigate(`/${course.code}/${course.instance}`);
  };

  // Render a course item
  const renderCourseItem = (course: Course) => (
    <CourseItem
      key={course.id}
      onClick={handleCourseClick}
      course={course}
      isSelected={currentCourse?.id === course.id}
      displayMode={displayMode}
    />
  );

  return (
    <CompoundPanel sections={true} {...panelProps}>
      {/* Custom sections take precedence if provided */}
      {customSections?.map(
        (section, index) =>
          section.courses.length > 0 && (
            <Section
              key={`custom-section-${index}`}
              title={section.title}
              priority={section.priority}
            >
              {section.courses.map(renderCourseItem)}
            </Section>
          )
      )}

      {/* Default sections based on user preferences if no custom sections or not respecting visibility */}
      {!customSections && respectVisibilitySettings && (
        <>
          {visibleLists?.isStudent && learningCourses.length > 0 && (
            <Section title="My Enrolled Courses" priority="high">
              {learningCourses.map(renderCourseItem)}
            </Section>
          )}

          {visibleLists?.isStudentOld && learningCoursesOld.length > 0 && (
            <Section title="My Completed Courses" priority="low">
              {learningCoursesOld.map(renderCourseItem)}
            </Section>
          )}

          {visibleLists?.isTeacher && teachingCourses.length > 0 && (
            <Section title="My Teaching Courses" priority="normal">
              {teachingCourses.map(renderCourseItem)}
            </Section>
          )}

          {visibleLists?.isTeacherOld && teachingCoursesOld.length > 0 && (
            <Section title="My Past Teaching" priority="low">
              {teachingCoursesOld.map(renderCourseItem)}
            </Section>
          )}

          {visibleLists?.available && availableCourses.length > 0 && (
            <Section title="Available Courses" priority="low">
              {availableCourses.map(renderCourseItem)}
            </Section>
          )}
        </>
      )}

      {/* If not respecting visibility settings, show all courses */}
      {!customSections && !respectVisibilitySettings && (
        <>
          {learningCourses.length > 0 && (
            <Section title="My Enrolled Courses" priority="high">
              {learningCourses.map(renderCourseItem)}
            </Section>
          )}

          {learningCoursesOld.length > 0 && (
            <Section title="My Completed Courses" priority="low">
              {learningCoursesOld.map(renderCourseItem)}
            </Section>
          )}

          {teachingCourses.length > 0 && (
            <Section title="My Teaching Courses" priority="normal">
              {teachingCourses.map(renderCourseItem)}
            </Section>
          )}

          {teachingCoursesOld.length > 0 && (
            <Section title="My Past Teaching" priority="low">
              {teachingCoursesOld.map(renderCourseItem)}
            </Section>
          )}

          {availableCourses.length > 0 && (
            <Section title="Available Courses" priority="low">
              {availableCourses.map(renderCourseItem)}
            </Section>
          )}
        </>
      )}
    </CompoundPanel>
  );
};

export default CourseListPanel;
