"use client";

import { Users, Plus, Crown, Eye } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const members = [
  { name: "Demo User", email: "user@quantumcanary.io", role: "Owner", avatar: "DU" },
  { name: "Alice Chen", email: "alice@acme.com", role: "Admin", avatar: "AC" },
  { name: "Bob Smith", email: "bob@acme.com", role: "Viewer", avatar: "BS" },
];

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Team" description="Manage team members and permissions">
        <button className="btn-primary h-10 px-4 text-sm gap-2 inline-flex items-center"><Plus size={16} /> Invite Member</button>
      </PageHeader>
      <div className="glass-card p-0 overflow-hidden">
        {members.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-[rgba(55,138,221,0.05)] last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-honey/10 flex items-center justify-center text-xs font-semibold text-honey">{m.avatar}</div>
              <div><p className="text-sm font-medium">{m.name}</p><p className="text-xs text-muted">{m.email}</p></div>
            </div>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${m.role === "Owner" ? "text-gravity-light bg-gravity/10" : m.role === "Admin" ? "text-honey bg-honey/10" : "text-muted bg-[rgba(90,106,130,0.1)]"}`}>
              {m.role === "Owner" ? <Crown size={12} /> : <Eye size={12} />} {m.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
