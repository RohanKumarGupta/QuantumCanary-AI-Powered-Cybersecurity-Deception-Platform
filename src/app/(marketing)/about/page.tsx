export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">Our Mission</h1>
        <p className="text-xl text-muted leading-relaxed mb-12">We believe the best defense is deception. QuantumCanary empowers security teams to turn the tables on attackers by deploying intelligent traps that detect, analyze, and neutralize threats before they reach real assets.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { stat: "500+", label: "Security Teams" },
            { stat: "10K+", label: "Threats Detected" },
            { stat: "99.9%", label: "Uptime SLA" },
          ].map((s) => (
            <div key={s.label} className="glass-card text-center">
              <p className="text-3xl font-display font-bold text-gradient mb-1">{s.stat}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-display font-bold mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Security First", desc: "We eat our own cooking — our platform is built with the same security standards we help our customers achieve." },
            { title: "Transparency", desc: "Open pricing, clear documentation, and honest communication about what our platform can and cannot do." },
            { title: "Innovation", desc: "We continuously push the boundaries of deception technology with AI and behavioral analysis." },
            { title: "Community", desc: "We believe in making cybersecurity accessible. Our free tier is genuinely useful, not a teaser." },
          ].map((v) => (
            <div key={v.title} className="glass-card"><h3 className="font-semibold mb-2">{v.title}</h3><p className="text-sm text-muted">{v.desc}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}
