"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { mockAnalyticsData } from "@/lib/mock-data";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#378ADD", "#1D9E75", "#E24B4A", "#EF9F27", "#85B7EB", "#BA7517"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Threat patterns, attack trends, and behavioral insights" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threats Over Time */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
          <h3 className="font-display font-semibold mb-4">Threats Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockAnalyticsData.threatsByDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(55,138,221,0.1)" />
              <XAxis dataKey="date" stroke="#5A6A82" fontSize={11} />
              <YAxis stroke="#5A6A82" fontSize={11} />
              <Tooltip contentStyle={{ background: "#0D1525", border: "1px solid rgba(55,138,221,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="threats" stroke="#E24B4A" strokeWidth={2} dot={{ fill: "#E24B4A", r: 3 }} />
              <Line type="monotone" dataKey="events" stroke="#378ADD" strokeWidth={2} dot={{ fill: "#378ADD", r: 3 }} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Threats by Type */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card">
          <h3 className="font-display font-semibold mb-4">Attacker Types</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={mockAnalyticsData.threatsByType} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={100} label={({ type, percentage }) => `${type} ${percentage}%`} labelLine={false} fontSize={10}>
                {mockAnalyticsData.threatsByType.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0D1525", border: "1px solid rgba(55,138,221,0.2)", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Honeypot Hits */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card">
          <h3 className="font-display font-semibold mb-4">Honeypot Activity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockAnalyticsData.honeypotHits} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(55,138,221,0.1)" />
              <XAxis type="number" stroke="#5A6A82" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="#5A6A82" fontSize={10} width={130} />
              <Tooltip contentStyle={{ background: "#0D1525", border: "1px solid rgba(55,138,221,0.2)", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="hits" fill="#378ADD" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card">
          <h3 className="font-display font-semibold mb-4">Attack Origins</h3>
          <div className="space-y-3">
            {mockAnalyticsData.geoData.map((g, i) => (
              <div key={g.country} className="flex items-center gap-3">
                <span className="text-sm w-28 truncate">{g.country}</span>
                <div className="flex-1 h-3 bg-space rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(g.attacks / 34) * 100}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-honey to-threat" />
                </div>
                <span className="text-xs font-mono text-muted w-8 text-right">{g.attacks}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
