"use client";

import { LayoutGroup, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  CHAT_COPY,
  CHAT_GREETING,
  type ChatVariant,
} from "./chat-content";
import { ChatTypingDots } from "./ChatTypingDots";

/** Figma 2367:37530 — sequential chat reveal */
const T_GREETING_MS = 1200;
const T_BODY_MS = 2600;

type ChatPhase = "leadTyping" | "greeting" | "complete";

type ChatBoxProps = {
  open: boolean;
  variant: ChatVariant;
  onClose: () => void;
};

const bubbleClass =
  "w-fit max-w-[85%] rounded-2xl bg-white p-4 text-sm font-normal text-black shadow-md";

const messageEnter = {
  initial: { opacity: 0, y: 10, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: {
    duration: 0.35,
    ease: [0.22, 1, 0.36, 1] as const,
    layout: { type: "spring" as const, stiffness: 400, damping: 32 },
  },
};

function ChatMessageBubble({
  children,
  className = "",
  busy = false,
  messageKey,
}: {
  children: ReactNode;
  className?: string;
  busy?: boolean;
  messageKey: string;
}) {
  return (
    <motion.div
      key={messageKey}
      layout
      initial={messageEnter.initial}
      animate={messageEnter.animate}
      transition={messageEnter.transition}
      className={`${bubbleClass} ${className}`}
      aria-busy={busy}
    >
      {children}
    </motion.div>
  );
}

export function ChatBox({ open, variant, onClose }: ChatBoxProps) {
  const [draft, setDraft] = useState("");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<ChatPhase>("leadTyping");
  const sequenceRef = useRef(0);
  const copy = CHAT_COPY[variant];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase("leadTyping");
      return;
    }

    const sequenceId = ++sequenceRef.current;
    setPhase("leadTyping");

    const isCurrent = () => sequenceRef.current === sequenceId;

    if (variant === "about") {
      const greetingTimer = window.setTimeout(() => {
        if (isCurrent()) setPhase("greeting");
      }, T_GREETING_MS);
      const bodyTimer = window.setTimeout(() => {
        if (isCurrent()) setPhase("complete");
      }, T_BODY_MS);
      return () => {
        window.clearTimeout(greetingTimer);
        window.clearTimeout(bodyTimer);
      };
    }

    const bodyTimer = window.setTimeout(() => {
      if (isCurrent()) setPhase("complete");
    }, T_BODY_MS);
    return () => window.clearTimeout(bodyTimer);
  }, [open, variant]);

  if (!open || !mounted) return null;

  const showLeadTyping = variant === "about" && phase === "leadTyping";
  const showGreeting =
    variant === "about" && (phase === "greeting" || phase === "complete");
  const showBodyTyping =
    (variant === "about" && phase === "greeting") ||
    (variant === "comingSoon" && phase !== "complete");
  const showBody = phase === "complete";

  return createPortal(
    <>
      <div className="chat-overlay-root">
        <div
          className="chat-overlay-frost backdrop-blur-[24px] backdrop-saturate-150"
          style={{ backdropFilter: "blur(24px) saturate(150%)" }}
          aria-hidden
        />
        <button
          type="button"
          aria-label="Dismiss chat overlay"
          onClick={onClose}
          className="chat-overlay-hit"
        />
      </div>
      <div
        role="dialog"
        aria-label="crcle chat"
        className="fixed top-1/2 left-1/2 z-50 flex h-[min(469px,59.5vh)] w-[min(351px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col gap-3 rounded-[24px] border border-white/10 bg-white/10 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        <div className="flex w-full items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex size-4 items-center justify-center"
            aria-label="Close chat"
          >
            <Image src="/landing/icon-close.svg" alt="" width={16} height={16} />
          </button>
        </div>

        <div className="sound-wave-bars mx-auto" aria-hidden>
          <span style={{ background: "#b1b1bc" }} />
          <span style={{ background: "#b1b1bc" }} />
          <span style={{ background: "#b1b1bc" }} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-9 overflow-hidden">
          <LayoutGroup>
            <motion.div
              layout
              className="mt-9 flex w-full flex-col items-start gap-3"
            >
              {showLeadTyping ? (
                <ChatMessageBubble messageKey="lead-typing" busy>
                  <ChatTypingDots />
                </ChatMessageBubble>
              ) : null}

              {showGreeting ? (
                <ChatMessageBubble messageKey="greeting">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {CHAT_GREETING}
                  </p>
                </ChatMessageBubble>
              ) : null}

              {showBodyTyping ? (
                <ChatMessageBubble messageKey="body-typing" busy>
                  <ChatTypingDots />
                </ChatMessageBubble>
              ) : null}

              {showBody ? (
                <ChatMessageBubble messageKey="body">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {copy.paragraph}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap font-medium leading-relaxed">
                    {copy.tagline}
                  </p>
                </ChatMessageBubble>
              ) : null}
            </motion.div>
          </LayoutGroup>
          <p className="mt-auto text-center text-[11px] leading-[1.4] text-[#b1b1bc]">
            End-to-end encrypted
          </p>
        </div>

        <form
          className="flex w-full items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            setDraft("");
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type a message..."
            className="h-9 min-w-0 flex-1 rounded-[18px] bg-[rgba(243,244,246,0.1)] px-4 text-base text-[#f7f6f2] outline-none placeholder:text-[#9ca3af]"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-3xl bg-[rgba(254,254,254,0.4)]"
            aria-label="Send"
          >
            <Image src="/landing/icon-send.svg" alt="" width={16} height={16} />
          </button>
        </form>
      </div>
    </>,
    document.body,
  );
}
