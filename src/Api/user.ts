import axios, { AxiosResponse } from "axios";
import { AUTH_API_URL, GUEST_STATUS_API_PREFIX, USER_API_PREFIX } from "@/Store/constants";

export const getSMSCode = async (to: string): Promise<string> => {
    return axios.get(`${AUTH_API_URL}/sms/send/${to}`);
  };


export const verifySMSCode = (to: string, code: string, name: string) => {
  return axios.get(`${AUTH_API_URL}/sms/verify/${to}/${code}/${name}`);
};

export const addUserRSVP = ({userId, eventId, status}: {userId: number, eventId: number, status: string}) => {
  return axios.post(`${GUEST_STATUS_API_PREFIX}/events/${eventId}/rsvps`, {userId, status});
};

export const addUserDisplayName = ({userId, displayName}: {userId: number, displayName: string}) => {
  return axios.put(`${USER_API_PREFIX}/${userId}`, {displayName});
}