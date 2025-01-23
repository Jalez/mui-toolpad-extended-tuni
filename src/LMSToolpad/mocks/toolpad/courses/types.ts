/** @format */

import {
  courseEventFrequency,
  courseLevel,
  courseRelationType,
  enrollmentStatus,
  legalBasis,
  visibilityMode,
} from '../../../store/useCourseStore';

import { courseEventType, courseRole } from '../../../store/useCourseStore';

export interface CourseEventBackendData {
  id: string;
  type: courseEventType;
  title: string;
  description?: string;
  start_time: string;
  end_time?: string;
  location?: string;
  teachers?: CourseEnrollmentBackendData[];
  recurring?: {
    frequency: courseEventFrequency;
    until: string;
    exceptions?: string[];
  };
  max_participants?: number;
  requires_registration?: boolean;
}

export interface CourseEnrollmentBackendData {
  user_id: string;
  role: courseRole;
  status: enrollmentStatus;
  enrollment_date?: string;
  request_date?: string;
}

export interface CourseRelationBackendData {
  code: string;
  type: courseRelationType;
  description?: string;
  required?: boolean;
}

export type CourseRawBackendData = {
  title: string;
  description: string;
  code: string;
  instance: string;
  lti_login_url?: string;
  services?: string[];
  image?: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  start_date: string | null;
  end_date: string | null;
  visibility: {
    mode: visibilityMode;
    start_date: string | null;
    end_date: string | null;
  };
  events: {
    [key in courseEventType]: CourseEventBackendData[];
  };
  tags?: string[];
  language?: string;
  data_processing: {
    purposes: string[];
    retention: number;
    third_party_processors: {
      name: string;
      purpose: string;
      data_shared: string[];
    }[];
    special_categories: boolean;
    legal_basis: legalBasis;
  };
  enrollment: {
    start_date: string | null;
    end_date: string | null;
    status: {
      open: boolean;
      max_students?: number;
    };
  };
  relationships?: {
    prerequisites: CourseRelationBackendData[];
    continuations: CourseRelationBackendData[];
    alternatives: CourseRelationBackendData[];
    related: CourseRelationBackendData[];
  };
  study_module?: {
    name: string;
    order?: number;
    credits: number;
    level: courseLevel;
  };
};

export interface CourseBackendData extends CourseRawBackendData {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface CourseBackendDataWithEnrollments extends CourseBackendData {
  data: {
    my_data?: {
      role: courseRole;
      status: enrollmentStatus;
    };
    enrollment_data?: CourseEnrollmentBackendData[];
  };
}

export interface CourseEnrollmentBackendData {
  user_id: string;
  course_id: string;
  name: string;
  email: string;
  role: courseRole;
  status: enrollmentStatus;
}
