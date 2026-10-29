import Image from "next/image";
import { Suspense } from "react";
import { HeroSection } from "@/components/landing/HeroSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { LandingHeader } from "@/components/landing/LandingHeader";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="landing-page relative h-screen w-full overflow-hidden bg-crcle-bg text-foreground">
      <div className="bg-pattern pointer-events-none absolute inset-0 z-0" aria-hidden />

      <Suspense fallback={null}>
        <LandingHeader />
      </Suspense>

      <div className="relative z-10 mx-auto h-full w-full max-w-[1728px] px-6 sm:px-10 lg:px-[84px]">
        <div className="relative h-full w-full">
          <Suspense fallback={null}>
            <HeroSection />
          </Suspense>
        </div>
      </div>

      <div
        className="pointer-events-none absolute right-0 bottom-0 z-20 w-[min(92vw,369px)] max-sm:left-1/2 max-sm:right-auto max-sm:-translate-x-1/2 sm:w-[45vw] sm:min-w-[320px] sm:max-w-[620px] sm:translate-x-0"
        data-testid="hero-phone-arm"
      >
        <Image
          src="/landing/phone-mockup.png"
          alt="Hand holding phone with crcle app"
          width={1652}
          height={1402}
          className="h-auto w-full object-contain"
          priority
        />
      </div>

      <Suspense fallback={null}>
        <LandingFooter />
      </Suspense>
    </div>
  );
}
