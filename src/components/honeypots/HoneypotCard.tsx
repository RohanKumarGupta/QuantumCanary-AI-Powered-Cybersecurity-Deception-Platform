"use client";

import { HoneypotStatusBadge } from "./HoneypotStatusBadge";
import Link from "next/link";
import { Server } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface HoneypotCardProps {
  honeypot: { id: string; name: string; type: string; port: number | null; status: string; description: string | null; totalHits: number; deployedAt: Date | string };
}

export function HoneypotCard({ honeypot }: HoneypotCardProps) {
  return (
    <Link href={`/honeypots/${honeypot.id}`} className="block glass-card hover:border-honey/30 transition-all group">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <Server size={16} className="text-honey" />
          <h3 className="text-sm font-semibold group-hover:text-honey transition-colors">{honeypot.name}</h3>
        </div>
        <HoneypotStatusBadge status={honeypot.status} />
      </div>
      <p className="text-xs text-muted mb-2 line-clamp-1">{honeypot.description}</p>
      <div className="flex justify-between text-xs text-muted">
        <span>{honeypot.totalHits} hits</span>
        <span>{formatDate(honeypot.deployedAt)}</span>
      </div>
    </Link>
  );
}
