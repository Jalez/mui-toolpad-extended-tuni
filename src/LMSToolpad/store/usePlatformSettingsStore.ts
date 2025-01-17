/** @format */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AuthSettings {
  allowedAuthMethods: ('local' | 'google' | 'microsoft' | 'shibboleth')[];
  minimumPasswordLength: number;
  requireEmailVerification: boolean;
  allowSelfRegistration: boolean;
  defaultUserRole: 'student' | 'guest';
}

export interface CourseSettings {
  whoCanCreateCourses: ('admin' | 'teacher')[];
  defaultCourseVisibility: 'public' | 'enrolled' | 'private';
  maxCoursesPerTeacher: number;
  requireCourseApproval: boolean;
  defaultEnrollmentDuration: number; // in days
  courseCategories: string[];
}

export interface AISettings {
  enabled: boolean;
  providers: {
    openai: {
      enabled: boolean;
      apiKey?: string;
      modelName: string;
      maxTokens: number;
      temperature: number;
    };
    anthropic: {
      enabled: boolean;
      apiKey?: string;
      modelName: string;
    };
    local: {
      enabled: boolean;
      endpoint: string;
    };
  };
  features: {
    autoGrading: boolean;
    plagiarismDetection: boolean;
    contentGeneration: boolean;
    studentAssistant: boolean;
    teacherAssistant: boolean;
  };
  moderationSettings: {
    enabled: boolean;
    filterProfanity: boolean;
    filterSensitiveContent: boolean;
    maxQueriesPerHour: number;
  };
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smtpSettings?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export interface Platform {
  name: string;
  description: string;
  contactEmail: string;
  supportUrl: string;
  darkMode: {
    enabled: boolean;
    default: boolean;
  };
  auth: AuthSettings;
  courses: CourseSettings;
  ai: AISettings;
  notifications: NotificationSettings;
  analytics: {
    enabled: boolean;
    provider?: string;
    trackingId?: string;
  };
  maintenance: {
    enabled: boolean;
    message: string;
  };
  storage: {
    maxFileSize: number; // in MB
    allowedFileTypes: string[];
    totalStorageLimit: number; // in GB
  };
  features: {
    forums: boolean;
    wiki: boolean;
    chat: boolean;
    videoConference: boolean;
    peerReview: boolean;
    gamification: boolean;
  };
}

interface PlatformSettingsStore {
  platform: PlatformSettings;
  platformToUpdate: PlatformSettings | null;
  updatePlatform: (newPlatform: PlatformSettings) => void;
  updateAISettings: (newAISettings: Partial<AISettings>) => void;
  resetToDefaults: () => void;
}

const DEFAULT_SETTINGS: PlatformSettings = {
  name: 'LMS Platform',
  description: 'AI-Enhanced Learning Management System',
  contactEmail: 'admin@example.com',
  supportUrl: 'https://support.example.com',
  darkMode: {
    enabled: false,
    default: false,
  },
  auth: {
    allowedAuthMethods: ['local', 'google'],
    minimumPasswordLength: 8,
    requireEmailVerification: true,
    allowSelfRegistration: true,
    defaultUserRole: 'student',
  },
  courses: {
    whoCanCreateCourses: ['admin', 'teacher'],
    defaultCourseVisibility: 'enrolled',
    maxCoursesPerTeacher: 10,
    requireCourseApproval: true,
    defaultEnrollmentDuration: 180,
    courseCategories: ['Computer Science', 'Mathematics', 'Physics'],
  },
  ai: {
    enabled: true,
    providers: {
      openai: {
        enabled: true,
        modelName: 'gpt-4',
        maxTokens: 2000,
        temperature: 0.7,
      },
      anthropic: {
        enabled: false,
        modelName: 'claude-2',
      },
      local: {
        enabled: false,
        endpoint: 'http://localhost:3000/ai',
      },
    },
    features: {
      autoGrading: true,
      plagiarismDetection: true,
      contentGeneration: true,
      studentAssistant: true,
      teacherAssistant: true,
    },
    moderationSettings: {
      enabled: true,
      filterProfanity: true,
      filterSensitiveContent: true,
      maxQueriesPerHour: 100,
    },
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
  },
  analytics: {
    enabled: false,
  },
  maintenance: {
    enabled: false,
    message: 'System is under maintenance',
  },
  storage: {
    maxFileSize: 50,
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.jpg', '.png'],
    totalStorageLimit: 100,
  },
  features: {
    forums: true,
    wiki: true,
    chat: true,
    videoConference: true,
    peerReview: true,
    gamification: true,
  },
};

export const usePlatformSettingsStore = create<PlatformSettingsStore>()(
  persist(
    (set) => ({
      platform: DEFAULT_SETTINGS,
      platformToUpdate: null,
      updatePlatform: (newSettings) =>
        set(() => ({
          platform: newSettings,
        })),
      updateAISettings: (newAISettings) =>
        set((state) => ({
          platform: {
            ...state.platform,
            ai: { ...state.platform.ai, ...newAISettings },
          },
        })),
      resetToDefaults: () => set({ platform: DEFAULT_SETTINGS }),
    }),
    {
      name: 'platform-settings',
    }
  )
);
