export function LegalInformationFooter() {
  return (
    <footer
      data-legal-footer
      aria-label="Legal information"
      className="pointer-events-auto fixed right-0 bottom-0 left-0 z-[35] border-t border-[rgb(247_246_242/0.15)] px-6 py-5 sm:px-10 sm:py-7 lg:px-[72px]"
    >
      <div className="mx-auto flex w-full max-w-[1728px] flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-center text-[11px] leading-[1.5] text-[#92929f] sm:text-left">
          © 2026 crcle Ltd. All rights reserved.
        </p>
        <nav
          className="flex flex-wrap items-center justify-center gap-3 text-[12px] leading-normal text-[#92929f] sm:justify-end"
          aria-label="Legal links"
        >
          <a href="#terms" className="transition-colors hover:text-[#f7f6f2]/85">
            terms
          </a>
          <span aria-hidden>·</span>
          <a href="#privacy" className="transition-colors hover:text-[#f7f6f2]/85">
            privacy
          </a>
          <span aria-hidden>·</span>
          <a href="#enquiries" className="transition-colors hover:text-[#f7f6f2]/85">
            enquiries
          </a>
        </nav>
      </div>
    </footer>
  );
}
