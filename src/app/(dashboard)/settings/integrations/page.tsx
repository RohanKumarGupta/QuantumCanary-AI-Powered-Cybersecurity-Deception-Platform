"use client";

import { Plug, Check, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const integrations = [
  { name: "Slack", desc: "Send real-time alerts to Slack channels", connected: true, icon: "💬" },
  { name: "PagerDuty", desc: "Escalate critical threats automatically", connected: false, icon: "🚨" },
  { name: "Splunk", desc: "Forward events to your SIEM", connected: false, icon: "📊" },
  { name: "Jira", desc: "Create tickets for incident tracking", connected: false, icon: "📋" },
  { name: "Webhook", desc: "Send events to any HTTP endpoint", connected: true, icon: "🔗" },
  { name: "Email", desc: "Custom email alert rules", connected: true, icon: "✉️" },
];

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Integrations" description="Connect QuantumCanary with your existing tools" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((int) => (
          <div key={int.name} className="glass-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{int.icon}</span>
              <div>
                <h3 className="text-sm font-semibold">{int.name}</h3>
                <p className="text-xs text-muted">{int.desc}</p>
              </div>
            </div>
            <button className={int.connected ? "flex items-center gap-1 text-xs text-asset" : "btn-ghost h-8 px-3 text-xs"}>
              {int.connected ? <><Check size={14} /> Connected</> : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
