"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { mockThreats } from "@/lib/mock-data";

export function ReportGenerator() {
  const [selectedThreat, setSelectedThreat] = useState(mockThreats[0].id);
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true); setReport("");
    try {
      const res = await fetch("/api/ai/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ threatId: selectedThreat }) });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) { while (true) { const { done, value } = await reader.read(); if (done) break; setReport((p) => p + decoder.decode(value)); } }
    } catch { setReport("Report generation failed. Please configure OPENAI_API_KEY."); }
    finally { setLoading(false); }
  };

  return (
    <div className="glass-card">
      <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><FileText size={18} className="text-honey" /> Report Generator</h3>
      <select className="input-field mb-3" value={selectedThreat} onChange={(e) => setSelectedThreat(e.target.value)}>
        {mockThreats.map((t) => (<option key={t.id} value={t.id}>{t.ipPartial} — {t.attackerType}</option>))}
      </select>
      <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full gap-2 mb-3">
        {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><FileText size={16} /> Generate Report</>}
      </button>
      {report && <pre className="text-xs font-mono whitespace-pre-wrap text-[#C4D0E0] p-3 rounded-lg bg-space/50 max-h-96 overflow-y-auto">{report}</pre>}
    </div>
  );
}
