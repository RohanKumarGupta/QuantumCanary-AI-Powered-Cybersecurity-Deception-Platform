"use client";

import { motion } from "framer-motion";
import { Plus, Radio, AlertCircle, CheckCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockCanaryTokens } from "@/lib/mock-data";
import { formatDate, timeAgo } from "@/lib/utils";

const tokenTypeColors: Record<string, string> = { URL: "text-honey", DNS: "text-asset", DOCUMENT: "text-gravity-light", IMAGE: "text-threat-light" };

export default function CanaryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Canary Tokens" description="Plant traps to detect data exfiltration">
        <button className="btn-primary h-10 px-4 text-sm gap-2 inline-flex items-center"><Plus size={16} /> Create Token</button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockCanaryTokens.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className={`glass-card border-l-[3px] ${t.triggered ? "border-l-threat" : "border-l-asset"}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Radio size={16} className={tokenTypeColors[t.tokenType]} />
                <span className="font-semibold text-sm">{t.label}</span>
              </div>
              {t.triggered ? (
                <span className="flex items-center gap-1 text-xs text-threat"><AlertCircle size={12} /> Triggered</span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-asset"><CheckCircle size={12} /> Active</span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${tokenTypeColors[t.tokenType]} bg-honey/5`}>{t.tokenType}</span>
              <span>Created {formatDate(t.createdAt)}</span>
              {t.triggeredAt && <span className="text-threat">Triggered {timeAgo(t.triggeredAt)}</span>}
            </div>
            {t.triggeredIp && <p className="text-xs text-muted mt-2">Source IP: <span className="font-mono text-threat-light">{t.triggeredIp}</span></p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
