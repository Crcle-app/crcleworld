"use client";

import { useCallback, useState } from "react";
import type { ChatVariant } from "./chat-content";
import { ChatBox } from "./ChatBox";
import { CrcleLogo } from "./CrcleLogo";
import { HeaderMenuTrigger, HeaderSignalPill } from "./HeaderPill";
import { ProductMenu } from "./ProductMenu";

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatVariant, setChatVariant] = useState<ChatVariant>("about");

  const selectEye = () => {
    setChatVariant("about");
    setChatOpen(true);
    setMenuOpen(false);
  };

  const selectMenu = () => {
    setMenuOpen((open) => !open);
    setChatOpen(false);
  };

  const openCrcleTvChat = () => {
    setChatVariant("comingSoon");
    setChatOpen(true);
    setMenuOpen(false);
  };

  const closeChat = useCallback(() => {
    setChatOpen(false);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-[60] w-full">
      <div className="pointer-events-auto mx-auto grid w-full max-w-[1728px] grid-cols-[1fr_auto] grid-rows-[auto_auto] items-center gap-y-3 px-6 pt-14 pb-4 max-sm:gap-y-3 sm:grid-cols-[1fr_auto_1fr] sm:grid-rows-1 sm:gap-y-0 sm:px-10 sm:pt-[84px] sm:pb-6 lg:px-[84px]">
        <div
          data-header-wordmark
          className="flex items-center justify-self-start text-[#F7F6F2] sm:min-h-[50px]"
        >
          <CrcleLogo />
        </div>

        <div className="max-sm:col-span-2 max-sm:row-start-2 flex translate-y-4 justify-center sm:col-span-1 sm:row-start-auto sm:block sm:translate-y-[12px] sm:justify-self-center sm:self-center">
          <HeaderSignalPill onEyeClick={selectEye} />
        </div>

        <div className="max-sm:col-start-2 max-sm:row-start-1 flex items-center justify-self-end sm:col-start-auto sm:row-start-auto sm:min-h-[50px]">
          <HeaderMenuTrigger menuExpanded={menuOpen} onMenuClick={selectMenu} />
        </div>
      </div>

      </header>
      <ProductMenu
        open={menuOpen}
        onClose={closeMenu}
        onCrcleTv={openCrcleTvChat}
      />
      <ChatBox open={chatOpen} variant={chatVariant} onClose={closeChat} />
    </>
  );
}
