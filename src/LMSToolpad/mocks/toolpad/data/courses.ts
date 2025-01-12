/** @format */

export type CourseBackendData = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  code: string;
  instance: string;
  lti_login_url?: string;
  services?: string[];
};

export type CourseRawBackendData = {
  title: string;
  description: string;
  code: string;
  instance: string;
  lti_login_url?: string;
  services?: string[];
};

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
  },
];
