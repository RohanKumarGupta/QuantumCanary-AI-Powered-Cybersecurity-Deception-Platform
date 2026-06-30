"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const plans = [
    { name: "Free", price: "$0", period: "/month", desc: "Perfect for getting started", features: ["3 honeypots", "100 events/month", "Basic threat detection", "Community support", "Email alerts"], cta: "Start Free", href: "/register", popular: false },
    { name: "Pro", price: "$49", period: "/month", desc: "For growing security teams", features: ["Unlimited honeypots", "Unlimited events", "AI threat analysis", "5 team members", "Priority support", "Advanced analytics", "Custom canary tokens", "API access"], cta: "Start Pro Trial", href: "/register", popular: true },
    { name: "Enterprise", price: "Custom", period: "", desc: "For large organizations", features: ["Everything in Pro", "SSO & SAML", "SIEM integration", "Unlimited team members", "Dedicated support", "SLA guarantee", "Custom deployment", "Compliance reports"], cta: "Contact Sales", href: "/about", popular: false },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">Start free. Upgrade when you need more power.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className={`glass-card relative flex flex-col ${plan.popular ? "border-honey/40 glow-blue scale-[1.02]" : ""}`}>
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-honey text-white flex items-center gap-1">
                  <Star size={12} /> MOST POPULAR
                </span>
              )}
              <h3 className="font-display font-semibold text-xl mb-1">{plan.name}</h3>
              <p className="text-xs text-muted mb-4">{plan.desc}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-muted"><Check size={14} className="text-asset flex-shrink-0" /> {f}</li>))}
              </ul>
              <Link href={plan.href} className={plan.popular ? "btn-primary text-sm" : "btn-ghost text-sm"}>{plan.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
