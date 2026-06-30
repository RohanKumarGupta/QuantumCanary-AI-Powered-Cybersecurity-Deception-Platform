"use client";

import { useParams } from "next/navigation";
import { mockHoneypots, mockEvents } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { HoneypotStatusBadge } from "@/components/honeypots/HoneypotStatusBadge";
import { formatDate, timeAgo } from "@/lib/utils";

export default function HoneypotDetailPage() {
  const { id } = useParams();
  const hp = mockHoneypots.find((h) => h.id === id) || mockHoneypots[0];
  const events = mockEvents.filter((e) => e.honeypotId === hp.id);

  return (
    <div className="space-y-6">
      <PageHeader title={hp.name} description={`${hp.type} Honeypot · Port ${hp.port}`}>
        <HoneypotStatusBadge status={hp.status} />
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card"><p className="text-xs text-muted">Total Hits</p><p className="text-2xl font-display font-bold text-honey">{hp.totalHits}</p></div>
        <div className="glass-card"><p className="text-xs text-muted">Status</p><p className="text-2xl font-display font-bold text-asset">{hp.status}</p></div>
        <div className="glass-card"><p className="text-xs text-muted">Deployed</p><p className="text-2xl font-display font-bold">{formatDate(hp.deployedAt)}</p></div>
      </div>
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-1">Description</h3>
        <p className="text-sm text-muted">{hp.description}</p>
      </div>
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-4">Recent Events</h3>
        {events.length === 0 ? <p className="text-sm text-muted">No events recorded yet.</p> : (
          <div className="space-y-2">
            {events.map((evt) => (
              <div key={evt.id} className="flex items-center gap-3 p-3 rounded-lg bg-space/50">
                <span className={`w-2 h-2 rounded-full ${evt.severity === "CRITICAL" ? "bg-threat" : evt.severity === "HIGH" ? "bg-threat-light" : "bg-honey-light"}`} />
                <span className="text-sm flex-1">{evt.eventType.replace("_", " ")}</span>
                <span className="text-xs text-muted">{timeAgo(evt.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
