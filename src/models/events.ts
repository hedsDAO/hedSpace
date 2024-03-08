import type { RootModel } from "@/store";
import { createModel } from "@rematch/core";
import { MANAGE_EVENTS_API_ENDPOINT } from "@/store/constants";
import { getCalendarInfo } from "@/store/utils";
import axios from "axios";
import { CalendarItemProps, Event } from "@/store/types";

interface EventsModelState {
  currentMonth: number;
  currentDay: number;
  events: Event[] | null;
  calendar: CalendarItemProps[][] | null;
  mobileSelectedEvent: Event | null;
}

export const eventsModel = createModel<RootModel>()({
  state: {
    currentMonth: new Date().getMonth(),
    currentDay: new Date().getDate(),
  } as EventsModelState,
  reducers: {
    setCurrentMonth: (state, currentMonth: number) => ({ ...state, currentMonth }),
    setCurrentDay: (state, currentDay: number) => ({ ...state, currentDay }),
    setEvents: (state, events: Event[]) => ({ ...state, events }),
    setCalendar: (state, calendar: CalendarItemProps[][]) => ({ ...state, calendar }),
    setMobileSelectedEvent: (state, mobileSelectedEvent: Event | null) => ({ ...state, mobileSelectedEvent }),
    clearState: () => ({
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),
      events: null,
      calendar: null,
      mobileSelectedEvent: null,
    }),
  },
  selectors: (slice) => ({
    selectCurrentMonth: () => slice((state: EventsModelState) => state.currentMonth),
    selectCurrentDay: () => slice((state: EventsModelState) => state.currentDay),
    selectEvents: () => slice((state: EventsModelState) => state.events),
    selectCalendar: () => slice((state: EventsModelState) => state.calendar),
    selectMobileSelectedEvent: () => slice((state: EventsModelState) => state.mobileSelectedEvent),
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
