/** @format */
import { PlatformRole } from "../../../store/usePlatformStore";
import { navigationTypes } from "../../../store/useUserStore";
import { randomPerson } from "./constants";

export interface UserRawBackendData {
  name: string;
  email: string;
  image?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  department?: string;
  platform_roles: PlatformRole[];
  privacy_settings: {
    allow_analytics: boolean;
    allow_personalization: boolean;
    allow_communications: boolean;
    allow_third_party_sharing: boolean;
  };
  gdpr_consent: {
    accepted: boolean;
    accepted_date?: string;
    last_updated: string;
  };
  data_retention: {
    delete_account_after_inactivity?: number;
    delete_data_after_account_deletion?: number;
  };
  preferences: {
    navigation_type: navigationTypes;
    visible_course_lists: {
      is_student: boolean;
      is_student_old: boolean;
      is_teacher: boolean;
      is_teacher_old: boolean;
      available: boolean;
    };
    visible_navigation: string[];
    last_visited_courses: string[];
  };
}

export interface UserBackendData extends UserRawBackendData {
  id: string;
  created_at: string;
  updated_at: string;
}

export type UserCourseConnection = {
  userId: string;
  courseId: string;
  role: "teacher" | "student";
};

export type randomPersonFromApi = typeof randomPerson;
