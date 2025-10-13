import { Theme } from "@mui/material";
import { EventContentArg } from "@fullcalendar/core";
import { CalendarEventType } from "./CalendarEventItem";

export interface EventViewProps {
  eventInfo: EventContentArg;
  courseCode: string;
  type: CalendarEventType;
  courseColor: string;
  location?: string;
  requiresRegistration?: boolean;
  recurring?: boolean;
  eventTypeIcons: Record<CalendarEventType, string>;
  theme: Theme;
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
  type: CalendarEventType;
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
  type: CalendarEventType;
  eventTypeIcons: Record<CalendarEventType, string>;
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
