import axios, { AxiosResponse } from "axios";
import { MANGAGE_EVENT_API_PREFIX } from "../Store/constants";

/**
 * Fetch all events.
 * @returns {Promise<AxiosResponse>} Axios response promise with the list of events.
 */
export const fetchEvents = (): Promise<AxiosResponse> => {
  return axios.get(`${MANGAGE_EVENT_API_PREFIX}/events`);
};

/**
 * Fetch a single event by ID.
 * @param {number} id - The ID of the event to retrieve.
 * @returns {Promise<AxiosResponse>} Axios response promise with the event details.
 */
export const fetchEventById = (id: number): Promise<AxiosResponse> => {
  return axios.get(`${MANGAGE_EVENT_API_PREFIX}/events/${id}`);
};

/**
 * Create a new event.
 * @param {object} eventData - The data for the new event.
 * @returns {Promise<AxiosResponse>} Axios response promise with the created event.
 */
export const createEvent = (eventData: object): Promise<AxiosResponse> => {
  return axios.post(`${MANGAGE_EVENT_API_PREFIX}/events`, eventData);
};

/**
 * Update an existing event.
 * @param {number} id - The ID of the event to update.
 * @param {object} eventData - The new data for the event.
 * @returns {Promise<AxiosResponse>} Axios response promise with the updated event.
 */
export const updateEvent = (
  id: number,
  eventData: object
): Promise<AxiosResponse> => {
  return axios.put(`${MANGAGE_EVENT_API_PREFIX}/events/${id}`, eventData);
};

/**
 * Delete an event.
 * @param {number} id - The ID of the event to delete.
 * @returns {Promise<AxiosResponse>} Axios response promise with the deletion result.
 */
export const deleteEvent = (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${MANGAGE_EVENT_API_PREFIX}/events/${id}`);
};
