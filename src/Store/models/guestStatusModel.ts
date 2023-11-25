import { createModel } from "@rematch/core";
import {
  createEventRsvp,
  updateEventRsvp,
  deleteEventRsvp,
  addToEventWaitlist,
  removeFromEventWaitlist,
} from "@/Api/guestStatus";
import type { RootModel } from "@/Store/index";

export const guestStatusModel = createModel<RootModel>()({
  state: {
    error: null as string | null,
    isLoading: false,
    rsvps: [],
    waitlist: [],
  },
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
      event_id,
      user_id,
      status,
    }: {
      event_id: number;
      user_id: number;
      status: string;
    }) {
      this.setIsLoading(true);
      try {
        const response = await createEventRsvp(event_id, user_id, status);
        dispatch.eventModel.fetchEventById(event_id);
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
        dispatch.eventModel.fetchEventById(response.data.event_id);
      } catch (error: any) {
        this.setError(error.message || "Failed to update event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async deleteEvent({ id, eventId }: { id: number; eventId: number }) {
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
  }),
});
