'use client';

import { cn } from '@/lib/utils';

interface NodeOrbitProps {
  size?: number;
  className?: string;
}

export default function NodeOrbit({ size = 40, className }: NodeOrbitProps) {
  const r = size / 2 - 4;

  return (
    <div
      className={cn('relative', className)}
      style={{ width: size, height: size }}
    >
      {/* Center dot */}
      <div
        className="absolute rounded-full bg-honey"
        style={{
          width: 6,
          height: 6,
          top: size / 2 - 3,
          left: size / 2 - 3,
          boxShadow: '0 0 8px rgba(55,138,221,0.6)',
        }}
      />

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-[rgba(55,138,221,0.2)]"
        style={{
          width: r * 2,
          height: r * 2,
          top: size / 2 - r,
          left: size / 2 - r,
        }}
      />

      {/* Orbiting dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: 5,
            height: 5,
            top: size / 2 - 2.5,
            left: size / 2 - 2.5,
            animation: `orbit-spin ${3 + i * 0.5}s linear infinite`,
            animationDelay: `${i * -1}s`,
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: 5,
              height: 5,
              backgroundColor: ['#378ADD', '#1D9E75', '#EF9F27'][i],
              transform: `translateX(${r}px)`,
              boxShadow: `0 0 6px ${['rgba(55,138,221,0.5)', 'rgba(29,158,117,0.5)', 'rgba(239,159,39,0.5)'][i]}`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
