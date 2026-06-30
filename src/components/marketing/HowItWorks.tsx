'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, AlertTriangle, Shield } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: Server,
    title: 'Deploy',
    color: '#378ADD',
    glowClass: 'glow-blue',
    description: 'Deploy intelligent honeypots that mirror your infrastructure. Auto-generated decoys that look and feel like your real systems.',
  },
  {
    number: '02',
    icon: AlertTriangle,
    title: 'Detect',
    color: '#EF9F27',
    glowClass: '',
    description: 'Attackers interact with decoys, revealing their tactics, techniques, and procedures — all without touching your real assets.',
  },
  {
    number: '03',
    icon: Shield,
    title: 'Defend',
    color: '#1D9E75',
    glowClass: 'glow-green',
    description: 'AI analyzes attacker behavior, generates detailed dossiers, and provides actionable intelligence to strengthen your defenses.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section id="product" ref={sectionRef} className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(55,138,221,0.05)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-honey tracking-wider uppercase border border-honey/20 rounded-full mb-4">
            How it works
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            How QuantumCanary Works
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Three simple steps to transform your security posture with intelligent deception.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              className="group relative glass-card hover:border-white/[0.15] transition-all duration-300"
            >
              {/* Number badge */}
              <div
                className="absolute -top-3 -left-1 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: step.color }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 mt-2 transition-shadow duration-300 group-hover:shadow-lg`}
                style={{
                  background: `${step.color}15`,
                  boxShadow: `0 0 0px ${step.color}00`,
                }}
              >
                <step.icon size={26} style={{ color: step.color }} />
              </div>

              {/* Title */}
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Connecting line (desktop only) */}
        <div className="hidden md:flex items-center justify-center mt-8">
          <div className="flex items-center gap-0 w-full max-w-2xl mx-auto">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-honey/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
