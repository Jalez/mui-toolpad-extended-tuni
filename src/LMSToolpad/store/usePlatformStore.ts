/** @format */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Layouts } from "react-grid-layout";
import { homePresetLayouts } from "../components/Common/GridLayout/presetLayouts";

export interface AuthSettings {
  allowedAuthMethods: ("local" | "google" | "microsoft" | "shibboleth")[];
  minimumPasswordLength: number;
  requireEmailVerification: boolean;
  allowSelfRegistration: boolean;
  defaultUserRole: PlatformRole;
}

export type PlatformRole =
  | "admin"
  | "developer"
  | "moderator"
  | "creator"
  | "user"
  | "guest";

export type visibilityMode = "public" | "enrolled" | "private";

export interface CourseSettings {
  courseCreation: {
    // Now uses platform roles instead of course roles
    requiredRoles: PlatformRole[]; // e.g., ['creator', 'admin']
    requireApproval: boolean;
  };
  defaultCourseVisibility: visibilityMode;
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
  // Updated: agentConfigurations now has an 'assigned' property.
  agentConfigurations: {
    agent: "openai" | "anthropic" | "local" | string;
    assigned: string[];
    apiKey?: string;
    modelName?: string;
    apiUrl?: string; // new: endpoint for requests
  }[];
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
  admins: {
    emails: string[];
    invitePending: string[];
  };
  privacy: {
    gdprEnabled: boolean;
    dataRetentionPeriod: number; // in days
    defaultPrivacySettings: {
      allowAnalytics: boolean;
      allowPersonalization: boolean;
      allowCommunications: boolean;
      allowThirdPartySharing: boolean;
    };
    privacyPolicy: {
      url: string;
      lastUpdated: string;
      version: string;
    };
    cookieSettings: {
      necessary: boolean;
      functional: boolean;
      analytics: boolean;
      advertising: boolean;
      expiryDays: number;
    };
    dataProcessingAgreements: {
      thirdParties: {
        name: string;
        purpose: string;
        dataShared: string[];
        location: string;
      }[];
    };
  };
  interface: {
    layout: Layouts;
  };
}

interface PlatformSettingsStore {
  platform: Platform;
  platformToUpdate: Platform | null;
  updatePlatform: (newPlatform: Platform) => void;
  updateAISettings: (newAISettings: Partial<AISettings>) => void;
  resetToDefaults: () => void;
  // Remove toggleResizeMode
}

const DEFAULT_SETTINGS: Platform = {
  name: "LMS Platform",
  description: "AI-Enhanced Learning Management System",
  contactEmail: "admin@example.com",
  supportUrl: "https://support.example.com",
  darkMode: {
    enabled: false,
    default: false,
  },
  auth: {
    allowedAuthMethods: ["local", "google"],
    minimumPasswordLength: 8,
    requireEmailVerification: true,
    allowSelfRegistration: true,
    defaultUserRole: "user",
  },
  courses: {
    courseCreation: {
      requiredRoles: ["admin", "creator"],
      requireApproval: true,
    },
    defaultCourseVisibility: "enrolled",
    defaultEnrollmentDuration: 180,
    courseCategories: ["Computer Science", "Mathematics", "Physics"],
  },
  ai: {
    enabled: true,
    providers: {
      openai: {
        enabled: true,
        modelName: "gpt-4",
        maxTokens: 2000,
        temperature: 0.7,
      },
      anthropic: {
        enabled: false,
        modelName: "claude-2",
      },
      local: {
        enabled: false,
        endpoint: "http://localhost:3000/ai",
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
    agentConfigurations: [], // default empty array for multiple agent setups
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
    message: "System is under maintenance",
  },
  storage: {
    maxFileSize: 50,
    allowedFileTypes: [".pdf", ".doc", ".docx", ".jpg", ".png"],
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
  admins: {
    emails: ["admin@example.com"],
    invitePending: [],
  },
  privacy: {
    gdprEnabled: true,
    dataRetentionPeriod: 365,
    defaultPrivacySettings: {
      allowAnalytics: false,
      allowPersonalization: false,
      allowCommunications: false,
      allowThirdPartySharing: false,
    },
    privacyPolicy: {
      url: "https://example.com/privacy",
      lastUpdated: new Date().toISOString(),
      version: "1.0.0",
    },
    cookieSettings: {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false,
      expiryDays: 365,
    },
    dataProcessingAgreements: {
      thirdParties: [],
    },
  },
  interface: {
    layout: homePresetLayouts.default,
  },
};

export const usePlatformStore = create<PlatformSettingsStore>()(
  persist(
    (set, get) => ({
      platform: DEFAULT_SETTINGS,
      platformToUpdate: null,
      updatePlatform: (newSettings) => {
        const current = get().platform;
        // Only update if there are actual changes
        if (JSON.stringify(current) !== JSON.stringify(newSettings)) {
          set({ platform: newSettings });
        }
      },
      updateAISettings: (newAISettings) => {
        const current = get().platform;
        set({
          platform: {
            ...current,
            ai: { ...current.ai, ...newAISettings },
          },
        });
      },
      resetToDefaults: () => set({ platform: DEFAULT_SETTINGS }),
    }),
    {
      name: "platform-settings",
      version: 1,
    }
  )
);
