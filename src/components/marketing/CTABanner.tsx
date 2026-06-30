"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden p-12 md:p-16 text-center"
          style={{ background: "linear-gradient(135deg, #378ADD 0%, #1D9E75 100%)" }}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%)" }} />
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4 relative z-10">Ready to Outsmart Attackers?</h2>
          <p className="text-white/80 text-lg mb-8 relative z-10">Deploy your first honeypot in under 90 seconds. No credit card required.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-space font-semibold rounded-lg hover:bg-white/90 transition-all text-sm">
              Start Free Trial <ArrowRight size={16} />
            </Link>
          </div>
          <p className="text-white/50 text-xs mt-4 relative z-10">No credit card required · Free forever plan available</p>
        </motion.div>
      </div>
    </section>
  );
}
