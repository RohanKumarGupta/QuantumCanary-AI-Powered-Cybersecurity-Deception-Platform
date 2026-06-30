"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Server, Terminal, Mail, Database, HardDrive, Globe } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockHoneypots } from "@/lib/mock-data";
import { HoneypotStatusBadge } from "@/components/honeypots/HoneypotStatusBadge";
import { formatDate } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  SSH: <Terminal size={18} />, API: <Globe size={18} />, SMTP: <Mail size={18} />,
  S3: <Database size={18} />, DATABASE: <HardDrive size={18} />,
};
const typeColors: Record<string, string> = {
  SSH: "text-honey", API: "text-asset", SMTP: "text-gravity-light",
  S3: "text-gravity", DATABASE: "text-threat",
};

export default function HoneypotListPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Honeypots" description="Manage your deployed decoy infrastructure">
        <Link href="/honeypots/new" className="btn-primary h-10 px-4 text-sm gap-2 inline-flex items-center">
          <Plus size={16} /> Deploy New
        </Link>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockHoneypots.map((hp, i) => (
          <motion.div key={hp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={`/honeypots/${hp.id}`} className="block glass-card hover:border-honey/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span className={`p-2 rounded-lg bg-[rgba(55,138,221,0.08)] ${typeColors[hp.type]}`}>{typeIcons[hp.type]}</span>
                  <div>
                    <h3 className="text-sm font-semibold group-hover:text-honey transition-colors">{hp.name}</h3>
                    <p className="text-xs text-muted">{hp.type} · Port {hp.port}</p>
                  </div>
                </div>
                <HoneypotStatusBadge status={hp.status} />
              </div>
              <p className="text-xs text-muted mb-3 line-clamp-2">{hp.description}</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{hp.totalHits} hits</span>
                <span>Deployed {formatDate(hp.deployedAt)}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
