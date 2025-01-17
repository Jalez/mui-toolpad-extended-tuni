/** @format */

export type CourseRawBackendData = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  code: string;
  instance: string;
  lti_login_url?: string;
  services?: string[];
  image?: string;
  staff?: string[];
  visibility: {
    mode: 'public' | 'enrolled' | 'private';
    start_date?: string;
    end_date?: string;
  };
  enrollment_status: {
    open: boolean;
    start_date?: string;
    end_date?: string;
    max_students?: number;
  };
  tags?: string[];
  language?: string;
  status: 'draft' | 'active' | 'archived';
};

export interface CourseBackendData extends CourseRawBackendData {
  id: string;
  created_at: string;
  updated_at: string;
}

export const basicCourses: CourseBackendData[] = [
  {
    id: '1',
    title: 'Test Course',
    description: 'This is a test course',
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString(),
    code: 'COMP.CS.140',
    instance: 'spring-2024',
    lti_login_url: 'https://example.com/lti/1',
    services: ['edutest'],
    staff: ['teacher1', 'teacher2'],
    visibility: {
      mode: 'public',
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z',
    },
    enrollment_status: {
      open: true,
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z',
      max_students: 100,
    },
    tags: ['programming', 'beginner'],
    language: 'en',
    status: 'active',
  },
  {
    id: '2',
    title: 'Another Course',
    description: 'This is another test course',
    //Make sure this was created in 2024
    created_at: new Date('2024-01-01').toISOString(),
    //Make sure this was updated in 2024
    updated_at: new Date('2024-01-01').toISOString(),
    code: 'COMP.CS.300',
    instance: 'fall-2024',
    lti_login_url: 'https://example.com/lti/2',
    services: ['edutest'],
    staff: ['teacher1', 'teacher2'],
    visibility: {
      mode: 'public',
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z',
    },
    enrollment_status: {
      open: true,
      start_date: '2024-01-01T00:00:00Z',
      end_date: '2024-12-31T23:59:59Z',
      max_students: 100,
    },
    tags: ['programming', 'beginner'],
    language: 'en',
    status: 'active',
  },
  {
    id: '3',
    title: 'Another Course',
    description: 'This is yet another test course',
    created_at: new Date('2025-01-01').toISOString(),
    updated_at: new Date('2025-01-01').toISOString(),
    code: 'COMP.CS.300',
    instance: 'spring-2025',
    lti_login_url: 'https://example.com/lti/3',
    services: [],
    staff: ['teacher1', 'teacher2'],
    visibility: {
      mode: 'public',
      start_date: '2025-01-01T00:00:00Z',
      end_date: '2025-12-31T23:59:59Z',
    },
    enrollment_status: {
      open: true,
      start_date: '2025-01-01T00:00:00Z',
      end_date: '2025-12-31T23:59:59Z',
      max_students: 100,
    },
    tags: ['programming', 'beginner'],
    language: 'en',
    status: 'active',
  },
];
