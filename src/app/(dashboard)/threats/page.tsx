"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockThreats } from "@/lib/mock-data";
import { PageHeader } from "@/components/ui/PageHeader";
import { timeAgo } from "@/lib/utils";

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE: { text: "text-threat", bg: "bg-threat/10" },
  LURED: { text: "text-gravity-light", bg: "bg-gravity/10" },
  TRAPPED: { text: "text-honey", bg: "bg-honey/10" },
  BLOCKED: { text: "text-muted", bg: "bg-[rgba(90,106,130,0.1)]" },
  RESOLVED: { text: "text-asset", bg: "bg-asset/10" },
};

export default function ThreatsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Threats" description="All detected threat actors and attack patterns" />
      <div className="glass-card overflow-hidden p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(55,138,221,0.1)]">
              <th className="text-left text-xs font-semibold text-muted p-4">IP Address</th>
              <th className="text-left text-xs font-semibold text-muted p-4 hidden md:table-cell">Type</th>
              <th className="text-left text-xs font-semibold text-muted p-4">Score</th>
              <th className="text-left text-xs font-semibold text-muted p-4 hidden lg:table-cell">Location</th>
              <th className="text-left text-xs font-semibold text-muted p-4">Status</th>
              <th className="text-left text-xs font-semibold text-muted p-4 hidden md:table-cell">Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {mockThreats.map((t, i) => {
              const sc = statusColors[t.status] || statusColors.ACTIVE;
              return (
                <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="border-b border-[rgba(55,138,221,0.05)] hover:bg-[rgba(55,138,221,0.03)] transition-colors">
                  <td className="p-4">
                    <Link href={`/threats/${t.id}`} className="text-sm font-mono text-honey hover:underline">{t.ipPartial}</Link>
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="text-xs text-muted">{t.attackerType}</span></td>
                  <td className="p-4">
                    <span className={`text-sm font-bold ${t.threatScore >= 80 ? "text-threat" : t.threatScore >= 50 ? "text-gravity-light" : "text-asset"}`}>{t.threatScore}</span>
                  </td>
                  <td className="p-4 hidden lg:table-cell"><span className="text-xs text-muted">{t.country}</span></td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${sc.text} ${sc.bg}`}>{t.status}</span>
                  </td>
                  <td className="p-4 hidden md:table-cell"><span className="text-xs text-muted">{t.lastSeen ? timeAgo(t.lastSeen) : "—"}</span></td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
