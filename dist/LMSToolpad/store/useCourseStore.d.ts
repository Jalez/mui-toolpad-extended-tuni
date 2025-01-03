/** @format */
export interface Course {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    ltiLoginUrl: string;
    updatedAt: string;
}
export interface CourseRaw {
    title: string;
    description: string;
}
declare const useCourseStore: any;
export default useCourseStore;
