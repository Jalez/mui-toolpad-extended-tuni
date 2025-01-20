/** @format */

export type UserRawBackendData = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'guest' | 'admin';
  enrollment_status?: {
    status: 'enrolled' | 'pending' | 'rejected';
    date: string;
  };
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
};

export type UserCourseConnection = {
  userId: string;
  courseId: string;
  role: 'teacher' | 'student';
};

// Helper functions for generating mock data
function generateMockUser(
  id: number,
  role: 'student' | 'teacher' | 'guest' | 'admin' = 'student'
): UserRawBackendData {
  return {
    id: id.toString(),
    name: `${role.charAt(0).toUpperCase() + role.slice(1)} ${id}`,
    email: `${role}.${id}@edu.com`,
    role,
    enrollment_status: {
      status: 'enrolled',
      date: new Date().toISOString(),
    },
    privacy_settings: {
      allow_analytics: false,
      allow_personalization: false,
      allow_communications: true,
      allow_third_party_sharing: false,
    },
    gdpr_consent: {
      accepted: true,
      accepted_date: '2024-01-01T00:00:00.000Z',
      last_updated: '2024-01-01T00:00:00.000Z',
    },
    data_retention: {
      delete_account_after_inactivity: 365,
      delete_data_after_account_deletion: 30,
    },
  };
}

function generateUsers(config: {
  teacherCount: number;
  studentCount: number;
  adminCount: number;
}): UserRawBackendData[] {
  const users: UserRawBackendData[] = [];
  let id = 1;

  // Generate admins
  for (let i = 0; i < config.adminCount; i++) {
    users.push(generateMockUser(id++, 'admin'));
  }

  // Generate teachers
  for (let i = 0; i < config.teacherCount; i++) {
    users.push(generateMockUser(id++, 'teacher'));
  }

  // Generate students
  for (let i = 0; i < config.studentCount; i++) {
    users.push(generateMockUser(id++, 'student'));
  }

  return users;
}

function generateUserCourseConnections(
  users: UserRawBackendData[],
  courseIds: string[],
  config: {
    minStudentsPerCourse: number;
    maxStudentsPerCourse: number;
    teachersPerCourse: number;
  }
): UserCourseConnection[] {
  const connections: UserCourseConnection[] = [];
  const teachers = users.filter((user) => user.role === 'teacher');
  const students = users.filter((user) => user.role === 'student');

  courseIds.forEach((courseId) => {
    // Assign teachers
    const courseTeachers = teachers
      .slice(0, config.teachersPerCourse)
      .map((teacher) => ({
        userId: teacher.id,
        courseId,
        role: 'teacher' as const,
      }));

    // Randomly assign students
    const studentCount = Math.floor(
      Math.random() *
        (config.maxStudentsPerCourse - config.minStudentsPerCourse + 1) +
        config.minStudentsPerCourse
    );

    const courseStudents = students
      .sort(() => Math.random() - 0.5)
      .slice(0, studentCount)
      .map((student) => ({
        userId: student.id,
        courseId,
        role: 'student' as const,
      }));

    connections.push(...courseTeachers, ...courseStudents);
  });

  return connections;
}

// Generate mock data
export const basicUsersDataResponse = generateUsers({
  teacherCount: 5,
  studentCount: 50,
  adminCount: 2,
});

export const basicUserCourseConnections = generateUserCourseConnections(
  basicUsersDataResponse,
  ['1', '2', '3'], // Course IDs
  {
    minStudentsPerCourse: 15,
    maxStudentsPerCourse: 30,
    teachersPerCourse: 2,
  }
);

// Keep the existing getUserRole function
export function getUserRole(
  userId: string,
  courseId: string
): 'student' | 'teacher' | undefined {
  const connection = basicUserCourseConnections.find(
    (ucc) => ucc.userId === userId && ucc.courseId === courseId
  );
  return connection?.role;
}
