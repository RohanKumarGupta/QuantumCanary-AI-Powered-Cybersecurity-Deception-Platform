"use client";

import { FileText, Plus, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";

const mockReports = [
  { id: "1", title: "Incident Report — SSH Brute Force (185.220.101.42)", createdAt: "2024-06-24", threats: 1 },
  { id: "2", title: "Weekly Threat Summary — Week 25", createdAt: "2024-06-23", threats: 5 },
  { id: "3", title: "Canary Token Trigger — admin-credentials-doc", createdAt: "2024-06-22", threats: 1 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="AI-generated incident reports and threat summaries">
        <button className="btn-primary h-10 px-4 text-sm gap-2 inline-flex items-center"><Plus size={16} /> Generate Report</button>
      </PageHeader>
      {mockReports.length === 0 ? (
        <EmptyState icon={<FileText size={32} />} title="No reports yet" description="Generate your first AI-powered incident report" actionLabel="Generate Report" />
      ) : (
        <div className="space-y-3">
          {mockReports.map((r) => (
            <div key={r.id} className="glass-card flex items-center justify-between hover:border-honey/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-honey" />
                <div>
                  <h3 className="text-sm font-semibold">{r.title}</h3>
                  <p className="text-xs text-muted">{r.createdAt} · {r.threats} threat(s)</p>
                </div>
              </div>
              <button className="btn-ghost h-9 px-3 text-xs gap-1.5"><Download size={14} /> Export</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
