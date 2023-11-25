import axios, { AxiosResponse } from "axios";
import { GUEST_STATUS_API_PREFIX } from "@/Store/constants";

/**
 * Create a new RSVP for an event.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user who is RSVPing.
 * @param status - The RSVP status.
 * @returns {Promise<AxiosResponse>} Axios response promise with the created RSVP.
 */
export const createEventRsvp = (
  eventId: number,
  userId: number,
  status: string
): Promise<AxiosResponse> => {
  return axios.post(`${GUEST_STATUS_API_PREFIX}/events/${eventId}/rsvps`, {
    userId,
    status,
  });
};

/**
 * Update an existing RSVP.
 * @param id - The ID of the RSVP to update.
 * @param status - The new status of the RSVP.
 * @returns {Promise<AxiosResponse>} Axios response promise with the updated RSVP.
 */
export const updateEventRsvp = (
  id: number,
  status: string
): Promise<AxiosResponse> => {
  return axios.put(`${GUEST_STATUS_API_PREFIX}/rsvps/${id}`, { status });
};

/**
 * Delete an RSVP.
 * @param id - The ID of the RSVP to delete.
 * @returns {Promise<AxiosResponse>} Axios response promise with the deletion result.
 */
export const deleteEventRsvp = (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${GUEST_STATUS_API_PREFIX}/rsvps/${id}`);
};

/**
 * Add a user to an event's waitlist.
 * @param eventId - The ID of the event.
 * @param userId - The ID of the user to add to the waitlist.
 * @param position - The position in the waitlist.
 * @returns {Promise<AxiosResponse>} Axios response promise with the created waitlist entry.
 */
export const addToEventWaitlist = (
  eventId: number,
  userId: number,
  position: number
): Promise<AxiosResponse> => {
  return axios.post(`${GUEST_STATUS_API_PREFIX}/events/${eventId}/waitlist`, {
    userId,
    position,
  });
};

/**
 * Remove a user from the waitlist.
 * @param id - The ID of the waitlist entry to delete.
 * @returns {Promise<AxiosResponse>} Axios response promise with the removal result.
 */
export const removeFromEventWaitlist = (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${GUEST_STATUS_API_PREFIX}/waitlist/${id}`);
};
