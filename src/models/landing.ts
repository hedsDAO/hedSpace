import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_ENDPOINT } from "@/store/constants";
import { CalendarItemProps, Event } from "@/store/types";
import { getCalendarInfo } from "@/store/utils";
import { createModel } from "@rematch/core";
import axios from "axios";

interface LandingModelState {
  events: Event[] | null;
  latestEvent: Event | null;
  calendar: CalendarItemProps[] | null;
}

export const landingModel = createModel<RootModel>()({
  state: {
    events: null,
    calendar: null,
    latestEvent: null,
  } as LandingModelState,
  reducers: {
    setEvents: (state: LandingModelState, events: any) => ({ ...state, events }),
    setCalendar: (state: LandingModelState, calendar: CalendarItemProps[]) => ({ ...state, calendar }),
    setLatestEvent: (state: LandingModelState, latestEvent: any) => ({ ...state, latestEvent }),
    clearState: () => ({ events: null, calendar: null, latestEvent: null }),
  },
  selectors: (slice) => ({
    selectEvents: () => slice((state: LandingModelState): Event[] | null => state?.events),
    selectLatestEvent: () => slice((state: LandingModelState): Event | null => state?.latestEvent),
    selectCalendar: () => slice((state: LandingModelState): CalendarItemProps[] | null => state?.calendar),
  }),
  effects: () => ({
    async getEvents() {
      const response = await axios.get(`${MANAGE_EVENTS_API_ENDPOINT}/events`);
      this.setEvents(response.data);
      const now = new Date().getTime();
      let difference = Math.abs(response.data[0].startTime - now);
      let latestEvent = null;
      for (let i = 0; i < response.data.length; i++) {
        const current = response.data[i].startTime - now;
        if (response?.data?.[i]?.startTime - now > 0 && current < difference) {
          difference = current;
          latestEvent = response.data[i];
        }
      }
      this.setLatestEvent(latestEvent);
      const calendarInfo = getCalendarInfo(response.data);
      this.setCalendar(calendarInfo);
    },
  }),
});
