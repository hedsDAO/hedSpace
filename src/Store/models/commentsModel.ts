import { createModel } from "@rematch/core";
import {
  createEventComment,
  deleteEventComment,
  fetchEventComments,
  fetchCommentById,
  updateEventComment,
} from "@/Api/eventComments";
import type { RootModel } from "@/Store/index";
import { EventComment } from "../types";

interface CommentsState {
  error: string | null;
  isLoading: boolean;
  allComments?: EventComment[];
  newComment?: EventComment;
  selectedComment?: EventComment;
}

export const commentsModel = createModel<RootModel>()({
  state: {
    error: null,
    isLoading: false,
    allComments: [],
    newComment: undefined,
    selectedComment: undefined,
  } as CommentsState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: string) => ({ ...state, error }),
    setAllComments: (state, allComments) => {
      return { ...state, allComments };
    },
    setNewComment: (state, newComment) => {
      return { ...state, newComment };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    allComments: () => slice((state) => state.allComments),
    newComment: () => slice((state) => state.newComment),
    selectedComment: () => slice((state) => state.selectedComment),
  }),
  effects: (dispatch) => ({
    async fetchComments(id: number) {
      this.setIsLoading(true);
      try {
        const response = await fetchEventComments(id);
        this.setAllComments(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to fetch events");
      } finally {
        this.setIsLoading(false);
      }
    },
    async fetchCommentById(id: number) {
      this.setIsLoading(true);
      try {
        const response = await fetchCommentById(id);
        this.setSelectedComment(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to fetch event details");
      } finally {
        this.setIsLoading(false);
      }
    },
    async createNewComment({
      eventId,
      userId,
      comment,
    }: {
      eventId: number;
      userId: number;
      comment: string;
    }) {
      this.setIsLoading(true);
      try {
        await createEventComment(eventId, userId, comment);
        this.fetchComments(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to create event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async updateComment({
      id,
      eventId,
      comment,
    }: {
      id: number;
      eventId: number;
      comment: string;
    }) {
      this.setIsLoading(true);
      try {
        await updateEventComment(id, comment);
        this.fetchComments(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to update event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async deleteComment({ id, eventId }: { id: number; eventId: number }) {
      this.setIsLoading(true);
      try {
        await deleteEventComment(id);
        this.fetchComments(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to delete event");
      } finally {
        this.setIsLoading(false);
      }
    },
  }),
});
