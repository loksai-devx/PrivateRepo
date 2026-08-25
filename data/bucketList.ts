export interface BucketListItem {
  id: number;
  title: string;
  lines: string[];
  visual: "food" | "office" | "saree" | "road" | "cooking" | "birthday" | "varanasi" | "playful" | "google-coffee";
  isPlayful?: boolean;
  lockedLabel?: string;
  footerLines?: string[];
}

export const bucketListSection = {
  title: "OUR BUCKET LIST",
  subtitle: "Things we haven't done... yet.",
  transitionIn: {
    line1: "Promises are about what I'll do.",
    line2: "Bucket lists are about what we'll do.",
  },
  statusLocked: "NOT YET",
  statusUnlock: "ONE DAY...",
  statsLabel: { things: "THINGS", done: "DONE", toGo: "TO GO" },
  closing: {
    lines: [
      "Maybe we'll do all of these.",
      "Maybe we'll add a hundred more.",
      "That's the fun part.",
      "THE LIST ISN'T FINISHED YET.",
    ],
    button: "ADD ANOTHER MEMORY",
    buttonMessage: "Some memories haven't happened yet.",
  },
  bridge: {
    lines: [
      "Some promises are mine.",
      "Some dreams are ours.",
      "And one birthday message is still waiting.",
    ],
    button: "CONTINUE",
    href: "/letter",
  },
  items: [
    {
      id: 1,
      title: "LUNCH AT HYDERABAD CHEFS",
      lines: ["One proper food day. No rushing."],
      visual: "food",
    },
    {
      id: 2,
      title: "WAITING FOR YOU NEAR YOUR COMPANY",
      lines: [
        "One day I'll be standing outside your company...",
        "...just waiting to see your reaction.",
      ],
      visual: "office",
    },
    {
      id: 3,
      title: "SEEING YOU IN A KERALA SAREE",
      lines: [
        "One thing that's still on the list.",
        "Seeing Nanna in a beautiful Kerala saree.",
      ],
      visual: "saree",
    },
    {
      id: 4,
      title: "LONG DRIVE TO LONAVALA",
      lines: ["Good music.", "Long roads.", "Cool weather.", "And absolutely no hurry."],
      visual: "road",
    },
    {
      id: 5,
      title: "COOKING TOGETHER",
      lines: [
        "Let's see who actually knows how to cook.",
        "Or whether we'll just order food. 😂",
      ],
      visual: "cooking",
      isPlayful: true,
    },
    {
      id: 6,
      title: "SURPRISE YOU ON YOUR BIRTHDAY — IN PERSON",
      lines: [
        "One birthday.",
        "One surprise.",
        "And hopefully one very confused Nanna.",
      ],
      visual: "birthday",
    },
    {
      id: 7,
      title: "TRIP TO VARANASI",
      lines: ["One day.", "One trip.", "One unforgettable memory."],
      visual: "varanasi",
    },
    {
      id: 8,
      title: "THE UNEXPECTED ONE 😂",
      lines: ["If you ever say yes...", "Maybe I'll marry you. 😂"],
      visual: "playful",
      isPlayful: true,
    },
    {
      id: 9,
      title: "COFFEE DATE AT GOOGLE ☕",
      lines: [
        "One day...",
        "A coffee date at Google.",
        "Google office + coffee + endless conversations.",
        "Let's see if we can make this one happen. 😂",
      ],
      visual: "google-coffee",
      isPlayful: true,
      lockedLabel: "LOCKED",
      footerLines: [
        "Until then...",
        "Coffee somewhere else will have to do. 😂",
      ],
    },
  ] satisfies BucketListItem[],
};
