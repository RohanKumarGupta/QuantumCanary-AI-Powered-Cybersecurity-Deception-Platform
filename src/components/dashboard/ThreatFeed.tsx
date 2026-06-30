"use client";

import { motion } from "framer-motion";
import { timeAgo } from "@/lib/utils";

const severityColors: Record<string, string> = {
  CRITICAL: "bg-threat",
  HIGH: "bg-threat-light",
  MEDIUM: "bg-gravity-light",
  LOW: "bg-honey-light",
};

interface Event {
  id: string;
  eventType: string;
  timestamp: Date | string;
  severity: string;
  honeypotName?: string;
  payload?: Record<string, unknown>;
}

export function ThreatFeed({ events }: { events: Event[] }) {
  return (
    <div className="glass-card h-full flex flex-col" style={{ maxHeight: 560 }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-sm">Live Events</h3>
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <span className="w-2 h-2 rounded-full bg-threat blink" />
          Live
        </span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {events.length === 0 ? (
          <div className="text-center py-12 text-muted text-sm">
            <p>No threats detected</p>
            <p className="text-xs mt-1">Your honeypots are active</p>
          </div>
        ) : (
          events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[rgba(55,138,221,0.05)] transition-colors cursor-pointer group"
            >
              <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${severityColors[event.severity] || "bg-muted"}`} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium truncate">
                    {event.eventType.replace("_", " ")}
                  </span>
                  <span className="text-[10px] text-muted flex-shrink-0">
                    {timeAgo(event.timestamp)}
                  </span>
                </div>
                <p className="text-[11px] text-muted truncate mt-0.5">
                  {event.honeypotName || "Unknown"}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
