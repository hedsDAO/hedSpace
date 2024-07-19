import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_PREFIX, GUEST_STATUS_API_PREFIX, STRIPE_API_PREFIX } from "@/store/constants";
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
    selectIsDisabled: () =>
      slice((state: EventModelState): boolean => {
        const rsvpCount = state?.rsvps?.length || 0;
        return rsvpCount > 5;
      }),
  }),
  effects: (dispatch) => ({
    async getEventByName(name: string) {
      if (!name) return;
      try {
        const res = await axios.get(MANAGE_EVENTS_API_PREFIX + `/events/${name}`);
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
    async getEventById(eventId: number) {
      if (!eventId) return;
      try {
        const res = await axios.get(`${MANAGE_EVENTS_API_PREFIX}/event-id/${eventId}`);
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
    async removeRsvp([rsvpId, eventId, userId, eventName]: [number, number, number, string]) {
      try {
        await axios.delete(GUEST_STATUS_API_PREFIX + `/rsvps/${rsvpId}`);
        this.getEventById(eventId.toString());
        await dispatch.userModel.updateUserDataById(userId);
      } catch (e) {
        console.log(e);
      }
    },
    async verifyPayment([sessionId, userId, eventId]: [string, number, number]) {
      try {
        console.log({
          sessionId,
          userId,
          eventId,
        });
        await axios.get(STRIPE_API_PREFIX + `/verify-session/${sessionId}/${userId}/${eventId}`);
        dispatch.eventModel.getEventById(eventId);
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
