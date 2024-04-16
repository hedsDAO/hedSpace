import axios from "axios";
import { APPLE_PASS_API_PREFIX, AUTH_API_PREFIX, GUEST_STATUS_API_PREFIX, USER_API_PREFIX, MANAGE_EVENTS_API_PREFIX } from "./constants";

export const getSMSCode = async (to: string): Promise<string> => {
  return axios.get(`${AUTH_API_PREFIX}/sms/send/${to}`);
};

export const verifySMSCode = (to: string, code: string) => {
  return axios.get(`${AUTH_API_PREFIX}/sms/verify/${to}/${code}`);
};

export const addUserRSVP = ({ userId, eventId, status }: { userId: number; eventId: number; status: string }) => {
  return axios.post(`${GUEST_STATUS_API_PREFIX}/events/${eventId}/rsvps`, {
    userId,
    status,
  });
};

export const removeUserRsvp = ({ rsvpId }: { rsvpId: number }) => {
  return axios.delete(`${GUEST_STATUS_API_PREFIX}/rsvps/${rsvpId}`);
};

export const addUserDisplayName = ({ userId, displayName }: { userId: number; displayName: string }) => {
  return axios.put(`${USER_API_PREFIX}/${userId}`, { displayName });
};

export const getEventByEventId = (eventId: string) => {
  return axios.get(`${MANAGE_EVENTS_API_PREFIX}/events/${eventId}`);
};

export const fetchApplePassDownload = ({ eventId, displayName }: { eventId: number; displayName: string }) => {
  return axios.get(`${APPLE_PASS_API_PREFIX}/generatePass/${eventId}/${displayName}`);
};
