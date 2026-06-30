"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { UserAvatar } from "@/components/ui/UserAvatar";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your personal information" />
      <div className="glass-card">
        <div className="flex items-center gap-4 mb-6">
          <UserAvatar name="Demo User" size="lg" />
          <div>
            <h3 className="font-semibold">Demo User</h3>
            <p className="text-sm text-muted">user@quantumcanary.io</p>
          </div>
        </div>
        <div className="space-y-4">
          <div><label className="label-text">Full Name</label><input className="input-field" defaultValue="Demo User" /></div>
          <div><label className="label-text">Email</label><input className="input-field" defaultValue="user@quantumcanary.io" /></div>
          <div><label className="label-text">Organization</label><input className="input-field" defaultValue="Acme Corp" /></div>
          <button className="btn-primary w-auto px-6">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
