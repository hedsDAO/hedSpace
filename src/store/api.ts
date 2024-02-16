import axios from "axios";
import { AUTH_API_ENDPOINT, GUEST_STATUS_API_PREFIX, USER_API_PREFIX } from "./constants";

export const getSMSCode = async (to: string): Promise<string> => {
  return axios.get(`${AUTH_API_ENDPOINT}/sms/send/${to}`);
};

export const verifySMSCode = (to: string, code: string) => {
  return axios.get(`${AUTH_API_ENDPOINT}/sms/verify/${to}/${code}`);
};

export const addUserRSVP = ({ userId, eventId, status }: { userId: number; eventId: number; status: string }) => {
  return axios.post(`${GUEST_STATUS_API_PREFIX}/events/${eventId}/rsvps`, {
    userId,
    status,
  });
};

export const addUserDisplayName = ({ userId, displayName }: { userId: number; displayName: string }) => {
  return axios.put(`${USER_API_PREFIX}/${userId}`, { displayName });
};
