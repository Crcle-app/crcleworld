/** Figma node 2367:41128 — layer geometry (733×729.274 artboard). */
export const HERO_LOGO_WIDTH = 733.001709;
export const HERO_LOGO_HEIGHT = 729.273621;

export type HeroLogoLayer = {
  id: string;
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  /** Percent inset expansion on img (Figma export bleed for glow layers). */
  imgInset?: { top: number; right: number; bottom: number; left: number };
};

export const heroLogoLayers: HeroLogoLayer[] = [
  {
    id: "41129",
    src: "/landing/hero-layer-01.svg",
    left: 103.001717,
    top: 239.000137,
    width: 325,
    height: 344,
  },
  {
    id: "41130",
    src: "/landing/hero-layer-02.svg",
    left: 115.001717,
    top: 97.954247,
    width: 504,
    height: 534,
  },
  {
    id: "41131",
    src: "/landing/hero-layer-03.svg",
    left: 115.001717,
    top: 411.000153,
    width: 171,
    height: 181,
    imgInset: { top: -66.3, right: -70.18, bottom: -66.3, left: -70.18 },
  },
  {
    id: "41132",
    src: "/landing/hero-layer-04.svg",
    left: 423.001709,
    top: 134.000137,
    width: 82,
    height: 87,
    imgInset: { top: -68.97, right: -73.17, bottom: -68.97, left: -73.17 },
  },
  {
    id: "41133",
    src: "/landing/hero-layer-05.svg",
    left: 216.001709,
    top: 421.000153,
    width: 82,
    height: 87,
    imgInset: { top: -68.97, right: -73.17, bottom: -68.97, left: -73.17 },
  },
  {
    id: "41134",
    src: "/landing/hero-layer-06.svg",
    left: 492.001709,
    top: 18.954245,
    width: 703.9649,
    height: 690.729429,
  },
  {
    id: "41135",
    src: "/landing/hero-layer-07.svg",
    left: 733.001709,
    top: 342.954254,
    width: 733.001714,
    height: 729.273606,
  },
  {
    id: "41136",
    src: "/landing/hero-layer-08.svg",
    left: 180.001709,
    top: 197.000137,
    width: 325,
    height: 344,
  },
  {
    id: "41137",
    src: "/landing/hero-layer-09.svg",
    left: 180.001709,
    top: 184.000137,
    width: 325,
    height: 344,
  },
];
