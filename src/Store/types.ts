export type Event = {
  id?: number;
  name: string;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
  image: string;
  userId: number;
  createdAt: number;
  updatedAt?: number;
  maxGuests?: number;
  eventComments?: EventComment;
  eventRsvps?: EventRsvp[];
  eventWaitlist?: EventWaitlistGuest[];
};

export type EventComment = {
  id: number;
  eventId: number;
  userId: number;
  comment: string;
  createdAt: number;
  updatedAt?: number;
};

export type EventRsvp = {
  id: number;
  eventId: number;
  userId: number;
  status: string;
  createdAt: number;
  updatedAt?: number;
};

export type EventWaitlistGuest = {
  id: number;
  eventId: number;
  userId: number;
  position: number;
  createdAt: number;
  updatedAt?: number;
};
