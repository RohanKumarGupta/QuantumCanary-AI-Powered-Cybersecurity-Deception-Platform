'use client';

import { QuantumCanaryLogo } from '@/components/ui/Logo';
import { Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#060918] overflow-hidden px-4 py-12">
      {/* ── CSS Grid/Particle Background ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(55,138,221,1) 1px, transparent 1px), linear-gradient(90deg, rgba(55,138,221,1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Radial glow top-left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#378ADD] opacity-[0.06] blur-[120px]" />
        {/* Radial glow bottom-right */}
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#1D9E75] opacity-[0.05] blur-[120px]" />
        {/* Floating particles via pseudo elements */}
        <div className="auth-particles" />
      </div>

      {/* ── Auth Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[420px]"
      >
        <div
          className="rounded-[16px] p-10 backdrop-blur-xl"
          style={{
            background: 'rgba(13,21,37,0.95)',
            border: '1px solid rgba(55,138,221,0.2)',
            boxShadow: '0 8px 64px rgba(0,0,0,0.4), 0 0 48px rgba(55,138,221,0.06)',
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <QuantumCanaryLogo size={38} showText />
          </div>

          {/* Page content slot */}
          {children}
        </div>

        {/* Encryption footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-1.5 mt-6 text-[#5A6A82] text-xs"
        >
          <Lock className="w-3 h-3" />
          <span>Protected by industry-standard encryption</span>
        </motion.div>
      </motion.div>

      {/* ── Inline keyframe styles for particles ── */}
      <style jsx>{`
        .auth-particles {
          position: absolute;
          inset: 0;
        }

        .auth-particles::before,
        .auth-particles::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          animation: float-particle linear infinite;
        }

        .auth-particles::before {
          width: 3px;
          height: 3px;
          top: 20%;
          left: 15%;
          background: rgba(55, 138, 221, 0.4);
          animation-duration: 8s;
        }

        .auth-particles::after {
          width: 2px;
          height: 2px;
          top: 60%;
          right: 20%;
          background: rgba(29, 158, 117, 0.4);
          animation-duration: 12s;
          animation-delay: 2s;
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.4;
          }
          75% {
            transform: translateY(-40px) translateX(20px);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
