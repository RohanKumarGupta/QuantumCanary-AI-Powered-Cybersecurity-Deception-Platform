// QuantumCanary SVG Logo Component
// A canary bird silhouette merged with a quantum/digital circuit motif
// Colors: Honey blue (#378ADD) with space theme

import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function QuantumCanaryLogo({ className = "", size = 32, showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer quantum ring */}
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="url(#ringGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
        />
        
        {/* Inner orbit ellipse */}
        <ellipse
          cx="32"
          cy="32"
          rx="22"
          ry="10"
          stroke="url(#orbitGrad)"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(-30 32 32)"
        />
        <ellipse
          cx="32"
          cy="32"
          rx="22"
          ry="10"
          stroke="url(#orbitGrad)"
          strokeWidth="1"
          opacity="0.4"
          transform="rotate(30 32 32)"
        />

        {/* Central shield / canary body */}
        <path
          d="M32 12C26 12 22 16 22 20C22 22 23 24 24 25L20 32L22 34L26 28C27 29 29 30 32 30C35 30 37 29 38 28L42 34L44 32L40 25C41 24 42 22 42 20C42 16 38 12 32 12Z"
          fill="url(#bodyGrad)"
          opacity="0.95"
        />
        
        {/* Canary beak */}
        <path
          d="M36 19L40 17L38 20L36 19Z"
          fill="#EF9F27"
        />
        
        {/* Eye */}
        <circle cx="35" cy="17" r="1.5" fill="#E8EDF5" />
        <circle cx="35.5" cy="16.8" r="0.6" fill="#060918" />
        
        {/* Wing detail */}
        <path
          d="M26 20C26 20 28 23 32 23C36 23 38 20 38 20"
          stroke="rgba(55,138,221,0.5)"
          strokeWidth="0.8"
          fill="none"
        />
        
        {/* Tail feathers - digital/circuit style */}
        <path
          d="M32 30L28 40L30 40L32 34L34 40L36 40L32 30Z"
          fill="url(#tailGrad)"
          opacity="0.9"
        />
        
        {/* Digital circuit nodes */}
        <circle cx="28" cy="40" r="2" fill="#378ADD" opacity="0.8" />
        <circle cx="36" cy="40" r="2" fill="#1D9E75" opacity="0.8" />
        <circle cx="32" cy="44" r="2" fill="#EF9F27" opacity="0.8" />
        
        {/* Circuit lines from tail */}
        <line x1="28" y1="42" x2="28" y2="48" stroke="#378ADD" strokeWidth="0.8" opacity="0.4" />
        <line x1="36" y1="42" x2="36" y2="48" stroke="#1D9E75" strokeWidth="0.8" opacity="0.4" />
        <line x1="32" y1="46" x2="32" y2="52" stroke="#EF9F27" strokeWidth="0.8" opacity="0.4" />
        
        {/* Quantum dots on orbits */}
        <circle cx="14" cy="24" r="2" fill="#378ADD" opacity="0.7" />
        <circle cx="50" cy="40" r="2" fill="#1D9E75" opacity="0.7" />
        <circle cx="50" cy="24" r="2" fill="#EF9F27" opacity="0.5" />
        <circle cx="14" cy="40" r="2" fill="#E24B4A" opacity="0.5" />

        {/* Shield outline around canary */}
        <path
          d="M32 8L18 14V28C18 38 24 46 32 50C40 46 46 38 46 28V14L32 8Z"
          stroke="url(#shieldGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.3"
        />

        <defs>
          <linearGradient id="ringGrad" x1="2" y1="2" x2="62" y2="62">
            <stop offset="0%" stopColor="#378ADD" />
            <stop offset="100%" stopColor="#1D9E75" />
          </linearGradient>
          <linearGradient id="orbitGrad" x1="10" y1="32" x2="54" y2="32">
            <stop offset="0%" stopColor="#378ADD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1D9E75" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="22" y1="12" x2="42" y2="34">
            <stop offset="0%" stopColor="#378ADD" />
            <stop offset="50%" stopColor="#2D7BC4" />
            <stop offset="100%" stopColor="#185FA5" />
          </linearGradient>
          <linearGradient id="tailGrad" x1="32" y1="30" x2="32" y2="40">
            <stop offset="0%" stopColor="#185FA5" />
            <stop offset="100%" stopColor="#378ADD" />
          </linearGradient>
          <linearGradient id="shieldGrad" x1="18" y1="8" x2="46" y2="50">
            <stop offset="0%" stopColor="#378ADD" />
            <stop offset="50%" stopColor="#1D9E75" />
            <stop offset="100%" stopColor="#378ADD" />
          </linearGradient>
        </defs>
      </svg>
      
      {showText && (
        <span className="font-display font-semibold text-lg tracking-tight">
          <span className="text-[#E8EDF5]">Quantum</span>
          <span className="text-gradient">Canary</span>
        </span>
      )}
    </div>
  );
}

// Small icon-only variant for favicons/badges
export function QuantumCanaryIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="32" cy="32" r="30" stroke="url(#iconRingGrad)" strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />
      <path
        d="M32 12C26 12 22 16 22 20C22 22 23 24 24 25L20 32L22 34L26 28C27 29 29 30 32 30C35 30 37 29 38 28L42 34L44 32L40 25C41 24 42 22 42 20C42 16 38 12 32 12Z"
        fill="url(#iconBodyGrad)"
      />
      <path d="M36 19L40 17L38 20L36 19Z" fill="#EF9F27" />
      <circle cx="35" cy="17" r="1.5" fill="#E8EDF5" />
      <path d="M32 30L28 40L30 40L32 34L34 40L36 40L32 30Z" fill="url(#iconTailGrad)" />
      <circle cx="28" cy="40" r="2" fill="#378ADD" opacity="0.8" />
      <circle cx="36" cy="40" r="2" fill="#1D9E75" opacity="0.8" />
      <circle cx="32" cy="44" r="2" fill="#EF9F27" opacity="0.8" />
      <path d="M32 8L18 14V28C18 38 24 46 32 50C40 46 46 38 46 28V14L32 8Z" stroke="url(#iconShieldGrad)" strokeWidth="1.5" fill="none" opacity="0.3" />
      <defs>
        <linearGradient id="iconRingGrad" x1="2" y1="2" x2="62" y2="62"><stop offset="0%" stopColor="#378ADD" /><stop offset="100%" stopColor="#1D9E75" /></linearGradient>
        <linearGradient id="iconBodyGrad" x1="22" y1="12" x2="42" y2="34"><stop offset="0%" stopColor="#378ADD" /><stop offset="100%" stopColor="#185FA5" /></linearGradient>
        <linearGradient id="iconTailGrad" x1="32" y1="30" x2="32" y2="40"><stop offset="0%" stopColor="#185FA5" /><stop offset="100%" stopColor="#378ADD" /></linearGradient>
        <linearGradient id="iconShieldGrad" x1="18" y1="8" x2="46" y2="50"><stop offset="0%" stopColor="#378ADD" /><stop offset="50%" stopColor="#1D9E75" /><stop offset="100%" stopColor="#378ADD" /></linearGradient>
      </defs>
    </svg>
  );
}

export default QuantumCanaryLogo;
