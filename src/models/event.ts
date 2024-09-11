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
    selectIsTierOneDisabled: () =>
      slice((state: EventModelState): boolean => {
        const rsvpCount = state?.rsvps?.length || 0;
        const cutoff = state.event?.stripeUrl?.tierOneCutoff || 1000;
        return rsvpCount >= cutoff;
      }),
    selectIsTierTwoDisabled: () =>
      slice((state: EventModelState): boolean => {
        if (!state?.event) return false;
        const rsvpCount = state?.rsvps?.length || 0;
        const tierOneCutoff = state?.event?.stripeUrl?.tierOneCutoff || 60;
        const tierTwoCutoff = state?.event?.stripeUrl?.tierTwoCutoff || 160;
        const eventStartDate = new Date(state?.event?.startTime);
        const eventStartOfDay = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());
        const currentTime = new Date();
        const isDayOfEvent = currentTime >= eventStartOfDay && currentTime < new Date(eventStartOfDay.getTime() + 24 * 60 * 60 * 1000);
        if (isDayOfEvent && state?.event?.id !== 17) {
          return true;
        } else {
          if (rsvpCount < tierOneCutoff || rsvpCount >= tierTwoCutoff) {
            return true;
          } else {
            return false;
          }
        }
      }),
    selectIsTierThreeDisabled: () =>
      slice((state: EventModelState): boolean => {
        if (!state?.event) return false;
        const eventStartDate = new Date(state?.event?.startTime);
        const eventStartOfDay = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate());
        const currentTime = new Date();
        const isDayOfEvent = currentTime >= eventStartOfDay && currentTime < new Date(eventStartOfDay.getTime() + 24 * 60 * 60 * 1000);
        const rsvpCount = state?.rsvps?.length || 0;
        return !isDayOfEvent || rsvpCount < 150;
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
    async removeRsvp([rsvpId, eventId, userId]: [number, number, number]) {
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
        await axios.get(STRIPE_API_PREFIX + `/verify-session/${sessionId}/${userId}/${eventId}`);
        // console.log(receipt);
        // dispatch.eventModel.getEventById(eventId);
        // dispatch.userModel.updateUserDataById(userId);
      } catch (e) {
        console.log(e);
      }
    },
  }),
});
