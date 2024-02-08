import type { RootModel } from "@/store";
import { MANAGE_EVENTS_API_ENDPOINT } from "@/store/constants";
import { DesktopCalendarItemProps, Event } from "@/store/types";
import { getCalendarInfo } from "@/store/utils";
import { createModel } from "@rematch/core";
import axios from "axios";

interface LandingModelState {
  events: any;
  calendar: DesktopCalendarItemProps[] | null;
}

export const landingModel = createModel<RootModel>()({
  state: {
    events: null,
    calendar: null,
  } as LandingModelState,
  reducers: {
    setEvents: (state: LandingModelState, events: any) => ({ ...state, events }),
    setCalendar: (state: LandingModelState, calendar: DesktopCalendarItemProps[]) => ({ ...state, calendar }),
    clearState: () => ({ events: null, calendar: null }),
  },
  selectors: (slice) => ({
    selectEvents: () => slice((state: LandingModelState): Event[] => state?.events),
    selectCalendar: () => slice((state: LandingModelState): DesktopCalendarItemProps[] | null => state?.calendar),
  }),
  effects: () => ({
    async getEvents() {
      const response = await axios.get(`${MANAGE_EVENTS_API_ENDPOINT}/events`);
      this.setEvents(response.data);
      const calendarInfo = getCalendarInfo(response.data);
      this.setCalendar(calendarInfo);
    },
  }),
});
