/** Outer ring paths aligned to hero-graphic / hero-logo artboard (738×729.274). */
const OUTER_RING =
  "M63.8118 380.836C53.7435 270.37 170.55 209.165 254.274 169.399C331.306 132.8 505.569 84.6751 546.988 203.519C558.961 237.881 555.304 246.754 561.783 281.622C576.202 359.17 594.765 447.166 572.774 518.503C539.078 627.826 462.723 611.269 372.415 594.525C267.263 575.029 75.1486 505.314 63.8118 380.836Z";

const INNER_RING =
  "M482.933 501.228C432.502 551.902 353.875 519.547 299.546 494.658C249.555 471.763 153.598 405.626 195.187 336.006C207.212 315.877 213.112 314.012 227.663 296.387C260.022 257.183 295.829 211.612 340.196 192.956C408.187 164.365 431.624 208.918 460.749 260.437C494.66 320.425 539.764 444.13 482.933 501.228Z";

export function HeroRingGlow() {
  return (
    <div
      className="hero-ring-glow pointer-events-none absolute inset-0 z-[2]"
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 738 729.274"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient
            id="hero-ring-glow-gradient"
            gradientUnits="userSpaceOnUse"
            x1="80"
            y1="120"
            x2="640"
            y2="620"
          >
            <stop offset="0%" stopColor="#FFE8CC" stopOpacity="0.22" />
            <stop offset="38%" stopColor="#F7F6F2" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#F7F6F2" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient
            id="hero-ring-sun-rim"
            gradientUnits="userSpaceOnUse"
            x1="180"
            y1="100"
            x2="520"
            y2="520"
          >
            <stop offset="0%" stopColor="#FFD4A8" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#F7F6F2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          className="hero-ring-glow-stroke hero-ring-glow-stroke--outer"
          d={OUTER_RING}
          stroke="url(#hero-ring-glow-gradient)"
          strokeWidth="2.02"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
        />
        <path
          className="hero-ring-glow-stroke hero-ring-glow-stroke--outer"
          d={OUTER_RING}
          stroke="url(#hero-ring-sun-rim)"
          strokeWidth="2.6"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <path
          className="hero-ring-glow-stroke hero-ring-glow-stroke--inner"
          d={INNER_RING}
          stroke="#F7F6F2"
          strokeWidth="1.44"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
