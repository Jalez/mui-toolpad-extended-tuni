/** @format */

import { PlatformRole } from '../../../store/usePlatformStore';
import { departmentVariants, preferencesVariants } from './constants';
import { randomPersonFromApi, UserBackendData } from './types';

const getRandomUsersFromApi = async (
  amount: number
): Promise<randomPersonFromApi[]> => {
  //https://randomuser.me/api/
  const response = await fetch('https://randomuser.me/api/?results=' + amount);
  const data = await response.json();
  return data.results;
};

// Helper functions for generating mock data
function generateMockUser(
  id: number,
  roles: PlatformRole[],
  user: randomPersonFromApi
): UserBackendData {
  return {
    id: id.toString(),
    name: user.name.first + ' ' + user.name.last,
    email: user.email,
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2024-01-01T00:00:00.000Z',
    //Lets get an image from this person does not exist API
    image: {
      large: user.picture.large,
      medium: user.picture.medium,
      thumbnail: user.picture.thumbnail,
    },
    department: departmentVariants[id % departmentVariants.length],
    platform_roles: roles,
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
    preferences: {
      navigation_type: preferencesVariants[id % preferencesVariants.length],
      visible_course_lists: {
        is_student: true,
        is_student_old: false,
        is_teacher: true,
        is_teacher_old: false,
        available: true,
      },
      visible_navigation: [],
    },
  };
}

export async function generateUsers(config: {
  teacherCount: number;
  studentCount: number;
  adminCount: number;
}): Promise<UserBackendData[]> {
  const users: UserBackendData[] = [];
  let id = 1;
  const { teacherCount, studentCount, adminCount } = config;
  const randomUser = await getRandomUsersFromApi(
    teacherCount + studentCount + adminCount
  );

  let ii = 0;
  // Generate admins
  for (let i = 0; i < config.adminCount; i++) {
    users.push(generateMockUser(id++, ['admin'], randomUser[ii]));
    ii++;
  }

  // Generate teachers
  for (let i = 0; i < config.teacherCount; i++) {
    users.push(generateMockUser(id++, ['creator'], randomUser[ii]));
    ii++;
  }

  // Generate students
  for (let i = 0; i < config.studentCount; i++) {
    users.push(generateMockUser(id++, ['user'], randomUser[ii]));
    ii++;
  }

  return users;
}
