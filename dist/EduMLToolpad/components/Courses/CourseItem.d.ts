/** @format */
import { Course } from '../../store/useCourseStore';
type CourseItemProps = {
    course: Course;
    isSelected: boolean;
    onSelect: (course: Course) => void;
};
declare const CourseItem: ({ course, isSelected, onSelect }: CourseItemProps) => import("react/jsx-runtime").JSX.Element;
export default CourseItem;
