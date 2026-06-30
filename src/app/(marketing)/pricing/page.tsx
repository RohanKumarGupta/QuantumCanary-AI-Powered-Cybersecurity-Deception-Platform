import { Pricing as PricingComponent } from "@/components/marketing/Pricing";

export const metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingComponent />
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <h3 className="text-2xl font-display font-bold text-center mb-8">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            { q: "What is a honeypot?", a: "A honeypot is a decoy system designed to look like a real production server. When attackers interact with it, you get alerted and can study their behavior without any risk to your real systems." },
            { q: "Do I need a credit card for the free plan?", a: "No. The free plan is completely free forever — no credit card required. You can upgrade at any time." },
            { q: "How does AI analysis work?", a: "Our AI uses GPT-4o to analyze attacker behavior patterns, generate threat dossiers, and create professional incident reports in seconds." },
            { q: "Can I self-host QuantumCanary?", a: "Enterprise plans include self-hosted deployment options. Contact our sales team for details." },
          ].map((faq, i) => (
            <details key={i} className="glass-card group cursor-pointer">
              <summary className="font-semibold text-sm list-none flex items-center justify-between">
                {faq.q} <span className="text-honey group-open:rotate-45 transition-transform text-lg">+</span>
              </summary>
              <p className="text-sm text-muted mt-3">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
