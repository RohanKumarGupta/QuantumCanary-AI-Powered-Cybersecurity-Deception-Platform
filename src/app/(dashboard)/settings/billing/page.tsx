"use client";

import { CreditCard, Check, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const plans = [
  { name: "Free", price: "$0", period: "/mo", features: ["3 honeypots", "100 events/mo", "Community support"], current: false },
  { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited honeypots", "AI analysis", "5 team members", "Priority support"], current: true, popular: true },
  { name: "Enterprise", price: "Custom", period: "", features: ["Everything in Pro", "SSO", "SIEM integration", "Dedicated support", "SLA guarantee"], current: false },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Billing" description="Manage your subscription and payment methods" />
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-semibold">Current Plan</h3>
            <p className="text-sm text-muted">You are on the <span className="text-honey font-semibold">Pro</span> plan</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-honey/10 text-honey border border-honey/20">PRO</span>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl font-display font-bold">$49</span>
          <span className="text-muted">/month</span>
        </div>
        <p className="text-xs text-muted">Next billing date: July 1, 2024</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.name} className={`glass-card ${p.popular ? "border-honey/30 glow-blue" : ""} relative`}>
            {p.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-honey text-white">POPULAR</span>}
            <h4 className="font-display font-semibold mb-1">{p.name}</h4>
            <div className="flex items-baseline gap-1 mb-3"><span className="text-2xl font-bold">{p.price}</span><span className="text-xs text-muted">{p.period}</span></div>
            <ul className="space-y-2 mb-4">
              {p.features.map((f) => (<li key={f} className="flex items-center gap-2 text-xs text-muted"><Check size={12} className="text-asset" /> {f}</li>))}
            </ul>
            <button className={p.current ? "btn-ghost w-full text-xs" : "btn-primary w-full text-xs"}>{p.current ? "Current Plan" : "Upgrade"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
