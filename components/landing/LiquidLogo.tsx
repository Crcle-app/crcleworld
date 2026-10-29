"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import {
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import * as THREE from "three";

useTexture.preload("/landing/hero-logo.png");

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uStrength;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 toMouse = vUv - uMouse;
    float dist = length(toMouse);
    vec2 dir = toMouse / max(dist, 0.0008);

    float wave = sin(dist * 36.0 - uTime * 5.5);
    float envelope = exp(-dist * 7.2) * uStrength;
    float n = wave * envelope;

    vec2 disp = dir * n * 0.14;
    float chroma = abs(n) * 0.022;

    vec2 uvR = clamp(vUv + disp + dir * chroma, 0.0, 1.0);
    vec2 uvG = clamp(vUv + disp, 0.0, 1.0);
    vec2 uvB = clamp(vUv + disp - dir * chroma, 0.0, 1.0);

    vec4 cr = texture2D(uTexture, uvR);
    vec4 cg = texture2D(uTexture, uvG);
    vec4 cb = texture2D(uTexture, uvB);

    float a = max(max(cr.a, cg.a), cb.a) * uOpacity;
    gl_FragColor = vec4(cr.r, cg.g, cb.b, a);
  }
`;

type LayerSpec = {
  rotation: [number, number, number];
  position: [number, number, number];
  scale: number;
  opacity: number;
};

const LAYERS: LayerSpec[] = [
  { rotation: [0, 0, 0.32], position: [-0.04, 0.03, -0.03], scale: 1.1, opacity: 0.34 },
  { rotation: [0, 0, -0.2], position: [0.04, -0.025, -0.015], scale: 1.05, opacity: 0.48 },
  { rotation: [0, 0, 0], position: [0, 0, 0], scale: 1, opacity: 1 },
];

type PointerState = {
  target: THREE.Vector2;
  current: THREE.Vector2;
  strength: number;
};

type InteractionState = {
  pointer: PointerState;
  spin: number;
  spinTarget: number;
};

const DRAG_SPIN = 0.008;
const WHEEL_SPIN = 0.0012;

function pushRipple(
  pointer: PointerState,
  uv: THREE.Vector2,
  minImpulse = 0.28,
) {
  const dist = pointer.target.distanceTo(uv);
  pointer.target.copy(uv);
  pointer.strength = Math.min(1, pointer.strength + Math.max(minImpulse, dist * 12));
}

function applyScrollLikeDelta(
  interaction: InteractionState,
  deltaX: number,
  deltaY: number,
) {
  const { pointer } = interaction;
  pointer.target.x = THREE.MathUtils.clamp(
    pointer.target.x + deltaY * 0.00065,
    0.05,
    0.95,
  );
  pointer.target.y = THREE.MathUtils.clamp(
    pointer.target.y + deltaX * 0.00065,
    0.05,
    0.95,
  );
  pointer.strength = Math.min(
    1,
    pointer.strength + Math.min(0.45, Math.abs(deltaY) * 0.0018 + Math.abs(deltaX) * 0.0018),
  );
  interaction.spinTarget += deltaY * WHEEL_SPIN + deltaX * DRAG_SPIN;
}

function GlassLayer({
  texture,
  interaction,
  rotation,
  position,
  scale,
  opacity,
}: LayerSpec & {
  texture: THREE.Texture;
  interaction: MutableRefObject<InteractionState>;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const size = Math.min(viewport.width, viewport.height) * 0.92;

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uStrength: { value: 0 },
      uOpacity: { value: opacity },
    }),
    [texture, opacity],
  );

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    const { pointer } = interaction.current;
    pointer.current.lerp(pointer.target, 1 - Math.exp(-delta * 8));
    pointer.strength = THREE.MathUtils.lerp(
      pointer.strength,
      0,
      1 - Math.exp(-delta * 2.2),
    );
    mat.uniforms.uMouse.value.copy(pointer.current);
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uStrength.value = pointer.strength;
  });

  return (
    <mesh rotation={rotation} position={[0, 0, position[2]]} scale={size * scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function HitPlane({
  interaction,
}: {
  interaction: MutableRefObject<InteractionState>;
}) {
  const { viewport } = useThree();
  const dragging = useRef(false);

  const pointerActive = (event: ThreeEvent<PointerEvent>) => {
    if (event.pointerType === "touch") return dragging.current;
    return event.buttons > 0 || dragging.current;
  };

  return (
    <mesh
      position={[0, 0, 0.05]}
      onPointerDown={(event) => {
        event.stopPropagation();
        dragging.current = true;
        (event.target as unknown as Element).setPointerCapture(event.pointerId);
        if (!event.uv) return;
        pushRipple(interaction.current.pointer, event.uv, 0.52);
      }}
      onPointerMove={(event) => {
        if (!event.uv) return;
        const active = pointerActive(event);
        if (active) {
          applyScrollLikeDelta(
            interaction.current,
            event.movementX,
            event.movementY,
          );
          pushRipple(interaction.current.pointer, event.uv, 0.22);
          return;
        }
        pushRipple(interaction.current.pointer, event.uv, 0.12);
      }}
      onPointerUp={(event) => {
        dragging.current = false;
        (event.target as unknown as Element).releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
      onWheel={(event) => {
        event.stopPropagation();
        applyScrollLikeDelta(
          interaction.current,
          event.deltaX,
          event.deltaY,
        );
      }}
    >
      <planeGeometry args={[viewport.width, viewport.height]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function LogoGroup({
  interaction,
  onReady,
}: {
  interaction: MutableRefObject<InteractionState>;
  onReady: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/landing/hero-logo.png");
  const readySent = useRef(false);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.premultiplyAlpha = false;
  texture.anisotropy = 4;

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (group) {
      interaction.current.spin = THREE.MathUtils.lerp(
        interaction.current.spin,
        interaction.current.spinTarget,
        1 - Math.exp(-delta * 10),
      );
      group.rotation.z = interaction.current.spin;
    }
    if (!readySent.current) {
      readySent.current = true;
      onReady();
    }
  });

  return (
    <group ref={groupRef}>
      {LAYERS.map((layer) => (
        <GlassLayer
          key={`${layer.rotation[2]}-${layer.scale}`}
          texture={texture}
          interaction={interaction}
          {...layer}
        />
      ))}
      <HitPlane interaction={interaction} />
    </group>
  );
}

function Scene({ onReady }: { onReady: () => void }) {
  const interaction = useRef<InteractionState>({
    pointer: {
      target: new THREE.Vector2(0.5, 0.5),
      current: new THREE.Vector2(0.5, 0.5),
      strength: 0,
    },
    spin: 0,
    spinTarget: 0,
  });

  const handleReady = useCallback(() => {
    onReady();
  }, [onReady]);

  return <LogoGroup interaction={interaction} onReady={handleReady} />;
}

export function LiquidLogo() {
  const [canvasReady, setCanvasReady] = useState(false);

  return (
    <div className="relative h-full w-full">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat transition-opacity duration-500 ease-out ${
          canvasReady ? "opacity-0" : "opacity-100"
        }`}
        style={{ backgroundImage: "url(/landing/hero-logo.png)" }}
      />
      <Canvas
        orthographic
        camera={{ position: [0, 0, 4], near: 0.1, far: 20, zoom: 1 }}
        gl={{
          alpha: true,
          antialias: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.75]}
        className={`h-full w-full touch-none transition-opacity duration-500 ease-out ${
          canvasReady ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "transparent", margin: 0, transform: "none" }}
      >
        <Suspense fallback={null}>
          <Scene onReady={() => setCanvasReady(true)} />
        </Suspense>
      </Canvas>
    </div>
  );
}
