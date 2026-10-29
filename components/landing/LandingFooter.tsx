import Image from "next/image";
import { ContactUsCluster } from "./ContactUsCluster";
import { LegalInformationFooter } from "./LegalInformationFooter";

function ConnectedAccounts() {
  return (
    <div
      className="flex shrink-0 flex-col items-center gap-3 sm:items-end"
      aria-label="Connected accounts"
    >
      <p
        data-connected-accounts-label
        className="text-xs font-semibold text-[#F7F6F2]"
      >
        Connected Accounts
      </p>
      <div className="flex items-center gap-6">
        <a
          href="https://www.instagram.com/crcletv/"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-95 transition-opacity hover:opacity-100"
          aria-label="Instagram"
        >
          <Image
            src="/landing/icon-instagram.svg"
            alt=""
            width={18}
            height={18}
          />
        </a>
        <a
          href="https://www.tiktok.com/@crcle.media"
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-95 transition-opacity hover:opacity-100"
          aria-label="TikTok"
        >
          <Image
            src="/landing/icon-tiktok.svg"
            alt=""
            width={16}
            height={16}
          />
        </a>
      </div>
    </div>
  );
}

function MobileTagline() {
  return (
    <h2 className="pointer-events-auto mx-auto max-w-[334px] text-[28px] font-medium leading-[1.1] tracking-tight">
      <span className="text-[#676874]">We&apos;re </span>
      <span className="text-[#9998a1]">intent-based </span>
      <span className="text-foreground">connection</span>
    </h2>
  );
}

function DesktopTagline() {
  return (
    <h2 className="pointer-events-auto min-w-0 max-w-[448px] shrink text-[46px] font-medium leading-[1.1] tracking-tight [word-break:break-word]">
      <span className="text-[#676874]">We&apos;re</span>
      <span className="text-[#9998a1]"> intent-based </span>
      <span className="text-foreground">connection</span>
    </h2>
  );
}

export function LandingFooter() {
  return (
    <>
      <footer className="pointer-events-none absolute z-30 top-[216px] right-6 left-6 text-center sm:hidden">
        <MobileTagline />
      </footer>

      <div
        className="pointer-events-none absolute z-30 crcle-gutter-right bottom-[calc(5.5rem+10px)] flex flex-col items-end gap-4 sm:bottom-[calc(6.75rem+10px)] sm:gap-5 lg:bottom-[calc(9.75rem+10px)]"
        data-footer-contact
      >
        <div className="pointer-events-auto hidden sm:block">
          <ConnectedAccounts />
        </div>
        <div className="pointer-events-auto">
          <ContactUsCluster />
        </div>
      </div>

      <aside className="pointer-events-none absolute z-30 bottom-[9.25rem] left-1/2 -translate-x-1/2 sm:hidden">
        <div className="pointer-events-auto origin-bottom scale-[0.85]">
          <ConnectedAccounts />
        </div>
      </aside>

      <div
        className="pointer-events-none absolute z-30 hidden crcle-gutter-left bottom-[5.5rem] sm:block lg:bottom-[9.75rem]"
        data-footer-desktop
      >
        <DesktopTagline />
      </div>

      <LegalInformationFooter />
    </>
  );
}
