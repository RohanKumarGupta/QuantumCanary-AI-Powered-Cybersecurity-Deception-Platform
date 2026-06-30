"use client";

import Link from "next/link";
import { QuantumCanaryLogo } from "@/components/ui/Logo";
import { Github, Twitter, Linkedin } from "lucide-react";

const links = {
  Product: [{ label: "Features", href: "/#features" }, { label: "Pricing", href: "/pricing" }, { label: "Security", href: "/security" }, { label: "Changelog", href: "#" }],
  Company: [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "#" }, { label: "Contact", href: "#" }],
  Resources: [{ label: "Documentation", href: "#" }, { label: "API Reference", href: "#" }, { label: "Community", href: "#" }, { label: "Status", href: "#" }],
  Legal: [{ label: "Privacy Policy", href: "#" }, { label: "Terms of Service", href: "#" }, { label: "Cookie Policy", href: "#" }, { label: "GDPR", href: "#" }],
};

export function Footer() {
  return (
    <footer className="border-t border-[rgba(55,138,221,0.1)] bg-space-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <QuantumCanaryLogo size={28} />
            <p className="text-xs text-muted mt-3 leading-relaxed">AI-powered cybersecurity deception platform for modern security teams.</p>
            <div className="flex gap-3 mt-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg hover:bg-[rgba(55,138,221,0.08)] text-muted hover:text-honey transition-colors"><Icon size={16} /></a>
              ))}
            </div>
          </div>
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">{section}</h4>
              <ul className="space-y-2">
                {items.map((item) => (<li key={item.label}><Link href={item.href} className="text-sm text-[#94A3B8] hover:text-honey transition-colors">{item.label}</Link></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[rgba(55,138,221,0.1)] mt-12 pt-8 text-center">
          <p className="text-xs text-muted">© {new Date().getFullYear()} QuantumCanary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
