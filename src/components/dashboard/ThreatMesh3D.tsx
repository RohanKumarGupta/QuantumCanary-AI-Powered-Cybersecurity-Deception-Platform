'use client';

import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const ThreatMesh3DInner = dynamic(
  () => import('./ThreatMesh3DInner'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] flex items-center justify-center glass-card">
        <LoadingSpinner size="lg" label="Loading 3D visualization…" />
      </div>
    ),
  },
);

export default function ThreatMesh3D() {
  return <ThreatMesh3DInner />;
}
