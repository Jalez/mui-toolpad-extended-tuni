/** @format */
import { Course } from '../../store/useCourseStore';
type CourseListProps = {
    courses: Course[];
    selectedCourse?: Course | null;
    onSelectCourse: (course: Course) => void;
};
declare const CourseList: ({ courses, selectedCourse, onSelectCourse, }: CourseListProps) => import("react/jsx-runtime").JSX.Element;
export default CourseList;
