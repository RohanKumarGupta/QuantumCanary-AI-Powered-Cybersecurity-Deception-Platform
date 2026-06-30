'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Trail } from '@react-three/drei';
import * as THREE from 'three';

interface AttackerNodeProps {
  position: [number, number, number];
  threatScore: number;
  ip: string;
  onClick?: () => void;
  selected?: boolean;
}

export default function AttackerNode({
  position,
  threatScore,
  ip,
  onClick,
  selected = false,
}: AttackerNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const color = useMemo(() => {
    if (threatScore >= 80) return '#E24B4A';
    if (threatScore >= 50) return '#EF9F27';
    return '#BA7517';
  }, [threatScore]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.2;
      groupRef.current.position.x =
        position[0] + Math.cos(clock.elapsedTime * 0.8 + position[2]) * 0.15;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.z += 0.008;
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      <Trail
        width={0.3}
        length={6}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={selected ? 0.8 : 0.4}
            roughness={0.3}
          />
        </mesh>
      </Trail>

      {/* Threat glow */}
      <mesh>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.06} />
      </mesh>

      {/* Label */}
      <Html
        position={[0, -0.45, 0]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none' }}
      >
        <div className="text-center select-none">
          <div
            className="text-[10px] font-mono font-medium whitespace-nowrap bg-space/80 px-1.5 py-0.5 rounded"
            style={{ color }}
          >
            {ip}
          </div>
          <div className="text-[8px] text-muted">Score: {threatScore}</div>
        </div>
      </Html>
    </group>
  );
}
