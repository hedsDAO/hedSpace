import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_PREFIX, TWILIO_API_PREFIX } from "@/store/constants";
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
      const response = await axios.get(`${MANAGE_EVENTS_API_PREFIX}/events`);
      if (response.data) this.setEvents(response.data);
    },
    // async sendTextToAll(message: string) {
    //   try {
    //     await axios.post(`${TWILIO_API_PREFIX}/sendMassTextBlast`, {
    //       message,
    //       // Add mediaUrl to the request body if you want to include an image in the text blast (MUST BE JPG)
    //       mediaUrl: "https://sand-ox-5244.twil.io/assets/POTATO_FLYER_WRAP_PARTY.jpg",
    //     });
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async sendTextToAllForEvent([eventId, message]: [number, string]) {
    //   try {
    //     const response = await axios.post(`${TWILIO_API_PREFIX}/sendTextBlastForEvent`, {
    //       eventId: eventId,
    //       message: message,
    //       // Add mediaUrl to the request body if you want to include an image in the text blast (MUST BE JPG)
    //       mediaUrl: "https://www.heds.space/event/Beach-House",
    //     });
    //     if (response) console.log(response.data);
    //     this.clearState();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
  }),
});
