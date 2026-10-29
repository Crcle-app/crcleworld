"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MenuRow } from "./MenuRow";

const menuItems = [
  { label: "crcleTV", id: "tv" },
  { label: "crcle app", id: "app" },
  { label: "Coming soon", id: "soon" },
] as const;

const MENU_BACKDROP = "blur(56px) saturate(185%) brightness(0.92)";

const CRCLE_APP_STORE_URL =
  "https://apps.apple.com/gb/app/crcle/id6723858953";

type ProductMenuProps = {
  open: boolean;
  onClose: () => void;
  onCrcleTv: () => void;
};

function isMenuTrigger(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(
    target.closest('[aria-controls="products-menu"]') ||
      target.closest('[data-header-menu-trigger="true"]'),
  );
}

export function ProductMenu({ open, onClose, onCrcleTv }: ProductMenuProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const ignoreOutsideCloseRef = useRef(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setHoveredId(null);
      return;
    }

    ignoreOutsideCloseRef.current = true;
    const ignoreTimer = window.setTimeout(() => {
      ignoreOutsideCloseRef.current = false;
    }, 320);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const onPointer = (event: MouseEvent) => {
      if (ignoreOutsideCloseRef.current) return;
      const target = event.target;
      if (navRef.current?.contains(target as Node)) return;
      if (isMenuTrigger(target)) return;
      onClose();
    };

    const armListener = window.setTimeout(() => {
      document.addEventListener("mousedown", onPointer, true);
    }, 0);

    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(ignoreTimer);
      window.clearTimeout(armListener);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer, true);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const anyHovered = hoveredId !== null;

  return createPortal(
    <div className="product-menu-anchor">
      <div
        ref={navRef}
        id="products-menu"
        role="dialog"
        aria-modal="false"
        aria-label="Products"
        className="product-menu-liquid-glass relative w-full sm:w-[305px] sm:max-w-[min(85vw,calc(100vw-48px))]"
        style={{
          backdropFilter: MENU_BACKDROP,
          WebkitBackdropFilter: MENU_BACKDROP,
        }}
      >
        <div
          className="product-menu-backdrop-frost pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            backdropFilter: MENU_BACKDROP,
            WebkitBackdropFilter: MENU_BACKDROP,
          }}
          aria-hidden
        />
        <div className="product-menu-liquid-glass-inner">
          {menuItems.map((item, index) => {
            const isHovered = hoveredId === item.id;
            const isCollapsedSibling = anyHovered && !isHovered;
            const opensChat = item.id === "tv";
            const isComingSoon = item.id === "soon";
            const isApp = item.id === "app";

            return (
              <MenuRow
                key={item.id}
                label={item.label}
                index={index}
                totalRows={menuItems.length}
                isHovered={isHovered}
                isCollapsedSibling={isCollapsedSibling}
                opensChat={opensChat}
                isComingSoon={isComingSoon}
                externalHref={isApp ? CRCLE_APP_STORE_URL : undefined}
                onExternalLink={isApp ? onClose : undefined}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                onOpenChat={opensChat ? onCrcleTv : undefined}
              />
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
