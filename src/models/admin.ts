import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_ENDPOINT } from "@/store/constants";
import { Event } from "@/store/types";
import { createModel } from "@rematch/core";
import axios from "axios";

export enum AdminStep {
  TEXT_BLAST_FOR_EVENT = 0,
  TEXT_BLAST_FOR_ALL = 1,
}

interface AdminModelState {
  events: Event[] | null;
  step: AdminStep | null;
  selectedEvent: Event | null;
  message: string;
}

export const adminModel = createModel<RootModel>()({
  state: {
    events: null,
    step: null,
    selectedEvent: null,
    message: "",
  } as AdminModelState,
  reducers: {
    setEvents: (state: AdminModelState, events: Event[]) => ({ ...state, events }),
    setAdminStep: (state: AdminModelState, step: AdminStep) => ({ ...state, step }),
    setMessage: (state: AdminModelState, message: string) => ({ ...state, message }),
    setSelectedEvent: (state: AdminModelState, selectedEvent: Event) => ({ ...state, selectedEvent }),
    clearState: () => ({ events: null, step: null, selectedEvent: null, message: "" }),
  },
  selectors: (slice) => ({
    selectEvents: () => slice((state: AdminModelState): Event[] | null => state?.events),
    selectAdminStep: () => slice((state: AdminModelState): AdminStep | null => state?.step),
    selectSelectedEvent: () => slice((state: AdminModelState): Event | null => state?.selectedEvent),
    selectMessage: () => slice((state: AdminModelState): string => state?.message),
  }),
  effects: () => ({
    async getAllEvents() {
      const response = await axios.get(`${MANAGE_EVENTS_API_ENDPOINT}/events`);
      if (response.data) this.setEvents(response.data);
    },
  }),
});
