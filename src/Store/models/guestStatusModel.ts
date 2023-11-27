import { createModel } from "@rematch/core";
import {
  createEventRsvp,
  updateEventRsvp,
  deleteEventRsvp,
  addToEventWaitlist,
  removeFromEventWaitlist,
} from "@/Api/guestStatus";
import type { RootModel } from "@/Store/index";
import { EventRsvp, EventWaitlistGuest } from "../types";

interface GuestStatusState {
  error: string | null;
  isLoading: boolean;
  rsvps?: EventRsvp[];
  waitlist?: EventWaitlistGuest[];
}

export const guestStatusModel = createModel<RootModel>()({
  state: {
    error: null,
    isLoading: false,
    rsvps: [],
    waitlist: [],
  } as GuestStatusState,
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: string) => ({ ...state, error }),
    setRsvps: (state, rsvps) => {
      return { ...state, rsvps };
    },
    setWaitlist: (state, waitlist) => {
      return { ...state, waitlist };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    rsvps: () => slice((state) => state.rsvps),
    waitlist: () => slice((state) => state.waitlist),
  }),
  effects: (dispatch) => ({
    async createRsvp({
      eventId,
      userId,
      status,
    }: {
      eventId: number;
      userId: number;
      status: string;
    }) {
      this.setIsLoading(true);
      try {
        await createEventRsvp(eventId, userId, status);
        dispatch.eventModel.fetchEventById(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to create event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async updateRsvp({ id, status }: { id: number; status: string }) {
      this.setIsLoading(true);
      try {
        const response = await updateEventRsvp(id, status);
        dispatch.eventModel.fetchEventById(response.data.eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to update event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async deleteRsvp({ id, eventId }: { id: number; eventId: number }) {
      this.setIsLoading(true);
      try {
        await deleteEventRsvp(id);
        dispatch.eventModel.fetchEventById(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to delete event");
      } finally {
        this.setIsLoading(false);
      }
    },
    async addToWaitlist({
      eventId,
      userId,
      position,
    }: {
      eventId: number;
      userId: number;
      position: number;
    }) {
      this.setIsLoading(true);
      try {
        await addToEventWaitlist(eventId, userId, position);
        dispatch.eventModel.fetchEventById(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to add to waitlist");
      } finally {
        this.setIsLoading(false);
      }
    },
    async removeFromWaitlist({ id, eventId }: { id: number; eventId: number }) {
      this.setIsLoading(true);
      try {
        await removeFromEventWaitlist(id);
        dispatch.eventModel.fetchEventById(eventId);
      } catch (error: any) {
        this.setError(error.message || "Failed to remove from waitlist");
      } finally {
        this.setIsLoading(false);
      }
    },
  }),
});
