import type { BirthdayConfig } from "@/types";
import { days } from "./days";
import { JOURNEY_SONG_COUNT } from "./songs";

export const birthdayConfig: BirthdayConfig = {
  startDate: "2026-08-26T00:00:00+05:30",
  birthdayDate: "2026-09-26T00:00:00+05:30",
  timezone: "Asia/Kolkata",
  journeyDays: JOURNEY_SONG_COUNT,
  qualityDays: 30,
  days,
};
