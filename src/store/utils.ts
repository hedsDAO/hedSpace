import { CalendarItemProps, Event } from "./types";

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(month: number, year: number): number {
  if (month === 1) {
    // February
    return isLeapYear(year) ? 29 : 28;
  } else if ([3, 5, 8, 10].includes(month)) {
    // April, June, September, November
    return 30;
  } else {
    return 31; // January, March, May, July, August, October, December
  }
}

function createCalendarItem(dayDate: Date, events: Event[], now: Date): CalendarItemProps {
  const isToday =
    dayDate.getFullYear() === now.getFullYear() &&
    dayDate.getMonth() === now.getMonth() &&
    dayDate.getDate() === now.getDate();
  return {
    day: dayDate.getDate(),
    month: dayDate.getMonth(),
    year: dayDate.getFullYear(),
    data: {
      isToday,
      event:
        events.find((event) => {
          const eventDate = new Date(event.startTime);
          return (
            eventDate.getFullYear() === dayDate.getFullYear() &&
            eventDate.getMonth() === dayDate.getMonth() &&
            eventDate.getDate() === dayDate.getDate() - 1
          );
        }) || null,
    },
  };
}

export const getCalendarInfo = (events: Event[]): CalendarItemProps[][] => {
  const now = new Date();
  const currentYear = now.getFullYear();
  now.setHours(0, 0, 0, 0);

  const calendarYear: CalendarItemProps[][] = [];

  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(currentYear, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const prevMonthDisplayDays = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    const daysInThisMonth = daysInMonth(month, currentYear);
    const calendarMonth: CalendarItemProps[] = [];

    // Days from previous month
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = daysInMonth(prevMonth, prevMonthYear) - prevMonthDisplayDays + 1;

    for (let day = prevMonthDays; day <= daysInMonth(prevMonth, prevMonthYear); day++) {
      const dayDate = new Date(prevMonthYear, prevMonth, day);
      calendarMonth.push(createCalendarItem(dayDate, events, now));
    }

    // Current month days
    for (let day = 1; day <= daysInThisMonth; day++) {
      const dayDate = new Date(currentYear, month, day);
      calendarMonth.push(createCalendarItem(dayDate, events, now));
    }

    // Days from next month
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? currentYear + 1 : currentYear;
    // Adjust the number of days needed from next month to not exceed 35 items total
    const totalDaysNeeded = 35 - calendarMonth.length;

    for (let day = 1; day <= totalDaysNeeded; day++) {
      const dayDate = new Date(nextMonthYear, nextMonth, day);
      calendarMonth.push(createCalendarItem(dayDate, events, now));
    }

    calendarYear.push(calendarMonth);
  }

  return calendarYear;
};
