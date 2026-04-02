"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ParticleNetwork from "./ParticleNetwork";

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <ParticleNetwork />
        </Suspense>
      </Canvas>
    </div>
  );
}
