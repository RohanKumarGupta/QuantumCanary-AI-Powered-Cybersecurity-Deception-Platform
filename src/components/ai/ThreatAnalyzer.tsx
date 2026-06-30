"use client";

import { useState } from "react";
import { Brain, Upload, Loader2 } from "lucide-react";

export function ThreatAnalyzer() {
  const [logText, setLogText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!logText.trim()) return;
    setLoading(true); setAnalysis("");
    try {
      const res = await fetch("/api/ai/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ logText }) });
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) { while (true) { const { done, value } = await reader.read(); if (done) break; setAnalysis((p) => p + decoder.decode(value)); } }
    } catch { setAnalysis("Analysis unavailable. Configure OPENAI_API_KEY."); }
    finally { setLoading(false); }
  };

  return (
    <div className="glass-card">
      <h3 className="font-display font-semibold mb-3 flex items-center gap-2"><Brain size={18} className="text-honey" /> Threat Analyzer</h3>
      <textarea className="input-field h-32 py-3 font-mono text-xs resize-none mb-3" value={logText} onChange={(e) => setLogText(e.target.value)} placeholder="Paste security logs..." />
      <button onClick={handleAnalyze} disabled={loading || !logText.trim()} className="btn-primary w-full gap-2 mb-3">
        {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><Brain size={16} /> Analyze</>}
      </button>
      {analysis && <pre className="text-xs font-mono whitespace-pre-wrap text-[#C4D0E0] p-3 rounded-lg bg-space/50">{analysis}</pre>}
    </div>
  );
}
