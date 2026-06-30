'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GravityWell() {
  const torusRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      const pulse = 1 + Math.sin(t * 2) * 0.05;
      innerRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.1;
      glowRef.current.scale.setScalar(pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.04 + Math.sin(t * 2) * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Ambient glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#BA7517" transparent opacity={0.04} />
      </mesh>

      {/* Outer torus */}
      <mesh ref={torusRef}>
        <torusGeometry args={[0.6, 0.04, 8, 32]} />
        <meshStandardMaterial
          color="#EF9F27"
          emissive="#BA7517"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner sphere */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#BA7517"
          emissive="#EF9F27"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Point light */}
      <pointLight color="#EF9F27" intensity={0.6} distance={5} decay={2} />
    </group>
  );
}
