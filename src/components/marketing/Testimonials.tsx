"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "QuantumCanary detected a nation-state actor in our network within 4 hours of deployment. Traditional tools missed it for weeks.", name: "Sarah Chen", title: "CISO", company: "FinTech Global", initials: "SC", color: "bg-honey/20 text-honey" },
  { quote: "The AI-powered dossiers save our SOC team 15+ hours per week on threat analysis. It's like having a senior analyst available 24/7.", name: "Marcus Rivera", title: "Head of Security", company: "DataShield Inc", initials: "MR", color: "bg-asset/20 text-asset" },
  { quote: "We caught an insider threat through a canary token embedded in a salary spreadsheet. QuantumCanary paid for itself on day one.", name: "Priya Patel", title: "Security Engineer", company: "CloudOps Pro", initials: "PP", color: "bg-gravity/20 text-gravity-light" },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-space-800">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Trusted by Security Teams</h2>
          <p className="text-muted text-lg">See what professionals are saying about QuantumCanary</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="glass-card flex flex-col">
              <p className="text-sm leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}>{t.initials}</div>
                <div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-muted">{t.title}, {t.company}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
