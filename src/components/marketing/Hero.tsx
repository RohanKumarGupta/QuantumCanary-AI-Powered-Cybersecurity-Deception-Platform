'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldCheck, Activity, Clock } from 'lucide-react';

const STATS = [
  { icon: ShieldCheck, value: '10K+', label: 'Threats Detected' },
  { icon: Activity, value: '99.9%', label: 'Uptime' },
  { icon: Clock, value: 'SOC 2', label: 'Compliant' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 -z-10">
        {/* Radial gradient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(55,138,221,0.12)_0%,rgba(29,158,117,0.06)_30%,transparent_70%)]" />
        
        {/* Animated mesh grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(rgba(55,138,221,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(55,138,221,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'meshDrift 20s linear infinite',
        }} />

        {/* Floating orbs */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #378ADD 0%, transparent 70%)',
            top: '10%',
            left: '60%',
            animation: 'orbFloat1 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #1D9E75 0%, transparent 70%)',
            bottom: '5%',
            left: '15%',
            animation: 'orbFloat2 18s ease-in-out infinite',
          }}
        />

        {/* Scan line */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-0 right-0 h-px opacity-[0.06]"
            style={{
              background: 'linear-gradient(90deg, transparent, #378ADD, transparent)',
              animation: 'scanLine 8s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto text-center pt-20">
        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-honey-light bg-honey-50 border border-honey/20">
            🔒 Trusted by 500+ security teams
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mt-8 leading-[1.08]"
        >
          Stop Attackers Before They
          <br />
          <span className="text-gradient">Reach Your Real Systems</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed"
        >
          Deploy AI-powered honeypots and canary tokens that deceive attackers,
          expose their tactics, and generate actionable intelligence — before any real damage is done.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="btn-primary !h-12 !px-8 !text-base !w-auto group"
          >
            Start for free
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#product"
            className="btn-ghost !h-12 !px-8 !text-base !w-auto"
          >
            <Play size={16} className="fill-current" />
            Watch demo
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-14"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-honey-50 flex items-center justify-center">
                <stat.icon size={18} className="text-honey" />
              </div>
              <div className="text-left">
                <div className="font-display text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-white/[0.08] ml-6" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes meshDrift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(1.05); }
          66% { transform: translate(20px, -15px) scale(0.95); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, -20px) scale(1.08); }
        }
        @keyframes scanLine {
          0% { top: -2px; }
          50% { top: 100%; }
          100% { top: -2px; }
        }
      `}</style>
    </section>
  );
}
