import { Theme } from "@mui/material";
import { EventContentArg } from "@fullcalendar/core";
import { courseEventType } from "../store/useCourseStore";

export interface EventViewProps {
  eventInfo: EventContentArg;
  courseCode: string;
  type: courseEventType;
  courseColor: string;
  location?: string;
  requiresRegistration?: boolean;
  recurring?: boolean;
  eventTypeIcons: Record<courseEventType, string>;
  theme: Theme;
  config: any;
  subject: string;
  courseTitle?: string;
  maxParticipants?: number;
  description?: string;
  teachers?: any[];
}

export interface EventDetailsProps {
  description?: string;
  location?: string;
  courseColor: string;
  maxParticipants?: number;
  requiresRegistration?: boolean;
  teachers?: any[];
  type: courseEventType;
  subject: string;
  recurring?: boolean;
  onAddToCalendar: (e: React.MouseEvent) => void;
  onRegister: (e: React.MouseEvent) => void;
  theme: Theme;
}

export interface EventMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  eventInfo: EventContentArg;
  courseColor: string;
  type: courseEventType;
  eventTypeIcons: Record<courseEventType, string>;
  config: any;
  subject: string;
  courseTitle: string;
  courseCode: string;
  description?: string;
  location?: string;
  maxParticipants?: number;
  requiresRegistration?: boolean;
  teachers?: any[];
  recurring?: boolean;
  theme: Theme;
}
