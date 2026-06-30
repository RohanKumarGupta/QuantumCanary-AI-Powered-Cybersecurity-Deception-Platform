"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, User, Shield, Users, CreditCard, Plug } from "lucide-react";

const tabs = [
  { label: "General", href: "/settings", icon: Settings },
  { label: "Profile", href: "/settings/profile", icon: User },
  { label: "Security", href: "/settings/security", icon: Shield },
  { label: "Team", href: "/settings/team", icon: Users },
  { label: "Billing", href: "/settings/billing", icon: CreditCard },
  { label: "Integrations", href: "/settings/integrations", icon: Plug },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <nav className="lg:w-52 flex-shrink-0">
        <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {tabs.map((t) => {
            const isActive = pathname === t.href;
            return (
              <Link key={t.href} href={t.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  isActive ? "bg-honey/10 text-honey" : "text-muted hover:text-[#E8EDF5] hover:bg-[rgba(255,255,255,0.03)]"
                }`}>
                <t.icon size={16} /> {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}
