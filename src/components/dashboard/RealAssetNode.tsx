'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RealAssetNodeProps {
  position: [number, number, number];
  orbitRadius?: number;
  orbitSpeed?: number;
  index?: number;
}

export default function RealAssetNode({
  position,
  orbitRadius = 1.5,
  orbitSpeed = 0.4,
  index = 0,
}: RealAssetNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = (index * Math.PI * 2) / 5; // spread 5 assets evenly

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * orbitSpeed + offset;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * orbitRadius;
      meshRef.current.position.z = Math.sin(t) * orbitRadius;
      meshRef.current.position.y = Math.sin(t * 2) * 0.15;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial
        color="#1D9E75"
        emissive="#1D9E75"
        emissiveIntensity={0.5}
        roughness={0.4}
      />
    </mesh>
  );
}
