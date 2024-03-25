import { Event } from "@/store/types";
import { DateTime } from "luxon";

export const FADE_TRANSITIONS_1 = {
  enter: {
    duration: 0.5,
    delay: 0.85,
  },
  exit: {
    duration: 0.35,
    delay: 0.1,
  },
};

export const FADE_TRANSITIONS_2 = {
  enter: {
    duration: 0.5,
    delay: 1.15,
  },
  exit: {
    duration: 0.35,
    delay: 0.1,
  },
};

export const handleDateDetails = (event?: Event | null) => (event?.startTime ? DateTime.fromMillis(event?.startTime).toFormat("D").replaceAll("/", ".") : "");
