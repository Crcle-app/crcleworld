"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const rowSpring = { type: "spring" as const, stiffness: 350, damping: 28 };

const ROW_HEIGHT_DEFAULT = 62;
const ROW_HEIGHT_HOVER = 125;
const ROW_HEIGHT_COLLAPSED = 52;

type MenuRowProps = {
  label: string;
  index: number;
  totalRows: number;
  isHovered: boolean;
  isCollapsedSibling: boolean;
  opensChat: boolean;
  isComingSoon: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpenChat?: () => void;
  externalHref?: string;
  onExternalLink?: () => void;
};

export function MenuRow({
  label,
  index,
  totalRows,
  isHovered,
  isCollapsedSibling,
  opensChat,
  isComingSoon,
  onHoverStart,
  onHoverEnd,
  onOpenChat,
  externalHref,
  onExternalLink,
}: MenuRowProps) {
  const [pressed, setPressed] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const sync = () => setIsMobileMenu(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const isExternalLink = Boolean(externalHref);
  const isActive = isHovered || pressed;
  const showLock = isComingSoon && isActive;
  const isClickable = opensChat || isExternalLink;

  const handleActivate = () => {
    if (opensChat) onOpenChat?.();
  };

  const divider =
    index < totalRows - 1
      ? "max-sm:border-r max-sm:border-b-0 sm:border-b sm:border-r-0 border-white/10"
      : "";

  const rowClassName = [
    "relative z-[1] flex min-w-0 items-center justify-center overflow-hidden no-underline",
    "max-sm:min-h-[62px] max-sm:flex-1 max-sm:basis-0 max-sm:px-2 max-sm:py-3",
    "sm:w-full sm:justify-start sm:px-7 sm:py-0",
    isActive ? "border-white/20 bg-white/10" : "border-transparent",
    divider,
    isClickable || isComingSoon ? "cursor-pointer" : "",
  ].join(" ");

  const pointerHandlers = isComingSoon
    ? {
        onPointerDown: () => setPressed(true),
        onPointerUp: () => setPressed(false),
        onPointerLeave: () => setPressed(false),
        onPointerCancel: () => setPressed(false),
      }
    : {};

  const motionProps = {
    initial: false,
    animate: isMobileMenu
      ? {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          opacity: isCollapsedSibling ? 0.6 : 1,
        }
      : {
          height: isHovered
            ? ROW_HEIGHT_HOVER
            : isCollapsedSibling
              ? ROW_HEIGHT_COLLAPSED
              : ROW_HEIGHT_DEFAULT,
          opacity: isCollapsedSibling ? 0.6 : 1,
        },
    transition: rowSpring,
    onHoverStart,
    onHoverEnd,
    ...pointerHandlers,
  };

  const inner = (
    <div className="flex w-full min-w-0 max-w-full items-center justify-center gap-1.5 overflow-hidden sm:justify-start sm:px-0">
      <span
        className={`truncate text-[14.4px] font-medium leading-none ${
          isActive ? "text-white" : "text-white/40"
        }`}
      >
        {label}
      </span>
      <AnimatePresence>
        {showLock ? (
          <motion.span
            key="lock"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex shrink-0 items-center overflow-hidden text-[#F7F6F2]"
            aria-hidden
          >
            <Image
              src="/landing/icon-lock.svg"
              alt=""
              width={16}
              height={16}
              className="menu-row-lock-icon h-4 w-4"
            />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );

  if (isExternalLink && externalHref) {
    return (
      <motion.a
        {...motionProps}
        href={externalHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${label} (opens in new tab)`}
        onClick={() => onExternalLink?.()}
        className={rowClassName}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.div
      {...motionProps}
      onClick={isClickable ? handleActivate : undefined}
      onKeyDown={
        isClickable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleActivate();
              }
            }
          : undefined
      }
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      className={rowClassName}
    >
      {inner}
    </motion.div>
  );
}
