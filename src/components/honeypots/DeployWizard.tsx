"use client";

import { useState } from "react";
import { Server, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const types = [
  { value: "SSH", label: "SSH Server", port: 22 },
  { value: "API", label: "REST API", port: 8080 },
  { value: "SMTP", label: "SMTP Server", port: 25 },
  { value: "S3", label: "S3 Bucket", port: 443 },
  { value: "DATABASE", label: "Database", port: 5432 },
];

export function DeployWizard({ onDeploy }: { onDeploy?: () => void }) {
  const [form, setForm] = useState({ name: "", type: "SSH", port: 22 });

  const handleDeploy = async () => {
    if (!form.name) { toast.error("Name is required"); return; }
    try {
      await fetch("/api/honeypots", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      toast.success("Honeypot deployed!");
      onDeploy?.();
    } catch { toast.error("Deploy failed"); }
  };

  return (
    <div className="space-y-4">
      <div><label className="label-text">Name</label><input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. prod-ssh-decoy-01" /></div>
      <div><label className="label-text">Type</label>
        <select className="input-field" value={form.type} onChange={(e) => { const t = types.find((t) => t.value === e.target.value); setForm({ ...form, type: e.target.value, port: t?.port || 22 }); }}>
          {types.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
      <div><label className="label-text">Port</label><input className="input-field" type="number" value={form.port} onChange={(e) => setForm({ ...form, port: parseInt(e.target.value) })} /></div>
      <button onClick={handleDeploy} className="btn-primary w-full gap-2"><Server size={16} /> Deploy Honeypot</button>
    </div>
  );
}
