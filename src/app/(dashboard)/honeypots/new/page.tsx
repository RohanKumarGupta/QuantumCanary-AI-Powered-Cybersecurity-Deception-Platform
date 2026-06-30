"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Server, Rocket, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import toast from "react-hot-toast";

const types = [
  { value: "SSH", label: "SSH Server", port: 22, desc: "Mimics an SSH server" },
  { value: "API", label: "REST API", port: 8080, desc: "Fake API endpoints" },
  { value: "SMTP", label: "SMTP Server", port: 25, desc: "Email relay trap" },
  { value: "S3", label: "S3 Bucket", port: 443, desc: "Decoy cloud storage" },
  { value: "DATABASE", label: "Database", port: 5432, desc: "Fake database server" },
];

export default function NewHoneypotPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", type: "SSH", port: 22, description: "" });

  const handleDeploy = () => {
    toast.success("Honeypot deployed successfully!");
    router.push("/honeypots");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title="Deploy New Honeypot" description="Set up a new decoy to trap attackers" />
      <div className="flex gap-2 mb-6">
        {["Type", "Configure", "Deploy"].map((s, i) => (
          <div key={s} className={`flex-1 h-1.5 rounded-full ${i <= step ? "bg-honey" : "bg-space-700"} transition-all`} />
        ))}
      </div>

      {step === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {types.map((t) => (
            <button key={t.value} onClick={() => { setForm({ ...form, type: t.value, port: t.port }); setStep(1); }}
              className={`glass-card text-left hover:border-honey/30 transition-all ${form.type === t.value ? "border-honey/50 glow-blue" : ""}`}>
              <Server size={20} className="text-honey mb-2" />
              <h3 className="font-semibold text-sm mb-1">{t.label}</h3>
              <p className="text-xs text-muted">{t.desc}</p>
              <p className="text-xs text-honey mt-2">Port {t.port}</p>
            </button>
          ))}
        </motion.div>
      )}

      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card space-y-4">
          <div>
            <label className="label-text">Honeypot Name</label>
            <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. prod-ssh-decoy-01" />
          </div>
          <div>
            <label className="label-text">Port</label>
            <input className="input-field" type="number" value={form.port} onChange={(e) => setForm({ ...form, port: parseInt(e.target.value) })} />
          </div>
          <div>
            <label className="label-text">Description (optional)</label>
            <textarea className="input-field h-24 py-3" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What does this honeypot mimic?" />
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(0)} className="btn-ghost flex-1"><ArrowLeft size={16} /> Back</button>
            <button onClick={() => setStep(2)} className="btn-primary flex-1" disabled={!form.name}>Next <ArrowRight size={16} /></button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card text-center space-y-4">
          <Rocket size={48} className="text-honey mx-auto" />
          <h3 className="font-display font-semibold text-xl">Ready to Deploy</h3>
          <div className="text-sm text-muted space-y-1">
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Type:</strong> {form.type} on port {form.port}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-ghost flex-1"><ArrowLeft size={16} /> Back</button>
            <button onClick={handleDeploy} className="btn-primary flex-1"><Check size={16} /> Deploy Now</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
