"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Bell, Globe, Moon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="General Settings" description="Manage your account preferences" />
      <div className="glass-card space-y-4">
        <h3 className="font-display font-semibold">Notifications</h3>
        <SettingRow icon={Bell} label="Email notifications" desc="Receive alerts for canary triggers and critical threats" />
        <SettingRow icon={Bell} label="Weekly digest" desc="Receive a weekly summary of threat activity" />
      </div>
      <div className="glass-card space-y-4">
        <h3 className="font-display font-semibold">Appearance</h3>
        <SettingRow icon={Moon} label="Dark mode" desc="Always use dark mode (default)" />
        <SettingRow icon={Globe} label="Timezone" desc="Auto-detect from browser" />
      </div>
    </div>
  );
}

function SettingRow({ icon: Icon, label, desc }: { icon: any; label: string; desc: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <Icon size={16} className="text-muted" />
        <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted">{desc}</p></div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" defaultChecked className="sr-only peer" />
        <div className="w-9 h-5 bg-space-700 rounded-full peer peer-checked:bg-honey transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
      </label>
    </div>
  );
}
