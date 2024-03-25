export const AS_VIDEO = "video";

export const FADE_TRANSITIONS_UTIL = (index: number) => ({
  enter: {
    duration: 0.5,
    delay: index + 1 * 0.5,
  },
  exit: {
    duration: 0.35,
    delay: 0.1,
  },
});
