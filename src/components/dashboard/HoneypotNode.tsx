'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface HoneypotNodeProps {
  position: [number, number, number];
  name: string;
  hits: number;
  onClick?: () => void;
  selected?: boolean;
}

export default function HoneypotNode({
  position,
  name,
  hits,
  onClick,
  selected = false,
}: HoneypotNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.5) * 0.1;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.08;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position} onClick={onClick}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color={selected ? '#85B7EB' : '#378ADD'}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Wireframe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color={selected ? '#85B7EB' : '#378ADD'}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Solid core */}
      <mesh>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial
          color="#378ADD"
          emissive="#378ADD"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -0.55, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center select-none">
          <div className="text-[10px] font-mono text-honey font-medium whitespace-nowrap bg-space/80 px-1.5 py-0.5 rounded">
            {name}
          </div>
          <div className="text-[8px] text-muted">{hits} hits</div>
        </div>
      </Html>
    </group>
  );
}
