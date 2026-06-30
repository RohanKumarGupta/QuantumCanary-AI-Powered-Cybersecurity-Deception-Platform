import { Shield, Lock, CheckCircle, Server } from "lucide-react";

export const metadata = { title: "Security" };

export default function SecurityPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Security & Compliance</h1>
        <p className="text-xl text-muted leading-relaxed mb-12">QuantumCanary is built with security at its core. We apply the same rigorous standards to our platform that we help our customers achieve.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            { icon: Shield, title: "SOC 2 Type II", desc: "Independently audited security controls with annual compliance certification." },
            { icon: Lock, title: "End-to-End Encryption", desc: "All data encrypted at rest (AES-256) and in transit (TLS 1.3)." },
            { icon: CheckCircle, title: "GDPR Compliant", desc: "Full compliance with EU data protection regulations including data residency options." },
            { icon: Server, title: "Infrastructure Security", desc: "Deployed on enterprise-grade cloud infrastructure with 99.9% uptime SLA." },
          ].map((item) => (
            <div key={item.title} className="glass-card">
              <item.icon size={24} className="text-honey mb-3" />
              <h3 className="font-display font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="glass-card">
          <h2 className="text-xl font-display font-semibold mb-4">Security Practices</h2>
          <ul className="space-y-3">
            {["All passwords hashed with bcrypt (12 rounds)", "JWT sessions with 30-day expiry", "Rate limiting on all API endpoints", "CSRF protection on all forms", "Content Security Policy headers", "Regular penetration testing", "Bug bounty program", "24/7 security monitoring"].map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm text-muted"><CheckCircle size={14} className="text-asset flex-shrink-0" /> {p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
