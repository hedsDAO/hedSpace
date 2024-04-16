import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_PREFIX, GUEST_STATUS_API_PREFIX } from "@/store/constants";
import { Event, EventRsvp } from "@/store/types";
import { createModel } from "@rematch/core";
import axios from "axios";

interface EventModelState {
  event: Event | null;
  rsvps: EventRsvp[] | null;
  isLoading: boolean;
}

export const eventModel = createModel<RootModel>()({
  state: {
    event: null,
    rsvps: null,
    isLoading: false,
  } as EventModelState,
  reducers: {
    setEvent: (state: EventModelState, event: Event) => ({ ...state, event }),
    setRSVPs: (state: EventModelState, rsvps: EventRsvp[]) => ({ ...state, rsvps }),
    setIsLoading: (state: EventModelState, isLoading: boolean) => ({ ...state, isLoading }),
    clearState: () => ({ event: null, rsvps: null, isLoading: false }),
  },
  selectors: (slice) => ({
    selectEvent: () => slice((state: EventModelState): Event | null => state?.event),
    selectRSVPs: () => slice((state: EventModelState): EventRsvp[] | null => state?.rsvps),
    selectIsLoading: () => slice((state: EventModelState): boolean => state?.isLoading),
  }),
  effects: (dispatch) => ({
    async getEventById(id: string) {
      if (!id) return;
      try {
        const res = await axios.get(MANAGE_EVENTS_API_PREFIX + `/events/${id}`);
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
    async removeRsvp([rsvpId, eventId, userId]: [number, number, number]) {
      try {
        await axios.delete(GUEST_STATUS_API_PREFIX + `/rsvps/${rsvpId}`);
        await this.getEventById(eventId.toString());
        await dispatch.userModel.updateUserDataById(userId);
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
