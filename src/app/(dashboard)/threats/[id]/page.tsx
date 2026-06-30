"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, MapPin, Terminal, Activity, Brain, Ban } from "lucide-react";
import { mockThreats } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";

export default function ThreatDetailPage() {
  const { id } = useParams();
  const threat = mockThreats.find((t) => t.id === id) || mockThreats[0];
  const rs = threat.radarScores;

  return (
    <div className="space-y-6">
      <PageHeader title={`Threat — ${threat.ipPartial}`} description={`${threat.attackerType} · ${threat.country}`}>
        <button className="btn-danger h-10 px-4 text-sm gap-2 inline-flex items-center"><Ban size={16} /> Block IP</button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Threat Score" value={threat.threatScore} color={threat.threatScore >= 80 ? "text-threat" : "text-gravity-light"} />
        <StatCard label="Total Events" value={threat.totalEvents} color="text-honey" />
        <StatCard label="Status" value={threat.status} color="text-asset" />
        <StatCard label="Location" value={`${threat.city}, ${threat.country}`} color="text-muted" small />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card">
          <h3 className="font-display font-semibold mb-4">Details</h3>
          <div className="space-y-3">
            <Row label="IP Address" value={threat.ipAddress} />
            <Row label="OS Guess" value={threat.osGuess || "Unknown"} />
            <Row label="ASN" value={threat.asn || "Unknown"} />
            <Row label="Classification" value={threat.attackerType || "Unknown"} />
          </div>
        </div>
        <div className="glass-card">
          <h3 className="font-display font-semibold mb-4">Behavioral Radar</h3>
          {rs && <div className="space-y-3">
            {Object.entries(rs).map(([k, v]) => (
              <div key={k}>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted capitalize">{k}</span><span className="font-mono">{v}</span></div>
                <div className="h-2 bg-space rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1 }}
                    className={`h-full rounded-full ${v >= 80 ? "bg-threat" : v >= 50 ? "bg-gravity-light" : "bg-honey"}`} />
                </div>
              </div>
            ))}
          </div>}
        </div>
      </div>

      <div className="glass-card">
        <h3 className="font-display font-semibold mb-3">Toolchain Detected</h3>
        <div className="flex flex-wrap gap-2">
          {threat.toolchain.map((t) => (
            <span key={t} className="px-3 py-1.5 rounded-lg text-xs bg-honey/10 text-honey border border-honey/20 font-mono">{t}</span>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold">AI Analysis</h3>
          <button className="btn-primary h-9 px-4 text-xs gap-1.5"><Brain size={14} /> Generate Dossier</button>
        </div>
        <p className="text-sm text-muted">Click &quot;Generate Dossier&quot; to run AI-powered analysis on this threat actor.</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, small }: { label: string; value: string | number; color: string; small?: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
      <p className="text-xs text-muted mb-1">{label}</p>
      <p className={`${small ? "text-sm" : "text-2xl"} font-display font-bold ${color}`}>{value}</p>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-space/50">
      <span className="text-xs text-muted w-28">{label}</span>
      <span className="text-sm font-mono">{value}</span>
    </div>
  );
}
