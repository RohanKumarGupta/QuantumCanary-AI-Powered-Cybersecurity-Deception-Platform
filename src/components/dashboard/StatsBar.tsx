"use client";

import { motion } from "framer-motion";
import { Server, AlertTriangle, Activity, Shield } from "lucide-react";
import { mockDashboardStats } from "@/lib/mock-data";
import { CountUpStat } from "@/components/ui/CountUpStat";

export function StatsBar() {
  const stats = [
    { label: "Honeypots Active", value: mockDashboardStats.activeHoneypots, icon: <Server size={20} />, suffix: "" },
    { label: "Threats Detected", value: mockDashboardStats.threatsDetected, icon: <AlertTriangle size={20} />, suffix: "" },
    { label: "Attackers Lured", value: mockDashboardStats.attackersLured, icon: <Activity size={20} />, suffix: "" },
    { label: "Security Score", value: mockDashboardStats.securityScore, icon: <Shield size={20} />, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CountUpStat
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            suffix={stat.suffix}
          />
        </motion.div>
      ))}
    </div>
  );
}
