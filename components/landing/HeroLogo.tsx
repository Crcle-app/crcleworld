import Image from "next/image";
import {
  heroLogoLayers,
  HERO_LOGO_HEIGHT,
  HERO_LOGO_WIDTH,
} from "./hero-logo-layers";

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

export function HeroLogo() {
  return (
    <div
      className="relative h-full w-full"
      aria-hidden
      data-node-id="2367:41128"
    >
      {heroLogoLayers.map((layer) => (
        <div
          key={layer.id}
          className="absolute overflow-visible"
          style={{
            left: pct(layer.left, HERO_LOGO_WIDTH),
            top: pct(layer.top, HERO_LOGO_HEIGHT),
            width: pct(layer.width, HERO_LOGO_WIDTH),
            height: pct(layer.height, HERO_LOGO_HEIGHT),
          }}
        >
          <div className="relative h-full w-full">
            <div
              className="absolute"
              style={
                layer.imgInset
                  ? {
                      top: `${layer.imgInset.top}%`,
                      right: `${layer.imgInset.right}%`,
                      bottom: `${layer.imgInset.bottom}%`,
                      left: `${layer.imgInset.left}%`,
                    }
                  : { inset: 0 }
              }
            >
              <Image
                src={layer.src}
                alt=""
                fill
                className="max-w-none object-fill"
                sizes="733px"
                priority={layer.id === "41137"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
