"use client";

export function HoneypotStatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string; bg: string }> = {
    ACTIVE: { label: "Active", color: "text-asset", bg: "bg-asset/10" },
    PAUSED: { label: "Paused", color: "text-gravity-light", bg: "bg-gravity/10" },
    ARCHIVED: { label: "Archived", color: "text-muted", bg: "bg-[rgba(90,106,130,0.1)]" },
  };
  const c = config[status] || config.ACTIVE;
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${c.color} ${c.bg} flex items-center gap-1`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === "ACTIVE" ? "bg-asset blink" : status === "PAUSED" ? "bg-gravity-light" : "bg-muted"}`} />
      {c.label}
    </span>
  );
}
