"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const logoParts = [
  { id: "c1", src: "/landing/logo/vector-c.svg", className: "absolute inset-[20.62%_75.75%_0.33%_0]" },
  { id: "r", src: "/landing/logo/vector-r1.svg", className: "absolute inset-[20.93%_59.33%_0.75%_27.25%]" },
  { id: "c2", src: "/landing/logo/vector-c2.svg", className: "absolute inset-[20.93%_35.54%_0.01%_40.21%]" },
  { id: "e", src: "/landing/logo/vector-c3.svg", className: "absolute inset-[0_29.33%_0.74%_67.06%]" },
  { id: "l", src: "/landing/logo/vector-l.svg", className: "absolute inset-[20.93%_0_0.01%_73.97%]" },
] as const;

/** Type order: c → r → c → l → e (left-to-right word) */
const TYPEWRITER_ORDER = [0, 1, 2, 4, 3] as const;

/** Trailing cursor position after each typed character (% from left of wordmark box) */
const CURSOR_LEFT_PERCENT = [4, 26, 40, 58, 78, 92] as const;

const CHAR_INTERVAL_MS = 115;
const CURSOR_FADE_MS = 480;

export function CrcleLogo() {
  const [typedCount, setTypedCount] = useState(0);
  const [cursorPhase, setCursorPhase] = useState<"typing" | "hold" | "fade" | "hidden">(
    "typing",
  );
  const [reduceMotion, setReduceMotion] = useState(false);

  const totalLetters = TYPEWRITER_ORDER.length;
  const typingComplete = typedCount >= totalLetters;

  const revealedPartIndices = useMemo(() => {
    if (reduceMotion) return new Set(logoParts.map((_, i) => i));
    return new Set(TYPEWRITER_ORDER.slice(0, typedCount));
  }, [reduceMotion, typedCount]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setTypedCount(totalLetters);
      setCursorPhase("hidden");
      return;
    }

    if (typedCount >= totalLetters) return;

    const timer = window.setTimeout(() => {
      setTypedCount((count) => count + 1);
    }, typedCount === 0 ? 280 : CHAR_INTERVAL_MS);

    return () => window.clearTimeout(timer);
  }, [reduceMotion, totalLetters, typedCount]);

  useEffect(() => {
    if (reduceMotion || !typingComplete) return;

    setCursorPhase("hold");
    const fadeStart = window.setTimeout(() => {
      setCursorPhase("fade");
    }, 380);

    const hide = window.setTimeout(() => {
      setCursorPhase("hidden");
    }, 380 + CURSOR_FADE_MS);

    return () => {
      window.clearTimeout(fadeStart);
      window.clearTimeout(hide);
    };
  }, [reduceMotion, typingComplete]);

  const showCursor = !reduceMotion && cursorPhase !== "hidden";
  const cursorLeft = CURSOR_LEFT_PERCENT[Math.min(typedCount, CURSOR_LEFT_PERCENT.length - 1)];

  return (
    <div
      className="relative h-[29px] w-[84px] shrink-0 sm:h-[33px] sm:w-[97px]"
      aria-label="crcle"
    >
      {logoParts.map((part, index) => {
        const visible = revealedPartIndices.has(index);
        return (
          <div
            key={part.id}
            className={`${part.className} transition-opacity duration-200 ease-out ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={!visible}
          >
            <Image
              src={part.src}
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 639px) 84px, 97px"
              priority
            />
          </div>
        );
      })}

      {showCursor ? (
        <span
          className={`crcle-logo-typewriter-cursor pointer-events-none absolute top-[8%] bottom-[8%] w-[1.5px] rounded-full bg-[#F7F6F2] ${
            cursorPhase === "typing" || cursorPhase === "hold"
              ? "crcle-logo-typewriter-cursor--blink"
              : ""
          } ${cursorPhase === "fade" ? "crcle-logo-typewriter-cursor--fade-out" : ""}`}
          style={{ left: `${cursorLeft}%` }}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
