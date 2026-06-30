'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useCallback } from 'react';
import HoneypotNode from './HoneypotNode';
import AttackerNode from './AttackerNode';
import GravityWell from './GravityWell';
import RealAssetNode from './RealAssetNode';
import ParticleField from './ParticleField';
import { mockHoneypots, mockThreats } from '@/lib/mock-data';
import { useThreatStore } from '@/hooks/useThreatStore';

function Scene() {
  const setSelected = useThreatStore((s) => s.setSelected);
  const selectedThreat = useThreatStore((s) => s.selectedThreat);

  const handleThreatClick = useCallback(
    (threat: (typeof mockThreats)[number]) => {
      setSelected(selectedThreat?.id === threat.id ? null : (threat as ReturnType<typeof useThreatStore.getState>['selectedThreat']));
    },
    [setSelected, selectedThreat],
  );

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 3, 6]} fov={50} />
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.4}
      />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#378ADD" />
      <directionalLight position={[-5, 3, -5]} intensity={0.15} color="#1D9E75" />

      {/* Gravity Well (center) */}
      <GravityWell />

      {/* Real Asset Nodes (inner orbit) */}
      {[0, 1, 2, 3, 4].map((i) => (
        <RealAssetNode
          key={`asset-${i}`}
          position={[0, 0, 0]}
          orbitRadius={1.5}
          orbitSpeed={0.4}
          index={i}
        />
      ))}

      {/* Honeypot Nodes (outer orbit) */}
      {mockHoneypots.map((hp, i) => {
        const angle = (i / mockHoneypots.length) * Math.PI * 2;
        const r = 3.2;
        return (
          <HoneypotNode
            key={hp.id}
            position={[
              Math.cos(angle) * r,
              Math.sin(i * 0.7) * 0.3,
              Math.sin(angle) * r,
            ]}
            name={hp.name.length > 16 ? hp.name.slice(0, 14) + '…' : hp.name}
            hits={hp.totalHits}
          />
        );
      })}

      {/* Attacker Nodes (floating) */}
      {mockThreats.map((threat, i) => {
        const angle = (i / mockThreats.length) * Math.PI * 2 + 0.5;
        const r = 2 + Math.random() * 0.5;
        return (
          <AttackerNode
            key={threat.id}
            position={[
              Math.cos(angle) * r,
              0.8 + i * 0.3,
              Math.sin(angle) * r,
            ]}
            threatScore={threat.threatScore}
            ip={threat.ipPartial}
            onClick={() => handleThreatClick(threat)}
            selected={selectedThreat?.id === threat.id}
          />
        );
      })}

      {/* Ambient Particles */}
      <ParticleField count={500} radius={8} />
    </>
  );
}

export default function ThreatMesh3DInner() {
  return (
    <div className="w-full h-full min-h-[400px] rounded-md overflow-hidden">
      <Canvas
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
