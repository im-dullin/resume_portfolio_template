"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 120;
const CONNECTION_DISTANCE = 2.0;
const MOUSE_INFLUENCE_RADIUS = 2.5;

export default function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer } = useThree();

  const { positions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      // Distribute in a wide, flat plane with slight depth
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      velocities[i * 3] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;

      sizes[i] = 1 + Math.random() * 1.5;
    }

    return { positions, velocities, sizes };
  }, []);

  const lineGeometry = useMemo(() => {
    const maxLines = NODE_COUNT * NODE_COUNT;
    const linePositions = new Float32Array(maxLines * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geometry.setDrawRange(0, 0);
    return geometry;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    const mouseX = pointer.x * 5;
    const mouseY = pointer.y * 3.5;

    // Update positions
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];

      for (let j = 0; j < 3; j++) {
        const limit = j === 0 ? 5 : j === 1 ? 3.5 : 1;
        if (Math.abs(pos[i * 3 + j]) > limit) {
          velocities[i * 3 + j] *= -1;
        }
      }
    }

    posAttr.needsUpdate = true;

    // Update lines — monochrome white at varying opacity
    const linePos = lineGeometry.attributes.position.array as Float32Array;
    let lineIdx = 0;

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECTION_DISTANCE) {
          // Check mouse proximity to boost connection visibility
          const midX = (pos[i * 3] + pos[j * 3]) / 2;
          const midY = (pos[i * 3 + 1] + pos[j * 3 + 1]) / 2;
          const mouseDist = Math.sqrt((midX - mouseX) ** 2 + (midY - mouseY) ** 2);
          const mouseBoost = Math.max(0, 1 - mouseDist / MOUSE_INFLUENCE_RADIUS);

          if (1 - dist / CONNECTION_DISTANCE > 0.1 || mouseBoost > 0.2) {
            linePos[lineIdx * 6] = pos[i * 3];
            linePos[lineIdx * 6 + 1] = pos[i * 3 + 1];
            linePos[lineIdx * 6 + 2] = pos[i * 3 + 2];
            linePos[lineIdx * 6 + 3] = pos[j * 3];
            linePos[lineIdx * 6 + 4] = pos[j * 3 + 1];
            linePos[lineIdx * 6 + 5] = pos[j * 3 + 2];
            lineIdx++;
          }
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx * 2);
    (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={NODE_COUNT}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[sizes, 1]}
            count={NODE_COUNT}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={1.5}
          transparent
          opacity={0.15}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.04} depthWrite={false} />
      </lineSegments>
    </>
  );
}
