export type ChatVariant = "about" | "comingSoon";

export const CHAT_GREETING = "Hi, we are crcle";

export const CHAT_COPY: Record<
  ChatVariant,
  { paragraph: string; tagline: string }
> = {
  about: {
    paragraph:
      "crcle is built for active intent. We create purposeful, real-world discovery — bringing culture, people, products and communities together in one connected world.",
    tagline: "Where real recognises real.",
  },
  comingSoon: {
    paragraph:
      "A new lens on Gen Z culture—the people shaping it and the stories worth sharing.",
    tagline: "Where real recognizes real.",
  },
};
