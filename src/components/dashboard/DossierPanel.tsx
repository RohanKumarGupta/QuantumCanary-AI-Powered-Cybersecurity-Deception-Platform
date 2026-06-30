"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, MapPin, Terminal, Activity, Brain } from "lucide-react";

interface DossierPanelProps {
  threat: {
    id: string;
    ipAddress: string;
    threatScore: number;
    attackerType: string | null;
    status: string;
    osGuess: string | null;
    toolchain: string[];
    country: string | null;
    city: string | null;
    asn: string | null;
    radarScores: { persistence: number; stealth: number; sophistication: number; intent: number } | null;
  } | null;
  onClose: () => void;
}

export function DossierPanel({ threat, onClose }: DossierPanelProps) {
  return (
    <AnimatePresence>
      {threat && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-space-800 border-l border-[rgba(55,138,221,0.15)] z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-lg">Attacker Dossier</h2>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[rgba(55,138,221,0.08)] text-muted">
                  <X size={18} />
                </button>
              </div>

              {/* Threat Score */}
              <div className="glass-card mb-4 text-center">
                <div className={`text-4xl font-display font-bold mb-1 ${threat.threatScore >= 80 ? "text-threat" : threat.threatScore >= 50 ? "text-gravity-light" : "text-asset"}`}>
                  {threat.threatScore}
                </div>
                <p className="text-xs text-muted">Threat Score</p>
                <span className="mt-2 inline-block px-2 py-1 rounded-full text-xs font-semibold bg-threat/10 text-threat">{threat.attackerType}</span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <DetailRow icon={<MapPin size={14} />} label="Location" value={`${threat.city || "Unknown"}, ${threat.country || "Unknown"}`} />
                <DetailRow icon={<Shield size={14} />} label="IP Address" value={threat.ipAddress} />
                <DetailRow icon={<Terminal size={14} />} label="OS Guess" value={threat.osGuess || "Unknown"} />
                <DetailRow icon={<Activity size={14} />} label="ASN" value={threat.asn || "Unknown"} />
              </div>

              {/* Toolchain */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-muted mb-2">TOOLCHAIN DETECTED</h4>
                <div className="flex flex-wrap gap-1.5">
                  {threat.toolchain.map((tool) => (
                    <span key={tool} className="px-2 py-1 rounded-md text-xs bg-[rgba(55,138,221,0.1)] text-honey border border-[rgba(55,138,221,0.2)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar Scores */}
              {threat.radarScores && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-muted mb-2">BEHAVIORAL RADAR</h4>
                  <div className="space-y-2">
                    {Object.entries(threat.radarScores).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-xs text-muted capitalize w-28">{key}</span>
                        <div className="flex-1 h-2 bg-space rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${val}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full ${val >= 80 ? "bg-threat" : val >= 50 ? "bg-gravity-light" : "bg-honey"}`}
                          />
                        </div>
                        <span className="text-xs font-mono w-8 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="btn-primary w-full gap-2">
                <Brain size={16} /> Generate AI Analysis
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-lg bg-[rgba(13,21,37,0.5)]">
      <span className="text-muted">{icon}</span>
      <span className="text-xs text-muted w-20">{label}</span>
      <span className="text-sm font-mono">{value}</span>
    </div>
  );
}
