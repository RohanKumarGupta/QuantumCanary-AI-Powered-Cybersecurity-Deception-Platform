'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Brain,
  FileKey,
  Layers,
  BarChart3,
  Bell,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Globe,
    title: 'Antigravity Threat Mesh',
    description: '3D real-time visualization of your threat landscape. Map attacker movements across honeypots with an interactive network graph.',
    color: '#378ADD',
  },
  {
    icon: Brain,
    title: 'AI Threat Analysis',
    description: 'GPT-4o powered dossiers that classify attackers, identify toolchains, and recommend defensive actions — in seconds.',
    color: '#1D9E75',
  },
  {
    icon: FileKey,
    title: 'Canary Tokens',
    description: 'Plant invisible traps in documents, URLs, DNS records, and images. Get instant alerts when data is exfiltrated.',
    color: '#EF9F27',
  },
  {
    icon: Layers,
    title: 'Smart Honeypots',
    description: 'Auto-generated deception layers that mimic SSH servers, APIs, databases, S3 buckets, and SMTP relays with convincing synthetic data.',
    color: '#BA7517',
  },
  {
    icon: BarChart3,
    title: 'Behavioral Analytics',
    description: 'Track attacker patterns with radar scores for persistence, stealth, sophistication, and intent. Spot trends before they escalate.',
    color: '#85B7EB',
  },
  {
    icon: Bell,
    title: 'Instant Alerts',
    description: 'Real-time notifications via email, Slack, and webhooks when threats are detected. Zero-delay response to critical security events.',
    color: '#E24B4A',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section id="features" ref={sectionRef} className="relative py-24 md:py-32 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(29,158,117,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(55,138,221,0.06)_0%,transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium text-asset tracking-wider uppercase border border-asset/20 rounded-full mb-4">
            Features
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
            Enterprise-Grade Security Features
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Everything you need to detect, analyze, and neutralize threats with intelligent deception.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative glass-card hover:border-white/[0.15] transition-all duration-300 cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{
                  background: `radial-gradient(circle at center, ${feature.color}08 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${feature.color}15` }}
              >
                <feature.icon size={22} style={{ color: feature.color }} />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${feature.color}40, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
