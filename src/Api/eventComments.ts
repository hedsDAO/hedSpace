import axios, { AxiosResponse } from "axios";
import { EVENT_COMMENTS_API_PREFIX } from "@/Store/constants";

/**
 * Fetch all comments for a specific event.
 * @param {number} eventId - The ID of the event.
 * @returns {Promise<AxiosResponse>} Axios response promise with the list of comments.
 */
export const fetchEventComments = (eventId: number): Promise<AxiosResponse> => {
  return axios.get(`${EVENT_COMMENTS_API_PREFIX}/events/${eventId}/comments`);
};

/**
 * Fetch a single comment by its ID.
 * @param {number} id - The ID of the comment to retrieve.
 * @returns {Promise<AxiosResponse>} Axios response promise with the comment details.
 */
export const fetchCommentById = (id: number): Promise<AxiosResponse> => {
  return axios.get(`${EVENT_COMMENTS_API_PREFIX}/comments/${id}`);
};

/**
 * Create a new comment for an event.
 * @param {number} eventId - The ID of the event.
 * @param {number} userId - The ID of the user making the comment.
 * @param {string} comment - The content of the comment.
 * @returns {Promise<AxiosResponse>} Axios response promise with the created comment.
 */
export const createEventComment = (
  eventId: number,
  userId: number,
  comment: string
): Promise<AxiosResponse> => {
  return axios.post(`${EVENT_COMMENTS_API_PREFIX}/events/${eventId}/comments`, {
    userId,
    userComment: comment,
  });
};

/**
 * Update an existing comment.
 * @param {number} id - The ID of the comment to update.
 * @param {string} comment - The new content of the comment.
 * @returns {Promise<AxiosResponse>} Axios response promise with the updated comment.
 */
export const updateEventComment = (
  id: number,
  comment: string
): Promise<AxiosResponse> => {
  return axios.put(`${EVENT_COMMENTS_API_PREFIX}/comments/${id}`, { comment });
};

/**
 * Delete a comment.
 * @param {number} id - The ID of the comment to delete.
 * @returns {Promise<AxiosResponse>} Axios response promise with the deletion result.
 */
export const deleteEventComment = (id: number): Promise<AxiosResponse> => {
  return axios.delete(`${EVENT_COMMENTS_API_PREFIX}/comments/${id}`);
};
