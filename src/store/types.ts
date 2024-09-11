export interface CalendarItemProps {
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
  video: string;
  userId: number;
  createdAt: number;
  updatedAt: null;
  maxGuests: number;
  passInstructions: string;
  stripImage: string;
  stripeUrl: StripeUrl;
  eventComments: EventCommentElement[];
  eventRsvps: EventCommentElement[];
  eventWaitlists: any[];
}

export interface StripeUrl {
  tierOne: string;
  tierTwo: string;
  tierThree: string;
  tierOneCutoff?: number;
  tierTwoCutoff?: number;
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
  users: User;
}

export interface User {
  id: number;
  profilePicture: string;
  banner: string;
  twitterHandle: null;
  badges: null;
  description: null;
  displayName: string;
  role: string;
  wallet: null;
  joined: number;
  spotlight: null;
  collection: null;
  email: null;
  phoneNumber: string;
  avatarImage: string;
  eventRsvps: EventRsvp[];
}
