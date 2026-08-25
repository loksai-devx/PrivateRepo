import type { Memory } from "@/types";

export const keyDates = {
  firstSeenInCollege: "January 24, 2026",
  firstTrainMeet: "March 09, 2026",
} as const;

export const trainMemories: Memory[] = [
  {
    id: "train-1",
    title: "First conversation.",
    date: keyDates.firstTrainMeet,
    text: "Somewhere between one station and another, we started talking. No plan. No script. Just words passing between strangers who didn't know they'd become friends.",
  },
  {
    id: "train-2",
    title: "The window seat.",
    date: keyDates.firstTrainMeet,
    text: "Rain on the glass. Lights passing by. A conversation that felt easier than it should have.",
  },
  {
    id: "train-3",
    title: "After the train.",
    text: "Funny how some stories don't begin with a plan. They begin with a moment — and you decide to keep going.",
  },
];

export const linkedinMemory = {
  title: "CONNECTED",
  name: "Sai Priya",
  message: "Who knew a connection could become a friendship?",
  subtext: "One random connection.",
};

export const storyBeats = [
  { id: "linkedin", label: "LINKEDIN", text: "One random connection." },
  {
    id: "college",
    label: "COLLEGE",
    text: "First seen in college.",
    date: keyDates.firstSeenInCollege,
  },
  {
    id: "train",
    label: "TRAIN",
    text: "Our first conversation.",
    date: keyDates.firstTrainMeet,
  },
  { id: "after", label: "...", text: "Funny how some stories don't begin with a plan." },
];

export const secretTrainMemory =
  "Sometimes I think about that train ride — how ordinary it seemed, and how much it changed.";

export const secretMoonMessage =
  "You shine quietly. Like moonlight on rain.";

export const secretCoffeeMessage =
  "If we ever have coffee again, I'm ordering yours first.";

export const secretPurpleMessage =
  "Purple suits you. Not because of fashion — because of who you are.";

export const finalEasterEggMessage =
  "There's one more thing I wanted to say: I'm really glad LinkedIn brought us together. And I'm really glad you got on that train.";
