"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Shield, Activity, Server } from "lucide-react";
import { mockDashboardStats, mockEvents } from "@/lib/mock-data";
import { CountUpStat } from "@/components/ui/CountUpStat";
import { ThreatFeed } from "@/components/dashboard/ThreatFeed";
import { StatsBar } from "@/components/dashboard/StatsBar";
import { QuickActions } from "@/components/dashboard/QuickActions";
import dynamic from "next/dynamic";

const ThreatMesh3D = dynamic(() => import("@/components/dashboard/ThreatMesh3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[480px] rounded-xl bg-space-800 border border-[rgba(55,138,221,0.1)] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-honey/30 border-t-honey rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted text-sm">Loading 3D Threat Mesh...</p>
      </div>
    </div>
  ),
});

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-display font-semibold">{getGreeting()}, Demo 👋</h1>
          <p className="text-muted text-sm">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-asset/10 text-asset border border-asset/20 flex items-center gap-1.5">
            <Shield size={14} />
            Security Score: {mockDashboardStats.securityScore}
          </span>
        </div>
      </motion.div>

      {/* Stats */}
      <StatsBar />

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 3D Canvas */}
        <div className="xl:col-span-2 space-y-3">
          <QuickActions />
          <div className="rounded-xl overflow-hidden border border-[rgba(55,138,221,0.1)] bg-space-800" style={{ minHeight: 480 }}>
            <ThreatMesh3D />
          </div>
        </div>

        {/* Threat Feed */}
        <div className="xl:col-span-1">
          <ThreatFeed events={mockEvents} />
        </div>
      </div>
    </div>
  );
}
