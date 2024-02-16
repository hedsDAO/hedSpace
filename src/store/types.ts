export interface DesktopCalendarItemProps {
  day: number;
  month: number;
  year: number;
  data: {
    isToday: boolean;
    event: Event | null;
  };
}

export interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  image: string;
  userId: number;
  createdAt: number;
  updatedAt: null;
  maxGuests: number;
  eventComments: EventCommentElement[];
  eventRsvps: EventCommentElement[];
  eventWaitlists: any[];
}

export interface EventCommentElement {
  id: number;
  eventId: number;
  userId: number;
  comment?: string;
  createdAt: number | null;
  updatedAt: number | null;
  status?: string;
}

export interface EventRsvp {
  id: number;
  eventId: number;
  userId: number;
  status: string;
  createdAt: number;
  updatedAt: number;
  isNew: boolean;
}

