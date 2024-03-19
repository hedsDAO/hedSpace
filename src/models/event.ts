import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_ENDPOINT, GUEST_STATUS_API_PREFIX } from "@/store/constants";
import { Event, EventRsvp } from "@/store/types";
import { createModel } from "@rematch/core";
import axios from "axios";

interface EventModelState {
  event: Event | null;
  rsvps: EventRsvp[] | null;
  
}

export const eventModel = createModel<RootModel>()({
  state: {
    event: null,
  } as EventModelState,
  reducers: {
    setEvent: (state: EventModelState, event: Event) => ({ ...state, event }),
    setRSVPs: (state: EventModelState, rsvps: EventRsvp[]) => ({ ...state, rsvps }),
    clearState: () => ({ event: null, rsvps: null }),
  },
  selectors: (slice) => ({
    selectEvent: () => slice((state: EventModelState): Event | null => state?.event),
    selectRSVPs: () => slice((state: EventModelState): EventRsvp[] | null => state?.rsvps),
  }),
  effects: () => ({
    async getEventById(id: string) {
      if (!id) return;
      try {
        const res = await axios.get(MANAGE_EVENTS_API_ENDPOINT + `/events/${id}`);
        const data = res.data;
        if (data) {
          this.setEvent(data);
          if (data?.eventRsvps) {
            this.setRSVPs(data?.eventRsvps);
          }
        }
      } catch (e) {
        console.log(e);
        this.setEvent(null);
      }
    },
  }),
});
