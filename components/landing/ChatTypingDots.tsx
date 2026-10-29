"use client";

import { motion } from "framer-motion";

const dotTransition = {
  duration: 0.55,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export function ChatTypingDots() {
  return (
    <div className="flex min-h-[20px] items-center gap-[5px] px-1 py-0.5" aria-hidden>
      {[0, 0.15, 0.3].map((delay, index) => (
        <motion.span
          key={index}
          className="block size-[7px] rounded-full bg-[#676874]"
          animate={{ y: [0, -4, 0] }}
          transition={{ ...dotTransition, delay }}
        />
      ))}
    </div>
  );
}
