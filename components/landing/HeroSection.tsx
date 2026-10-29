"use client";

import dynamic from "next/dynamic";

const LiquidLogo = dynamic(
  () => import("./LiquidLogo").then((mod) => mod.LiquidLogo),
  { ssr: false, loading: () => null },
);

export function HeroSection() {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      aria-label="Crcle mark"
    >
      <div className="pointer-events-auto relative aspect-square w-[70vw] max-w-[580px] lg:max-w-[667px]">
        <LiquidLogo />
      </div>
    </div>
  );
}
