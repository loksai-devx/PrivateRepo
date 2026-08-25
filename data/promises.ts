export interface PromiseItem {
  id: number;
  text: string;
  isSpecial?: boolean;
  specialTitle?: string;
  specialNote?: string;
}

export const promisesSection = {
  title: "MY PROMISES",
  subtitle: "Some things are easier to promise than to explain.",
  transitionIn: "Some stories become promises.",
  unlockButton: "UNLOCK PROMISE",
  openButton: "OPEN",
  confirmPrompt: "Are you sure you want to open this?",
  keptLabel: "Promise kept.",
  closing: {
    lines: [
      "Nine promises.",
      "But promises mean nothing without actions.",
      "I'll let time prove them.",
    ],
    signoff: "— Your Bestie",
  },
  items: [
    { id: 1, text: "I won't cheat on you." },
    { id: 2, text: "I won't leave you." },
    { id: 3, text: "I'll always be there for you as your best friend." },
    { id: 4, text: "I'll support you, no matter what." },
    { id: 5, text: "I'll never intentionally let you fall." },
    {
      id: 6,
      text: "I promise I'll crack a product-based company by 2028.",
      isSpecial: true,
      specialTitle: "ONE PROMISE TO MYSELF",
      specialNote: "Not just a promise to you.\nA promise to myself.",
    },
    { id: 7, text: "I'll never cheat on any woman." },
    { id: 8, text: "I'll never play with anyone's emotions." },
    { id: 9, text: "I'll stay single until you find the person you want to marry." },
  ] satisfies PromiseItem[],
};
