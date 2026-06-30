"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Key, Smartphone, Link2, Trash2, Monitor, Chrome } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import toast from "react-hot-toast";

export default function SecurityPage() {
  const [deleteConfirm, setDeleteConfirm] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader title="Security" description="Manage passwords, sessions, and authentication methods" />

      {/* Change Password */}
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Key size={18} /> Change Password</h3>
        <div className="space-y-3 max-w-md">
          <div><label className="label-text">Current Password</label><input type="password" className="input-field" /></div>
          <div><label className="label-text">New Password</label><input type="password" className="input-field" /></div>
          <div><label className="label-text">Confirm New Password</label><input type="password" className="input-field" /></div>
          <button onClick={() => toast.success("Password updated")} className="btn-primary w-auto px-6">Update Password</button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Monitor size={18} /> Active Sessions</h3>
        <div className="space-y-3">
          {[
            { device: "Chrome on Windows", ip: "192.168.1.100", location: "Mumbai, IN", current: true, lastActive: "Now" },
            { device: "Firefox on macOS", ip: "10.0.0.42", location: "San Francisco, US", current: false, lastActive: "2 hours ago" },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-space/50">
              <div className="flex items-center gap-3">
                <Chrome size={18} className="text-muted" />
                <div>
                  <p className="text-sm font-medium">{s.device} {s.current && <span className="text-xs text-asset ml-2">Current</span>}</p>
                  <p className="text-xs text-muted">{s.ip} · {s.location} · {s.lastActive}</p>
                </div>
              </div>
              {!s.current && <button className="text-xs text-threat hover:underline">Revoke</button>}
            </div>
          ))}
        </div>
        <button className="text-xs text-threat hover:underline mt-3">Revoke all other sessions</button>
      </div>

      {/* 2FA */}
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Smartphone size={18} /> Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">Status: <span className="text-muted">Disabled</span></p>
            <p className="text-xs text-muted mt-1">Add an extra layer of security to your account</p>
          </div>
          <button className="btn-primary w-auto px-4 h-9 text-sm">Enable 2FA</button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="glass-card">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Link2 size={18} /> Connected Accounts</h3>
        <div className="space-y-3">
          {[{ name: "Google", connected: false }, { name: "GitHub", connected: true }].map((p) => (
            <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-space/50">
              <span className="text-sm font-medium">{p.name}</span>
              <button className={p.connected ? "text-xs text-threat hover:underline" : "btn-ghost h-8 px-3 text-xs"}>
                {p.connected ? "Disconnect" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card border-threat/20">
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-threat"><Trash2 size={18} /> Danger Zone</h3>
        <p className="text-sm text-muted mb-3">Once you delete your account, all your data will be permanently removed. This action cannot be undone.</p>
        <div className="flex items-center gap-3 max-w-md">
          <input className="input-field flex-1" placeholder='Type "DELETE" to confirm' value={deleteConfirm} onChange={(e) => setDeleteConfirm(e.target.value)} />
          <button disabled={deleteConfirm !== "DELETE"} className="btn-danger h-[44px] px-4 text-sm">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
