/** @format */


export type UserRawBackendData = {
  id: string;
  name: string;
  email: string;
  role?: string;
};



export const basicUsersDataResponse: UserRawBackendData[] = [
  {
    id: '1',
    name: 'Test User 1',
    email: 'test.user1@com',
  },
  {
    id: '2',
    name: 'Test User 2',
    email: 'test.user2@com',
  },
  {
    id: '3',
    name: 'Test User 3',
    email: 'test.user3@com',
  },
  {
    id: '4',
    name: 'Test User 4',
    email: 'test.user4@com',
  },
  {
    id: '5',
    name: 'Test User 5',
    email: 'test.user5@com',
  },
  {
    id: '6',
    name: 'Test User 6',
    email: 'test.user6@com',
  },
  {
    id: '7',
    name: 'Test User 7',
    email: 'test.user7@com',
  },
  {
    id: '8',
    name: 'Test User 8',
    email: 'test.user8@com',
  },
  {
    id: '9',
    name: 'Test User 9',
    email: 'test.user9@com',
  },
  {
    id: '10',
    name: 'Test User 10',
    email: 'test.user10@com',
  },
  {
    id: '11',
    name: 'Test User 11',
    email: 'test.user11@com',
  },
  {
    id: '12',
    name: 'Test User 12',
    email: 'test.user12@com',
  },
  {
    id: '13',
    name: 'Test User 13',
    email: 'test.user13@com',
  },
  {
    id: '14',
    name: 'Test User 14',
    email: 'test.user14@com',
  },
  {
    id: '15',
    name: 'Test User 15',
    email: 'test.user15@com',
  },
  {
    id: '16',
    name: 'Test User 16',
    email: 'test.user16@com',
  },
  {
    id: '17',
    name: 'Test User 17',
    email: 'test.user17@com',
  },
  {
    id: '18',
    name: 'Test User 18',
    email: 'test.user18@com',
  },
  {
    id: '19',
    name: 'Test User 19',
    email: 'test.user19@com',
  },
  {
    id: '20',
    name: 'Test User 20',
    email: 'test.user20@com',
  },
  {
    id: '21',
    name: 'Test User 21',
    email: 'test.user21@com',
  },
];

//Connections between users and courses: users can be teachers or students in courses, and courses can have multiple users as teachers or students

export type UserCourseConnection = {
  userId: string;
  courseId: string;
  role: 'teacher' | 'student';
};

export const basicUserCourseConnections: UserCourseConnection[] = [
  {
    userId: '1',
    courseId: '1',
    role: 'teacher',
  },
  {
    userId: '2',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '3',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '4',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '5',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '6',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '7',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '8',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '9',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '10',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '11',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '12',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '13',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '14',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '15',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '16',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '17',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '18',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '19',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '20',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '21',
    courseId: '1',
    role: 'student',
  },
  {
    userId: '1',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '2',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '3',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '4',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '5',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '6',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '7',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '8',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '9',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '10',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '11',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '12',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '13',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '14',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '15',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '16',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '17',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '18',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '19',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '20',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '21',
    courseId: '2',
    role: 'student',
  },
  {
    userId: '1',
    courseId: '3',
    role: 'student',
  },
  {
    userId: '2',
    courseId: '3',
    role: 'teacher',
  },
];

export function getUserRole(
  userId: string,
  courseId: string
): 'student' | 'teacher' | undefined {
  const connection = basicUserCourseConnections.find(
    (ucc) => ucc.userId === userId && ucc.courseId === courseId
  );
  return connection?.role;
}
