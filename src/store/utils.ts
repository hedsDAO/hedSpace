import { DesktopCalendarItemProps, Event } from "./types";

export const getCalendarInfo = (events: Event[]): DesktopCalendarItemProps[] => {
  const options = { timeZone: "America/Los_Angeles" };
  const now = new Date(new Date().toLocaleString("en-US", options));
  now.setHours(0, 0, 0, 0);
  const currentDayOfWeek = now.getDay();

  const daysArray: DesktopCalendarItemProps[] = [];
  for (let i = 0; i < 21; i++) {
    const lastSunday = new Date(now);
    lastSunday.setDate(now.getDate() - currentDayOfWeek);
    const dayDate = new Date(lastSunday);
    dayDate.setDate(lastSunday.getDate() + i);
    dayDate.setHours(0, 0, 0, 0);
    const isToday = dayDate.getTime() === now.getTime();

    const day = {
      day: dayDate.getDate(),
      month: dayDate.getMonth() + 1,
      year: dayDate.getFullYear(),
      data: {
        isToday: isToday,
        event: null,
      },
    };
    daysArray.push(day);
  }

  for (let i = 0; i < daysArray.length; i++) {
    const event = events.find((event) => {
      const eventDate = new Date(event?.startTime);
      const eventDay = eventDate.getDate();
      const eventMonth = eventDate.getMonth() + 1;
      const eventYear = eventDate.getFullYear();
      if (daysArray[i].day === eventDay && daysArray[i].month + 1 === eventMonth && daysArray[i].year === eventYear) {
        return event;
      }
    });
    if (event) {
      daysArray[i].data.event = event;
    }
  }

  return daysArray;
};
