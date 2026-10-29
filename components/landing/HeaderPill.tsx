"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const pillShellClass =
  "crcle-liquid-glass relative box-border flex h-10 w-10 items-center justify-center rounded-full p-[3px] sm:h-[46px] sm:w-[46px] sm:p-[3.5px]";

const buttonClass =
  "relative z-10 flex size-[34px] shrink-0 items-center justify-center rounded-full sm:size-[39px]";

const iconClass = "h-[19px] w-[19px] sm:h-[22px] sm:w-[22px]";

const iconSwap = {
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.88 },
  transition: { duration: 0.18, ease: "easeOut" as const },
};

type HeaderSignalPillProps = {
  onEyeClick: () => void;
};

export function HeaderSignalPill({ onEyeClick }: HeaderSignalPillProps) {
  return (
    <div
      data-header-pill="true"
      className={pillShellClass}
      role="group"
      aria-label="Chat"
    >
      <motion.button
        type="button"
        onClick={onEyeClick}
        aria-label="Open chat"
        whileTap={{ scale: 0.92 }}
        className={buttonClass}
      >
        <Image
          src="/landing/icon-signal.svg"
          alt=""
          width={19}
          height={19}
          className={`${iconClass} header-pill-signal-icon`}
        />
      </motion.button>
    </div>
  );
}

type HeaderMenuTriggerProps = {
  menuExpanded: boolean;
  onMenuClick: () => void;
};

export function HeaderMenuTrigger({
  menuExpanded,
  onMenuClick,
}: HeaderMenuTriggerProps) {
  return (
    <div
      data-header-menu-trigger="true"
      className={pillShellClass}
      role="group"
      aria-label="Products menu"
    >
      <motion.button
        type="button"
        aria-label="Open products menu"
        aria-expanded={menuExpanded}
        aria-controls="products-menu"
        onClick={onMenuClick}
        whileTap={{ scale: 0.92 }}
        className={buttonClass}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuExpanded ? (
            <motion.span key="active" {...iconSwap} className="flex items-center justify-center">
              <Image
                src="/landing/icon-menu-active.svg"
                alt=""
                width={22}
                height={22}
                className={iconClass}
              />
            </motion.span>
          ) : (
            <motion.span key="idle" {...iconSwap} className="flex items-center justify-center">
              <Image
                src="/landing/icon-menu-hamburger.svg"
                alt=""
                width={19}
                height={19}
                className={`${iconClass} header-pill-hamburger-idle`}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
