import { createModel } from "@rematch/core";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  fetchEventById,
  updateEvent,
} from "@/Api/manageEvents";
import type { RootModel } from "@/Store/index";

export const eventModel = createModel<RootModel>()({
  state: {
    error: null as string | null,
    isLoading: false,
    allEvents: [],
    selectedEvent: {},
  },
  reducers: {
    setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
    setError: (state, error: string) => ({ ...state, error }),
    setAllEvents: (state, allEvents) => {
      return { ...state, allEvents };
    },
    setSelectedEvent: (state, event) => {
      return { ...state, event };
    },
  },
  selectors: (slice) => ({
    error: () => slice((state) => state.error),
    isLoading: () => slice((state) => state.isLoading),
    allEvents: () => slice((state) => state.allEvents),
    selectedEvent: () => slice((state) => state.selectedEvent),
  }),
  effects: (dispatch) => ({
    async fetchEvents() {
      this.setIsLoading(true);
      try {
        const response = await fetchEvents();
        this.setAllEvents(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to fetch events");
      } finally {
        this.setIsLoading(false);
      }
    },
    async fetchEventById(id: number) {
      this.setIsLoading(true);
      try {
        const response = await fetchEventById(id);
        this.setSelectedEvent(response.data);
        dispatch.commentsModel.setAllComments(response.data.event_comments);
        dispatch.guestStatusModel.setRsvps(response.data.event_rsvps);
        dispatch.guestStatusModel.setWaitlist(response.data.event_waitlist);
      } catch (error: any) {
        this.setError(error.message || "Failed to fetch event details");
      } finally {
        this.setIsLoading(false);
      }
    },
    async createEvent(eventData: object) {
      this.setIsLoading(true);
      try {
        const response = await createEvent(eventData);
        this.setSelectedEvent(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to create event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async updateEvent({ id, eventData }: { id: number; eventData: object }) {
      this.setIsLoading(true);
      try {
        const response = await updateEvent(id, eventData);
        this.setSelectedEvent(response.data);
      } catch (error: any) {
        this.setError(error.message || "Failed to update event");
      } finally {
        this.setIsLoading(false);
      }
    },

    async deleteEvent(id: number) {
      this.setIsLoading(true);
      try {
        await deleteEvent(id);
        this.fetchEvents();
      } catch (error: any) {
        this.setError(error.message || "Failed to delete event");
      } finally {
        this.setIsLoading(false);
      }
    },
  }),
});
