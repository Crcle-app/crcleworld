import Image from "next/image";

const CRCLE_CONTACT_EMAIL = "connect@crcle.me";

export function ContactUsCluster() {
  return (
    <div
      data-contact-cluster
      className="crcle-liquid-glass flex origin-right items-center gap-1.5 rounded-full p-[3px] max-sm:scale-100 sm:scale-[0.92]"
    >
      <div className="crcle-liquid-glass-disc relative flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#F7F6F2] sm:h-8 sm:w-8">
        <Image
          src="/landing/icon-contact-badge.svg"
          alt=""
          width={32}
          height={32}
          className="h-[17px] w-[17px] object-contain sm:h-[26px] sm:w-[26px]"
        />
      </div>
      <a
        href={`mailto:${CRCLE_CONTACT_EMAIL}`}
        className="rounded-full px-[18px] py-[7px] text-[12px] font-medium text-[#f7f6f2] transition-opacity hover:opacity-90 sm:px-5 sm:py-2 sm:text-sm"
      >
        Contact us
      </a>
    </div>
  );
}
